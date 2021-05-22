<template>
    <div class="library">
        <div class="library__topbar">
            <AddBook @change="addBook($event)" />

            <div>LIBRARY</div>

            <ToggleRemove 
                class="library__toggle-remove"
                @click="removeMode = !removeMode"
                :size="21" 
            />
        </div>
        <div class="library__books">
            <BookUploading v-if="bookIsUploading" />

            <ClipLoader
                class="library__loading"
                v-show="books.length === 0"
                color="var(--theme-text-color)"
                size="75px"
            />
            <Book 
                v-for="book in books" 
                :src="book" 
                :key="book"
                :removable="removeMode"
            />
        </div>
    </div>
</template>

<script>
import AddBook from '@/components/library/AddBook'
import BookUploading from '@/components/library/BookUploading'
import Book from '@/components/library/Book'
import ToggleRemove from 'vue-material-design-icons/Delete'
import { mapActions, mapState } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
    name: 'Library',
    components: {
        AddBook,
        Book,
        BookUploading,
        ToggleRemove,
        ClipLoader
    },
    data() {
        return {
            removeMode: false
        }
    },
    computed: mapState('library', ['books', 'bookIsUploading']),
    created() {
        this.getBooks()
    },
    methods: mapActions('library', ['addBook', 'getBooks'])
}
</script>

<style lang="scss" scoped>
    .library {
        background: var(--theme-bg-color);
        min-height: 100vh;
        height: 100%;
        box-sizing: border-box;
        padding: 1.1em;
        font: {
            size: 1.1em;
            weight: 500;
        }

        &__loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__toggle-remove {
            display: flex;
            cursor: pointer;
        }

        &__topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--theme-text-color);
        }

        &__books {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            grid-auto-rows: 192px;
            grid-gap: 1.1em;
            justify-items: center;
            margin: 1.2em 0 1.2em 0;
        }
    }
</style>