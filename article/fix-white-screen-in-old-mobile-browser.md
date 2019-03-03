# 解决vue在手机浏览器中白屏的问题

::: tip 说明
技术配置： Vue ^2.6.7 + Vue-router ^3.0.2 + Webpack ^4.29.5

本地环境： MacOS 10.14+
:::


## 问题描述

当我用`vue` + `vue-router`进行移动端开发时，用的android测试机是`华为honor 8`，发现页面一直白屏，页面业务并不复杂，基本定位到是脚步报错，是webpack打包的那种报错，关键是查看不了手机内部报的是什么错。

## 解决问题

遇到问题，只能投入`google搜索`大海中去捞针。

### 方法1，加 `babel-polyfill`垫片

```js
// 首先安装垫片
npm install --save-dev babel-polyfill

// webpack入口配置
entry: {
    // 原来这样子
    // app: resolve(__dirname, '../src/index.js') 
    
    // 变成这样子
    app: ['babel-polyfill', resolve(__dirname, '../src/index.js')]
}
```

但是，并没什么用，还是一样的白屏

### 方法2，ES6转ES5

```js
// webpack配置
module: {
    rules: [
        ...,
        {
            test: /\.js$/,
            include: srcPath,
            use: {
                loader: 'babel-loader',
                
                // 加下这行代码
                options: {presets: ['@babel/preset-env']}
            },
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            )
        }
    ]
}

// 当然还要下载包
npm install --save-dev @babel/preset-env
```

✅，问题解决！

### 小插曲

上文说到不知道手机报错是什么，事实上是有一种途径可以知道的，那就是IE，刚好我有真实环境的IE，打开开发工具，访问应用，一样的白屏😂，提示`script error *003 缺少 ":""`，定位代码如下

```js
...
data () {
    
}
...
```

可以理解为，webpack没有把ES6转化为ES5，因此相对比较老旧的浏览器则无法支持最新的特性。

想不到IE还有发光发亮的时候吧，可以这么说，确保在IE下没有错误，在手机端的支持大大提高。

## 结论

遇到这白屏问题，可以分成两种，

1. 缺少新的特性的垫片
1. ES6+ 没有转化成ES5

当然不需要支持比较老旧的浏览器，也许不需要关注这些问题，甚至不会遇到这些问题。
上面两种配置方式都可以尝试一下，说不定第一种就能解决你的问题。



