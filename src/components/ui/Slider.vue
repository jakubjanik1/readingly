<template>
    <div class="slider">
        <slot class="slider__label" name="left-label" />

        <VueSlider
            :value="value"
            :min="min"
            :max="max"
            tooltip="none"
            dotSize="22"
            :height="3"
            width="100%"
            :dotStyle="{ border: '2px solid #f7b337', background: 'var(--theme-bg-color)' }"
            @change="$emit('change', $event)"
        />

        <slot class="slider__label" name="right-label" />
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
    name: 'Slider',
    components: {
        VueSlider
    },
    props: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .slider {
        display: grid;
        grid-template-columns: 24px auto 24px;
        grid-column-gap: 24px; 
        color: var(--theme-text-color); 
    }

    $themeColor: #f7b337;
    $bgColor: #dedede;
    $dotShadow: none;
    $dotShadowFocus: none;

    @import '~vue-slider-component/lib/theme/default.scss';
</style>