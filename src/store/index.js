import Vuex from 'vuex'
import Vue from 'vue'
import library from './modules/library'
import reader from './modules/reader'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        library,
        reader
    }
})