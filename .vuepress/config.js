const {resolve} = require('path'),
    srcPath = resolve(__dirname, './public')

module.exports = {
    lang: 'zh-cmn-Hans',
    title: '我是吴建杰',
    description: '我是吴建杰，寻找志同道合',
    port: 3001,
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    evergreen: true
}
