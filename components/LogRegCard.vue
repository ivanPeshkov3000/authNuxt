<template lang="pug">
    v-card(
        outlined
        width="300px"
    )
        v-card-title
            v-tabs(
                v-model="tab"
                tile
            )
                v-tab() Login
                v-tab() Registration
        v-card-actions
            v-tabs-items(
                v-model="tab"
            )
                v-tab-item
                    LoginForm
                v-tab-item
                    RegisterForm

</template>

<script>
import LoginForm from '~/components/LoginForm'
import RegisterForm from '~/components/RegisterForm'
export default {
    data: () => ({
        tab: 0,
        overlay: true
    }),
    components: {
        LoginForm,
        RegisterForm
    },
    methods: {
    }
}
</script>