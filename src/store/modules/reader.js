import { inRange } from 'lodash';

export default {
    namespaced: true,

    state: {
        fontSize: 100,
        theme: 'white',
        brightness: 100,
        progress: 0
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
        },

        setBrightness(state, newBrightness) {
            if (inRange(newBrightness, 20, 100 + 1)) {
                state.brightness = newBrightness
            }
        },

        setProgress(state, newProgress) {
            if (inRange(newProgress, 0, 100 + 1)) {
                state.progress = newProgress
            }
        }
    }
}