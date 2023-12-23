<template>
    <div class="register-view">
        <CredentialPanel
            title="Registrar"
            :showPasswordFeedback="true"
            :showRegisterButton="false"
            mainButtonLabel="Registrar"
            :useLastLogin="false"
            @on-click="onClick"
        />
    </div>
</template>

<script>
import CredentialPanel from './../components/CredentialPanel.vue';
import AuthService from './../services/auth-service';

export default {
    name: 'RegisterView',
    components: {
        CredentialPanel
    },
    methods: {
        onClick(login, password) {
            const register = () => {
                return AuthService.register(login, password);
            };

            const doLogin = () => {
                return AuthService.login(login, password);
            };

            const setData = (token) => {
                localStorage.setItem('login', login);
                localStorage.setItem('token', token);
            };

            const goToMoviePage = () => {
                this.$router.push({
                    path: '/movie'
                });
            };

            const showError = (error) => {
                this.$toast.add({
                    severity: 'error',
                    detail: error.response.data,
                    life: 3000
                });
            };

            return register()
                .then(doLogin)
                .then(setData)
                .then(goToMoviePage)
                .catch(showError);
        }
    }
}
</script>

<style lang="scss" scoped>
    .register-view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
    }
</style>