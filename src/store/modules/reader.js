import { inRange } from 'lodash';

export default {
    namespaced: true,

    state: {
        textSize: 100,
        theme: 'light'
    },

    mutations: {
        setTextSize(state, newTextSize) {
            if (inRange(newTextSize, 100, 200 + 1)) {
                state.textSize = newTextSize
            }
        },

        setTheme(state, newTheme) {
            const availableThemes = ['light', 'dark', 'sepia']
            if (availableThemes.includes(newTheme)) {
                state.theme = newTheme
            }
        }
    }
}