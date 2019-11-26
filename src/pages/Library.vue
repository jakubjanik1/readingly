<template>
    <div class="library">
        <AddBook 
            class="library__add-book"
            @change="addBook($event)"
        />

        <BookUploading v-if="bookIsUploading" />

        <Book 
            v-for="book in books" 
            :src="book" 
            :key="book" 
        />
    </div>
</template>

<script>
import AddBook from '@/components/library/AddBook'
import BookUploading from '@/components/library/BookUploading'
import Book from '@/components/library/Book'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Library',
    components: {
        AddBook,
        Book,
        BookUploading
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
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        grid-auto-rows: 224px;
        grid-gap: 1.5em;
        justify-items: center;
        padding: 64px 1.5em 1.5em 1.5em;
        background: #f9f9f9;
        box-sizing: border-box;
        height: 100vh;

        &__add-book {
            position: absolute;
            top: 16px;
        }
    }
</style>