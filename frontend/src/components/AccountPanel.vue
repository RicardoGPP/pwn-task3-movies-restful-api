<template>
    <div class="account-panel">
        <span>
            Bem-vindo, <b>{{ login }}</b>
        </span>
        <Button
            label="Logout"
            icon="pi pi-sign-out"
            severity="info"
            @click="logout"
        />
    </div>
</template>

<script>
import Button from 'primevue/button';

export default {
    name: 'AccountPanel',
    components: {
        Button
    },
    computed: {
        login() {
            return localStorage.getItem('login');
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push({
                path: '/login'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .account-panel {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        padding: 15px;
        border-bottom: 1px solid #dbdbdb;
        background-color: white;
    }
</style>