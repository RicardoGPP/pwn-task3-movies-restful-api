<template>
    <div class="credential-panel">
        <div class="header">
            {{ title }}
        </div>
        <div class="content">
            <div class="input">
                <label for="login">
                    Usuário:
                </label>
                <InputText
                    id="login"
                    v-model="login"
                    autofocus
                />
            </div>
            <div class="input">
                <label for="password">
                    Senha:
                </label>
                <Password
                    id="password"
                    v-model="password"
                    :feedback="showPasswordFeedback"
                />
            </div>
        </div>
        <div class="footer">
            <Button
                v-if="showRegisterButton"
                label="Não tenho conta"
                severity="secondary"
                outlined
                @click="goToRegisterPage"/>
            <Button
                :label="mainButtonLabel"
                :disabled="mainButtonDisabled"
                @click="$emit('on-click', login, password)"/>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {
    name: 'CredentialPanel',
    components: {
        InputText,
        Password,
        Button
    },
    props: {
        title: {
            type: String,
            required: true
        },
        showPasswordFeedback: {
            type: Boolean,
            required: true
        },
        showRegisterButton: {
            type: Boolean,
            required: false
        },
        mainButtonLabel: {
            type: String,
            required: true
        },
        useLastLogin: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            login: '',
            password: ''
        }
    },
    computed: {
        mainButtonDisabled() {
            return this.login.trim() == '' || this.password.trim() == '';
        }
    },
    methods: {
        goToRegisterPage() {
            this.$router.push({
                path: '/register'
            });
        }
    },
    mounted() {
        if (this.useLastLogin) {
            this.login = localStorage.getItem('login');
        }
        document.getElementById('login').focus();
    }
}
</script>
<style lang="scss" scoped>
    .credential-panel {
        display: flex;
        flex-direction: column;
        width: 340px;
        border-radius: 5px;
        border: 1px solid #10b981;
        background-color: #ffffff;

        & > div {
            padding: 30px;
        }
    }

    .header {
        background-color: #10b981;
        color: white;
        font-size: 28px;
        font-weight: bold;
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .input {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }

        & > label {
            font-weight: bold;
            margin-bottom: 5px;
        }
    }

    .footer {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
    }
</style>