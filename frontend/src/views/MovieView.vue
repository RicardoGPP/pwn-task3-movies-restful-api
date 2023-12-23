<template>
    <div v-if="ready" class="movie-view">
        <AccountPanel/>
        <MovieTable/>
    </div>
</template>

<script>
import AccountPanel from './../components/AccountPanel.vue';
import MovieTable from './../components/MovieTable.vue';

export default {
    name: 'MovieView',
    components: {
        AccountPanel,
        MovieTable
    },
    data() {
        return {
            ready: false
        }
    }, 
    created() {
        const token = localStorage.getItem('token');

        if (token) {
            this.ready = true;
            return;
        }

        this.$router.push({
            path: '/login'
        });
    }
}
</script>

<style lang="scss" scoped>
    .movie-view {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>