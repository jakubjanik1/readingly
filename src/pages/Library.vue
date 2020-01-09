<template>
    <div class="library">
        <div class="library__topbar">
            <AddBook @change="addBook($event)" />

            <div>LIBRARY</div>

            <SearchIcon class="library__search" :size="21" />
        </div>

        <div class="library__books">
            <BookUploading v-if="bookIsUploading" />

            <Book 
                v-for="book in books" 
                :src="book" 
                :key="book" 
            />
        </div>
    </div>
</template>

<script>
import AddBook from '@/components/library/AddBook'
import BookUploading from '@/components/library/BookUploading'
import Book from '@/components/library/Book'
import SearchIcon from 'vue-material-design-icons/Magnify'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Library',
    components: {
        AddBook,
        Book,
        BookUploading,
        SearchIcon
    },
    computed: {
        ...mapState('library', ['books', 'bookIsUploading'])
    },
    created() {
        this.getBooks()
    },
    methods: {
        ...mapActions('library', ['addBook', 'getBooks'])
    }
}
</script>

<style lang="scss" scoped>
    .library {
        background: #f9f9f9;
        min-height: 100vh;
        height: 100%;
        box-sizing: border-box;
        padding: 1.1em;
        font: {
            size: 1.1em;
            weight: 500;
        }

        &__topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__books {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            grid-auto-rows: 192px;
            grid-gap: 1.1em;
            justify-items: center;
            margin: 1.2em 0 1.2em 0;
        }

        &__search {
            display: flex;
            justify-content: center;
        }
    }
</style>