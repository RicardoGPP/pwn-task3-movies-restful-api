<template>
    <section>
        <Toast/>
        <RouterView/>
    </section>
</template>

<script setup>
import Toast from 'primevue/toast';
import { RouterView } from 'vue-router';
</script>

<style scoped>
</style>