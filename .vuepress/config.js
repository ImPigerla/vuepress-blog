const {resolve} = require('path'),
    srcPath = resolve(__dirname, './public')

module.exports = {
    lang: 'zh-cmn-Hans',
    title: '简约不简单',
    description: '我是吴建杰，寻找志同道合',
    port: 3001,
    // 主题相关配置
    themeConfig: {
        // 导航栏链接
        nav: [
            {text: '文章', link: '/article/'},
            {text: '关于', link: '/about/'},
            {
                text: 'Github', link: 'https://github.com/ImPigerla/vuepress-blog'
            }
        ],
        sidebar: 'auto'
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    evergreen: true
}
