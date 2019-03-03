<template>
    <a :href="init.link" class="article-mini">
        <p class="article-title">{{ init.title }}</p>
        <p class="text-color-third">{{ init.publish }}</p>
    </a>
</template>

<script>
    export default {
        name: 'article-mini',
        props: {
            init: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .article-mini {
        display: block;
        border: 1px solid #eaecef;
        border-radius: 5px;
        padding: 10px 20px;
        margin: 15px 0;
        &:hover {
            text-decoration: none !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        p {
            margin: 5px 0;
        }
        .article-title {
            font-size: 18px;
        }
    }
</style>
