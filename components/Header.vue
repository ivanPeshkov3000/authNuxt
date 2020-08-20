<template lang="pug">
    v-app
        v-app-bar(
            dense
            flat
        )
            v-col
                .logo
                    v-avatar(
                        tile
                    )
                        v-img(
                            height="50px"
                            width="50px"
                            src="numzero.png"
                            contain
                        )
                    v-text="YourProfile"
                v-toolbar-title
            v-col
                v-list.d-flex(
                    dense
                    nav
                )
                    v-list-item
                        n-link(to="/profile") Основная
                    v-list-item
                        n-link(to="/messages") Сообщения
                    v-list-item
                        n-link(to="/photos") Фото
                    v-list-item
                        n-link(to="/places") Места
                    v-list-item
                        n-link(to="/notes") Заметки
                    v-list-item
                        n-link(to="/docs") Документы
            v-spacer
            v-col
                .authorize
                    v-dialog(
                        v-if="!isAuthenticated"
                        v-model="dialog"
                        width="300px"
                    )
                        template(#activator="{ on, attrs }")
                            v-btn(
                                v-on="on"
                                v-bind="attrs"
                            ) Авторизация
                        LogRegCard
                    v-menu(
                        v-bind="isAuthenticated"
                        v-if="isAuthenticated"
                        v-model="profile"
                        transition="scroll-y-transition"
                        :close-on-content-click="false"
                        right
                    )
                        template(
                            #activator="{ on, attrs }"
                        )
                            v-btn(
                                v-bind="attrs"
                                v-on="on"
                            ) {{loggedUser.username}} 
                                v-icon(left) mdi-user
                        v-card(
                            mandatory
                        )
                            v-list
                                v-list-item(
                                    @click=""
                                )
                                    v-list-item-avatar
                                        img(src="avahero.jpg")
                                    v-list-content
                                        v-list-item-title Profile
                            v-card-actions(
                            )
                                v-btn(
                                    block
                                    outlined
                                    flat
                                    @click="logOut"
                                ) Logout
</template>

<script>
import LogRegCard from '~/components/LogRegCard'
import { mapGetters } from 'vuex'


export default {
    middleware: "auth",
    data: () => ({
        dialog: false,
        profile: false,
        navigation: true
    }),
    computed: mapGetters(['isAuthenticated', 'loggedUser']),
    methods: {
        async logOut() {
            await this.$auth.logout()
        }
    },
    components: {
        LogRegCard
    }
}
</script>

<style>
    a {
        color: black;
        text-decoration: none;
    }
</style>