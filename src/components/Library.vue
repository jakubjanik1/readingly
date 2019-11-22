<template>
    <div class="library">
        <AddBook @change="addBook($event)" />

        <Book 
            v-for="book in books" 
            :src="book" 
            :key="book" 
        />
    </div>
</template>

<script>
import AddBook from '@/components/AddBook'
import Book from '@/components/Book'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Library',
    components: {
        AddBook,
        Book
    },
    computed: {
        ...mapState('library', ['books'])
    },
    created() {
        this.getBooks()
    },
    methods: {
        ...mapActions('library', ['addBook', 'getBooks'])
    }
}
</script>

<style>

</style>