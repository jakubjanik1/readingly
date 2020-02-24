import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Vue from 'vue'
import library from './modules/library'
import reader from './modules/reader'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        library,
        reader
    },
    plugins: [
        new VuexPersistence({ modules: ['reader'] }).plugin
    ]
})