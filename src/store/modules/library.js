import { uploadFile, getFiles } from '@/firebase/storage'
import { createThumbnail } from '@/services/pdf.service'

export default {
    namespaced: true, 
    
    state: {
        books: [],
        bookIsUploading: false
    },

    mutations: {
        pushBook({ books }, book) {
            books.unshift(book)
        },
        setBooks(state, books) {
            state.books = books
        },
        setBookIsUploading(state, value) {
            state.bookIsUploading = value
        }
    },

    actions: {
        async addBook({ commit }, book) {
            commit('setBookIsUploading', true)

            const bookUrl = await uploadFile(book)
            const bookThumbnail = await createThumbnail(bookUrl)

            commit('setBookIsUploading', false)

            commit('pushBook', bookThumbnail)
        },
        async getBooks({ commit }) {
            const books = await getFiles(/.*\.jpg/)

            commit('setBooks', books)
        }
    }
}