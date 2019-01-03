<template>
    <i :class="iconName"></i>
</template>

<script>
    export default {
        name: 'icon',
        props: {
            name: String
        },
        data () {
            return {
                iconName : `icon-font-${this.name}`
            }
        }
    }
</script>
