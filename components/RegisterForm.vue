<template lang="pug">
    v-form(
            ref="form"
            @submit.prevent="register"
            v-model="valid"
        )
            v-text-field(
                ma-3
                label="UserName"
                v-model="name"
                outlined
                counter
                :rules="nameValidator"
                hide-details="auto"
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
            ) Register
</template>

<script>
export default {
    middleware: 'auth',
    data: () => ({
        email: "",
        name: "",
        password: "",
        valid: false,
        showpass: false,
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
        nameValidator: [
            v => {
                if (!v) {
                    return 'Required.'
                }
                if (v.length > 20) {
                    return 'Max 20 characters'
                }
                if (v.length < 4) {
                    return 'Min 4 characters'
                }
                // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)(([a-zA-Z0-9])))$/
                // return pattern.test(value) || 'Not allowed name.'
            }
        ]
    }),
    methods: {
        async register() {
            try {
                this.$axios.put('/register/reg', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                .then( () => {
                    return this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        },
                    })
                })
                .then( () => this.$router.push('/') )
                .catch( e => {
                    console.error(e.response.status)
                })

            } catch(e) {
                console.error(`Register error: ${e}`)
            }
        },
        validate () {
            this.$refs.form.validate()
        },
    }
}
</script>
