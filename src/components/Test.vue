<template>
    <div>{{ msg }}
        <div v-if="false">
            <Plugin/>
        </div>
    </div>
</template>

<script>
    import Plugin from './Plugin';
    import Scalar from 'api/Scalar';

    export default {
        name: 'Test',
        components: {Plugin},
        data() {
            return {
                show: false,
                msg: 'Hello World'
            }
        },

        created() {
            Scalar.system.login({
                data: {
                    account: 'admin',
                    password: '123'
                }
            }).execute().then(response => {
                // do success
                console.log(response);
            }, error => {
                // do error
                console.log(error);
            });
        },
        comments: {
            'Plugin': Plugin
        }
    }
</script>

<style scoped>

</style>
