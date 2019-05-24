<template>
    <div>This is a plugin</div>
</template>

<script>
    export default {
        name: 'Plugin',
        data() {
            return {};
        },
        created(){
            console.log('create plugin');
        },
        mounted(){
            console.log('mounted plugin');
        }
    }
</script>

<style scoped>

</style>