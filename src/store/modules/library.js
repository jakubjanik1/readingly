import { uploadFile } from '../../firebase/storage'

export default {
    state: {
        books: []
    },

    mutations: {
        pushBook({ books }, book) {
            books.push(book)
        }
    },

    actions: {
        async addBook({ commit }, book) {
            const bookUrl = await uploadFile(book)

            commit('pushBook', bookUrl)
        }
    }
}