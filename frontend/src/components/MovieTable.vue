<template>
    <div class="movie-table">
        <div class="header">
            <span class="title">
                Tabela de filmes
            </span>
            <div class="buttons">
                <Button
                    icon="pi pi-refresh"
                    label="Atualizar"
                    :disabled="loading"
                    @click="refresh"
                />
                <Button
                    icon="pi pi-plus"
                    severity="secondary"
                    @click="create"
                />
            </div>
        </div>
        <div class="content">
            <DataTable :value="movies" :loading="loading">
                <template #empty>
                    Não há filmes a exibir.
                </template>
                <template #loading>
                    Carregando filmes...
                </template>
                <Column
                    field="title"
                    header="Título">
                </Column>
                <Column
                    field="genre"
                    header="Gênero">
                </Column>
                <Column
                    field="direction"
                    header="Direção">
                </Column>
                <Column
                    field="distribution"
                    header="Distribuição">
                </Column>
                <Column
                    field="year"
                    header="Ano">
                </Column>
                <Column>
                    <template #body="slotProps">
                        <div class="buttons">
                            <Button
                                icon="pi pi-pencil"
                                severity="secondary"
                                @click="update(slotProps.data.id)"
                            />
                            <Button
                                icon="pi pi-trash"
                                severity="danger"
                                @click="remove(slotProps.data.id)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
        <EditMovieDialog
            ref="edit-movie-dialog"
        />
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import EditMovieDialog from './EditMovieDialog.vue';
import MovieService from './../services/movie-service';

export default {
    name: 'MovieTable',
    components: {
        DataTable,
        Column,
        Button,
        EditMovieDialog
    },
    data() {
        return {
            movies: [],
            loading: false
        }
    },
    methods: {
        refresh() {
            const getAll = () => {
                return MovieService.getAll();
            };

            const setMovies = (movies) => {
                this.movies = movies;
            };

            const showError = (error) => {
                this.$toast.add({
                    severity: 'error',
                    detail: error.response.data,
                    life: 3000
                });
            };

            this.loading = true;
            return getAll()
                .then(setMovies)
                .catch(showError)
                .finally(() => this.loading = false);
        },
        create() {
            const create = (movie) => {
                return MovieService.create(movie);
            };

            const showSuccess = () => {
                this.$toast.add({
                    severity: 'success',
                    detail: 'Filme criado com sucesso!',
                    life: 3000
                });
            };

            const showError = (error) => {
                this.$toast.add({
                    severity: 'error',
                    detail: error.response.data,
                    life: 3000
                });
            };

            const callback = (movie) => {
                return create(movie)
                    .then(this.refresh)
                    .then(showSuccess)
                    .catch(showError)
            };

            this.$refs['edit-movie-dialog'].open(null, callback);
        },
        update(id) {
            const getMovie = (id) => {
                return MovieService.getById(id);
            };

            const showEditDialog = (movie) => {
                const update = (movie) => {
                    return MovieService.update(id, movie);
                };

                const showSuccess = () => {
                    this.$toast.add({
                        severity: 'success',
                        detail: 'Filme editado com sucesso!',
                        life: 3000
                    });
                };

                const showError = (error) => {
                    this.$toast.add({
                        severity: 'error',
                        detail: error.response.data,
                        life: 3000
                    });
                };

                const callback = (movie) => {
                    return update(movie)
                        .then(this.refresh)
                        .then(showSuccess)
                        .catch(showError)
                };

                this.$refs['edit-movie-dialog'].open(movie, callback);
            };

            return getMovie(id).then(showEditDialog);
        },
        remove(id) {
            const remove = (id) => {
                return MovieService.delete(id);
            };

            const showSuccess = () => {
                this.$toast.add({
                    severity: 'success',
                    detail: 'Filme excluído com sucesso!',
                    life: 3000
                });
            };

            const showError = (error) => {
                this.$toast.add({
                    severity: 'error',
                    detail: error.response.data,
                    life: 3000
                });
            };

            return remove(id)
                .then(this.refresh)
                .then(showSuccess)
                .catch(showError);
        }
    },
    mounted() {
        this.refresh();
    }
}
</script>

<style lang="scss">
    .movie-table {
        padding: 15px;
    }

    .title {
        font-size: 30px;
        font-weight: bold;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
    }
</style>