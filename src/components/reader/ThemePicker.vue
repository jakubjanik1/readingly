<template>
    <div class="theme-picker">
        <div 
            class="theme-picker__option"
            :class="{ 'theme-picker__option--active' : theme === activeTheme }" 
            v-for="theme in themes" 
            :key="theme"
            :theme="theme" 
            @click="setTheme(theme)"
        >{{ theme | capitalize }}</div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'ThemePicker',
    data() {
        return {
            themes: [
                'white',
                'black',
                'sepia'
            ]
        }
    },
    filters: {
        capitalize: text => text[0].toUpperCase() + text.slice(1)
    },
    methods: mapMutations('reader', ['setTheme']),
    computed: mapState('reader', {
        activeTheme: state => state.theme
    })
}
</script>

<style lang="scss" scoped>
    .theme-picker {
        display: flex;
        justify-content: space-around;

        &__option {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border-radius: 1.2em;
            width: 90px;
            height: 40px;
            font-weight: 500;

            &[theme=white] {
                border: 2px solid #dedede;
                color: #333;
                background: #fff;
            }

            &[theme=black] {
                color: #e7e7e7;
                background: #333;
            }

            &[theme=sepia] {
                color: #e7e7e7;
                background: #bfb79d;
            }

            &--active[theme] {
                border: 2px solid;
                border-color: #f7b337;
            }
        }
    }
</style>