import { uploadFile, getFiles } from '../../firebase/storage'

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

            commit('pushBook', bookUrl)
        },
        async getBooks({ commit }) {
            const books = await getFiles()

            commit('setBooks', books)
        }
    }
}