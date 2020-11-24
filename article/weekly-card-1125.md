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