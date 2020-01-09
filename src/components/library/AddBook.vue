<template>
    <div class="add-book" @click="openFileDialog">
        <input 
            type="file" 
            class="add-book__input"
            ref="input"
            @change="handleFileChange"
        >
        <AddIcon class="add-book__icon" />
    </div>
</template>

<script>
import AddIcon from 'vue-material-design-icons/Plus'

export default {
    name: 'AddBook',
    components: {
        AddIcon
    },
    methods: {
        openFileDialog() {
            this.$refs.input.click()
        },
        handleFileChange(event) {
            const file = event.target.files[0]
            this.$refs.input.value = ''

            if (file.type != 'application/epub+zip') {
                return this.$emit('error', 'Invalid book format')
            }

            this.$emit('change', file)
        }
    }
}
</script>

<style lang="scss" scoped>
    .add-book {    
        width: 1.3em;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &__input {
            display: none;
        }

        &__icon {
            color: #000;
            display: flex;
            justify-content: center;
        }
    }
</style>