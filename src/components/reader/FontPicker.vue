<template>
    <div class="font-picker">
        <div class="font-picker__option" font="default" @click="setFont(null)">Aa</div>
        <div class="font-picker__option" font="roboto" @click="setFont('Roboto Slab')">Aa</div>
        <div class="font-picker__option" font="lora" @click="setFont('Lora')">Aa</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'FontPicker',
    methods: mapMutations('reader', ['setFont'])
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&family=Roboto+Slab&display=swap');

    .font-picker {
        display: flex;
        justify-content: space-around;

        &__option {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: 1px solid #333;
            border-radius: 1.2em;
            width: 90px;
            height: 40px;
            font-size: large;

            &[font=roboto] {
                font-family: Roboto Slab, serif;
            }
            &[font=lora] {
                font-family: Lora, serif;
            }
        }
    }
</style>