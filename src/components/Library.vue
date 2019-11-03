<template>
    <div class="library">
        <AddBook @change="addBook($event)" />
    </div>
</template>

<script>
import AddBook from '@/components/AddBook'
import { mapActions } from 'vuex'

export default {
    name: 'Library',
    components: {
        AddBook
    },
    methods: {
        ...mapActions('library', ['addBook'])
    }
}
</script>

<style>

</style>