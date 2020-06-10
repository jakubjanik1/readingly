<template>
    <div class="font-picker">
        <div 
            class="font-picker__option"
            :class="{ 'font-picker__option--active' : font === activeFont }" 
            v-for="font in fonts" 
            :key="font"
            :font="font" 
            @click="setFont(font)"
        >Aa</div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'FontPicker',
    data() {
        return {
            fonts: [
                null,
                'Roboto Slab',
                'Lora'
            ]
        }
    },
    methods: mapMutations('reader', ['setFont']),
    computed: mapState('reader', {
        activeFont: state => state.font
    })
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&family=Roboto+Slab&display=swap');

    .font-picker {
        display: flex;
        justify-content: space-between;

        &__option {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: 2px solid #dedede;
            border-radius: 1.2em;
            flex-basis: 90px;
            height: 40px;

            &--active {
                border: 2px solid #f7b337;
            }

            &[font="Roboto Slab"] {
                font-family: Roboto Slab, serif;
            }

            &[font="Lora"] {
                font-family: Lora, serif;
            }
        }
    }
</style>