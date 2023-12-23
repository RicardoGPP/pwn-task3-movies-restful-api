<template>
    <div class="edit-movie-dialog">
        <Dialog
            v-model:visible="visible"
            modal
            :style="{ width: '30rem' }">
            <template #header>
                <span class="title">
                    {{ `${editing ? 'Edição' : 'Criação'} de filme` }}
                </span>
            </template>
            <div class="content">
                <div class="input">
                    <label for="title">
                        Título:
                    </label>
                    <InputText
                        id="title"
                        autofocus
                        v-model="newMovie.title"
                    />
                </div>
                <div class="input">
                    <label for="genre">
                        Gênero:
                    </label>
                    <InputText
                        id="genre"
                        v-model="newMovie.genre"
                    />
                </div>
                <div class="input">
                    <label for="direction">
                        Direção:
                    </label>
                    <InputText
                        id="direction"
                        v-model="newMovie.direction"
                    />
                </div>
                <div class="input">
                    <label for="distribution">
                        Distribuição:
                    </label>
                    <InputText
                        id="distribution"
                        v-model="newMovie.distribution"
                    />
                </div>
                <div class="input">
                    <label for="year">
                        Ano:
                    </label>
                    <InputText
                        id="year"
                        v-model="newMovie.year"
                    />
                </div>
            </div>
            <template #footer>
                <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    severity="secondary"
                    @click="close"
                />
                <Button
                    label="Aplicar"
                    icon="pi pi-check"
                    @click="apply"
                />
            </template>
        </Dialog>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'EditMovieDialog',
    components: {
        Dialog,
        InputText,
        Button
    },
    data() {
        return {
            visible: false,
            oldMovie: null,
            newMovie: {},
            callback: null
        }
    },
    computed: {
        editing() {
            return this.oldMovie != null;
        }
    },
    methods: {
        open(movie, callback) {
            this.oldMovie = movie;

            if (movie) {
                this.newMovie = {
                    ...movie
                }
            } else {
                this.newMovie = {
                    title: '',
                    genre: '',
                    direction: '',
                    distribution: '',
                    year: 2000
                };
            }

            this.callback = callback;
            this.visible = true;
        },
        close() {
            this.visible = false;
        },
        apply() {
            this.callback(this.newMovie).finally(this.close);
        }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        font-size: 20px;
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
</style>