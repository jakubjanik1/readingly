import { uploadFile, getFiles } from '@/firebase/storage'
import { createThumbnail } from '@/services/pdf.service'

export default {
    namespaced: true, 
    
    state: {
        books: []
    },

    mutations: {
        pushBook({ books }, book) {
            books.push(book)
        },
        setBooks(state, books) {
            state.books = books
        }
    },

    actions: {
        async addBook({ commit }, book) {
            const bookUrl = await uploadFile(book)
            const bookThumbnail = await createThumbnail(bookUrl)

            commit('pushBook', bookThumbnail)
        },
        async getBooks({ commit }) {
            const books = await getFiles(/.*\.jpg/)

            commit('setBooks', books)
        }
    }
}