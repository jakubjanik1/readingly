import { inRange } from 'lodash';

export default {
    namespaced: true,

    state: {
        fontSize: 100,
        theme: 'white'
    },

    mutations: {
        setFontSize(state, newFontSize) {
            if (inRange(newFontSize, 100, 200 + 1)) {
                state.fontSize = newFontSize
            }
        },

        setTheme(state, newTheme) {
            const availableThemes = ['white', 'black', 'sepia']
            if (availableThemes.includes(newTheme)) {
                state.theme = newTheme
            }
        }
    }
}