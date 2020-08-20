## Eggjs日志定时清除的配置

内置egg-logrotator插件 ：https://github.com/eggjs/egg-logrotator，通过配置即可实现

```js
// config.default.js 文件配置如下：
exports.logrotator = {
  ...,   // 还有很多其他的配置，自行查看文档：https://github.com/eggjs/egg-logrotator
  maxDays: 7,  // 保留的7天日志，默认是31天，“0”则全部保留
};
```

## 修改MySQL的字符集为utf8mb4（触发点是为了保存emoji表情🤣）

utf8mb4最明显的好处是解决了苹果挖的坑-推广了emoji表情。utf8mb4解决了MySQL数据库存储emoji表情的问题
utf8mb4是utf8的超集，理论上由utf8升级到utf8mb4字符编码没有任何兼容问题

phpMyAdmin编辑表列数据
![https://cdn.nlark.com/yuque/0/2020/png/1277441/1597911278398-fedaf2a2-8476-495e-9608-744e5c0b5348.png](https://cdn.nlark.com/yuque/0/2020/png/1277441/1597911278398-fedaf2a2-8476-495e-9608-744e5c0b5348.png)