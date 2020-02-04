<template>
    <div class="theme-picker">
        <div class="theme-picker__option" theme="white" @click="setTheme('white')">White</div>
        <div class="theme-picker__option" theme="black" @click="setTheme('black')">Black</div>
        <div class="theme-picker__option" theme="sepia" @click="setTheme('sepia')">Sepia</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'ThemePicker',
    methods: mapMutations('reader', ['setTheme'])
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
            border-radius: 1.2em;
            width: 100px;
            height: 40px;
            font-weight: 500;

            &[theme=white] {
                border: 1px solid #333;
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
        }
    }
</style>