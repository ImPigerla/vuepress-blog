---
sidebar: true
---

# 文章汇总

<article-mini v-for="(item, index) in articleArr" :init="item" :key="index"></article-mini>

<script>
    export default {
        data () {
            return {
                articleArr: [{
                    link: '/article/fix-white-screen-in-old-mobile-browser.html',
                    title: '解决vue在手机浏览器中白屏的问题',
                    publish: '2019-03-01'
                }]
            }
        }
    }
</script>
