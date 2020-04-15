# webpack相关-使用compilation的assets计算文件的MD5

如果还没有下载`md5`包则下载一个，如下

```bash
npm i -D md5
```

```js
// 用来算指定文件内容的MD5
const md5 = require('md5');

const fileName = `指定文件名或者变量`

new HtmlWebpackPlugin({
    ...,
    templateParameters: (compilation, assets, assetTags, options) => {
        // 获取文件内容source
        let source = compilation.assets[fileName].source()
        let contenthash = md5(source).substr(0, 10)
        return {
            script: getScripts(fileName, contenthash); // 目标操作，根据自己的业务实现
        };
    },
    ...
})
```