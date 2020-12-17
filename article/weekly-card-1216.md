# 钉钉扫码登录接入指引(js/nodejs版)

## 1. 准备工作
### 1.1 钉钉js脚本链接

https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js

### 1.2 @flat/async-load-js异步加载的方法库

```
// 内部库
npm install @flat/async-load-js
```

### 1.3 本地钉钉appId和appSecret（本地大家都用这个）

```
appId: 'dinxxxxxxxxxxxx',
appSecret: '5xxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

### 1.4 钉钉数字签名，安装以下几个包备用

```
npm install crypto-js urlencode
```

```
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as urlencode from 'urlencode';
import * as Base64 from 'crypto-js/enc-base64';
```

## 2. 写钉钉登录（二维码）页面
以下代码仅供参考
```
// 异步加载脚本工具
import loadScript from '@flat/async-load-js';
const appIdMap = { prod: '生产环境的appId', test: '测试环境的appId', local: '测试环境appId' };
export default function Login({ history }) {
const { publicKey, query, env } = useContext(AppContext);
const appId = appIdMap[env];

useEffect(() => {
  // 异步加载脚本，然后初始化操作
  loadScript('https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js').then(() => {
    
    // ！！！登陆成功承接页面，下面会讲到👇👇👇👇👇👇
    const url = encodeURIComponent(`http://${window.location.host}/page/ddlogin`);
    const goto = encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`);
    // 二维码初始化
    window.DDLogin({
      id: 'dingtalkLoginContainer',
      goto,
      style: 'border:none;background-color:#FFFFFF;',
      width: '384',
      height: '300'
    });
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', handleDingTalkMessage, false);
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onmessage', handleDingTalkMessage);
    }
  });
}, []);
// ... 省略其他代码
<div className={`animation-scene`}>
  // 其他代码
  
  // 这个二维码的占位标签
    <div className="qr-wrap" id="dingtalkLoginContainer"></div>
  
  // ... 其他代码
</div>
```
## 3. 编写一个登录成功承接页面

### 3.1 定义路由

```
以下代码仅供参考
// controller层根据自己的项目，自行修改
router.get('/page/ddlogin', controller.admin.index);
```

### 3.2 重定向回到承接页面，会带回一个code参数（类似验证token）

```
以下代码仅供参考
import React, { useEffect, useState, useContext } from 'react';
import { Spin } from 'antd';
import { AppContext } from '@/store';
import request from 'request';
import './index.scss';
export default function Dingtalk({ history }) {
  const { publicKey, query, env } = useContext(AppContext);
  useEffect(() => {
    // ！！！ 以下代码，还是要根据各自项目进行处理，过程就是把code带回后端，进行验证并且拿到用户信息
    request
      .post(
        '/passport/local',
        {
          username: 'dingtalk',
          password: query.code
        },
        { 'X-showMessage': true }
      )
      .then((res: any) => {
        // 登陆成功之后回到系统首页
        location.href = '/';
      })
      .catch(console.error);
  }, []);
  return (
    <div className="dingtalk-wrap">
      <Spin />
      <span className="tips">登录中...</span>
    </div>
  );
}
```

## 4. 后端代码实现

以下代码仅供参考

```
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as urlencode from 'urlencode';
import * as Base64 from 'crypto-js/enc-base64';
// ... 其他代码
if (user.username === 'dingtalk') {
  const { service } = ctx;
  const { appId, appSecret } = app.config.dingtalk;
  const timestamp = Date.now() + '';
  // 数字签名
  const signature = Base64.stringify(hmacSHA256(timestamp, appSecret));
  
  // 与钉钉进行校验并获取数据
  const { user_info, errcode, errmsg } = await service.proxy.getData(
    `https://oapi.dingtalk.com/sns/getuserinfo_bycode?accessKey=${appId}&timestamp=${timestamp}&signature=${urlencode(signature)}`,
    JSON.stringify({
      tmp_auth_code: user.password
    }),
    'post'
  );
  assert(errcode === 0, 'errcode should be 0');
  
  // 拿到用户信息（user_info）之后，做一些注册或者登陆的事情
}
// ... 其他代码
各自环境配置，prod举例
// config.prod.ts
config.dingtalk = {
  appId: 'dingxxxxxxxxxxxxxxxxxxxx',
  appSecret: 'fXeBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
};
```


## 5. 使用用户信息的unionid作为主键，关联数据

获取到的json数据如下：
```
user_info:  {
  nick: '吴建杰',
  unionid: 'xxxxxxxxxxxxxxxxxxxxxiEiE',  // 使用这个字段作为主键
  dingId: '$:xxxx:$xxxxxxxxxxxxxxxxxxxxxfZwA==',
  openid: 'xxxxxxxxxxxxxxxxxxxxxiEiE',
  main_org_auth_high_level: true
}
```
## 6. 本地调试的时候需要通过127.0.0.1:8008访问

本地调试的时候需要通过127.0.0.1:8008访问，因为配置是通用的，所以这两者是固定的。

## 7. 找相关管理人员配置正式和测试环境的appId和appSecret

最后，就是找相关管理人员配置正式和测试环境的appId和appSecret，参考例子如下：

```
>>>>>>> 给出去
应用创作平台	应用创作平台-线上	
http://xxxx.xxxx.xxxx/favicon.png // 站点小图标
http://xxxx.xxxx.xxxx/page/ddlogin  // 回调地址
<<<<<<< appId/appSecret
dingxxxxxxxxxxxxxxxxxxx	
fXeBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX	
 
应用创作平台	应用创作平台-测试	
http://xxxx.xxxx.xxxx/favicon.png	// 站点小图标
http://xxxx-test.xxxx.xxxx/page/ddlogin // 回调地址
<<<<<<< appId/appSecret
dingxxxxxxxxxxxxxxxxxxx
4wajXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## 8. 参考资料-钉钉文档

官方文档：https://ding-doc.dingtalk.com/doc#/serverapi2/kymkv6