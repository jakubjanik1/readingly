import { inRange } from 'lodash';

export default {
    namespaced: true,

    state: {
        textSize: 100
    },

    mutations: {
        setTextSize(state, newTextSize) {
            if (inRange(newTextSize, 100, 200 + 1)) {
                state.textSize = newTextSize
            }
        }
    }
}