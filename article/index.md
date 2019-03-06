---
sidebar: true
---

# 文章汇总

<article-mini v-for="(item, index) in articleArr" :init="item" :key="index"></article-mini>

<script>
    export default {
        data () {
            return {
                articleArr: [
                {
                    link: '/article/how-to-develop-mobile-webapp.html',
                    title: '如何进行移动端webapp开发',
                    publish: '2019-03-06'
                },
                {
                    link: '/article/fix-white-screen-in-old-mobile-browser.html',
                    title: '解决vue在手机浏览器中白屏的问题',
                    publish: '2019-03-01'
                }]
            }
        }
    }
</script>
