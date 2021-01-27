export default {
    namespaced: true,

    state: {
        fontSize: 100,
        theme: 'white',
        brightness: 100,
        progress: 0,
        font: null
    },

    mutations: {
        setFontSize(state, newFontSize) {
            if (newFontSize >= 100 && newFontSize <= 200 + 1) {
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
            if (newBrightness >= 20 && newBrightness <= 100 + 1) {
                state.brightness = newBrightness
            }
        },

        setProgress(state, newProgress) {
            if (newProgress >= 0 && newProgress <= 100 + 1) {
                state.progress = newProgress
            }
        },

        setFont(state, newFont) {
            const availableFonts = ['Roboto Slab', 'Lora', null]
            if (availableFonts.includes(newFont)) {
                state.font = newFont
            }
        }
    }
}