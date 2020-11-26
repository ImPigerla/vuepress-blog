# 一周卡片知识

## 去掉请求header的referer字段

这里简单介绍两种方式

### 1. 在页面head之间添加<meta name="referrer" content="no-referrer" />

需要注意的是，此是全局的效应，即是所有的链接都不会带上`referer`字段

```html
...
<head>
    ...
    <meta name="referrer" content="no-referrer" />
    ...
</head>
...
```
### 2. 只需要在指定的a标题处理

```html
<a href="xx.xx/xx" referrerpolicy="no-referrer">
```

注：`referrerpolicy`目前是试验性属性，存在兼容性问题。可以在[https://caniuse.com/?search=referrerpolicy](https://caniuse.com/?search=referrerpolicy)，查看兼容情况。


## PWA的navigator.serviceWorker为undefined的情况

navigator.serviceWorker需要一个安全上下文([Secure Context](https://w3c.github.io/webappsec-secure-contexts/))，否则navigator.serviceWorker取值为undefined，怎样提供安全上下文呢，有以下两种：

1. localhost或者127.0.0.1本地访问
2. 开启https

但是，在测试环境或者说无法开启https的环境怎么验证？
可以告诉chrome，哪些是“安全“的，步骤如下：

1. 地址栏输入：chrome://flags/#unsafely-treat-insecure-origin-as-secure
2. 开启“Enabled”
3. 输入待验证的环境地址

![unsafely-treat-insecure-origin-as-secure](https://cdn.nlark.com/yuque/0/2020/png/1277441/1606357908742-fe2c3801-551b-4d11-aa48-80cf1bee4d0c.png?x-oss-process=image%2Fresize%2Cw_1492)