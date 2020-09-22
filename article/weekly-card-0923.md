## Eggjs后端接钉钉登录

```js
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as urlencode from 'urlencode';

... // 省略代码
const { service } = ctx;
const { appId, appSecret } = app.config.dingtalk;
const timestamp = Date.now() + '';
const signature = Base64.stringify(hmacSHA256(timestamp, appSecret));
const { user_info, errcode, errmsg } = await service.proxy.getData(  // user_info 则是钉钉返回登录信息
  `https://oapi.dingtalk.com/sns/getuserinfo_bycode?accessKey=${appId}&timestamp=${timestamp}&signature=${urlencode(signature)}`,
  JSON.stringify({
    tmp_auth_code: code // 钉钉回传的code
  }),
  'post'
);
... // 省略代码
```