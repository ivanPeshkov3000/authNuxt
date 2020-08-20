<template lang="pug">
    v-form(
            ref="form"
            v-model="valid"
            @submit.prevent="userLogin"
        )
            v-text-field(
                ma-3
                label="E-mail"
                v-model="email"
                outlined
                :rules="emailValidator"
                hide-details="auto"
            )
            v-text-field(
                ma-3
                label="Password"
                v-model="password"
                outlined
                hide-details="auto"
                :rules="passValidator"
                counter
                :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpass ? 'text' : 'password'"
                @click:append="showpass = !showpass"
            )
            v-btn(
                outlined
                type="submit"
                :disabled="!valid"
            ) Login
</template>

<script>
export default {
    middleware: 'auth',
    data: () => ({
        email: "",
        password: "",
        showpass: false,
        valid: false,
        emailValidator: [
            value => {
                if (!value) {
                    return 'Required.'
                }
                if (value.length > 20) {
                    return 'Max 20 characters'
                }
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            }
        ],
        passValidator: [
            v => v.length >= 8 || 'Min 8 characters'
        ],
    }),
    methods: {
        async userLogin(e) {
            try {
                let response = await this.$auth.loginWith('local', { data: { email: this.email, password: this.password }})
                response.then(() => console.log('Logged In!'))
                this.$auth.$storage.setState(key, val)
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        },
        validate () {
            this.$refs.form.validate()
        },
    }
}
</script>