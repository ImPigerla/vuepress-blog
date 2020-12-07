# CSS变量

## 什么是CSS变量

![https://cdn.nlark.com/yuque/0/2020/png/1277441/1607341339871-410f65f4-368f-45ea-b9cc-3efde52d84d1.png](https://cdn.nlark.com/yuque/0/2020/png/1277441/1607341339871-410f65f4-368f-45ea-b9cc-3efde52d84d1.png)
摘自：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties

## 兼容性

![https://cdn.nlark.com/yuque/0/2020/png/1277441/1607341483428-5038f611-5101-45a2-b7dc-6214321af880.png](https://cdn.nlark.com/yuque/0/2020/png/1277441/1607341483428-5038f611-5101-45a2-b7dc-6214321af880.png)

摘自：https://caniuse.com/css-variables


## 怎么使用

```css
// root 全局通用
:root {
  // 定义
  --main-bg-color: brown;
}
.one {
  color: white;
  // 使用变量
  background-color: var(--main-bg-color);
  margin: 10px;
  width: 50px;
  height: 50px;
  display: inline-block;
}
```

## 实际例子

```jsx
const commonLayout = ({ env, appData: { data } }) => {
  return {
    // 动态生成root变量
    headBottom: <style type="text/css">{`:root{--theme-color: ${data.themeColor};--pic-holder: url(${data.image1});--icon-search: url(${data.image4});}`}</style>
  };
};
```

```css
button {
  width: 94px;
  height: 79px;
  /* var(变量, 默认值1, 默认值2, ....)*/
  background: var(--icon-search, './images/icon-search.png') no-repeat;
  background-size: cover;
  text-indent: -99999px;
}
```

## 总结

过配置不同的变量，然后初始化成页面的CSS基本变量，使用变量就能实现一些站点的不同主题（颜色与背景图等等）。而不用使用常规的做法就是生成多个文件，然后以最高权重覆盖，从而显示最新的样式。