<template>
    <div class="add-book" @click="openFileDialog">
        <input 
            type="file" 
            class="add-book__input"
            ref="input"
            @change="handleFileChange"
        >
        +
    </div>
</template>

<script>
export default {
    name: 'AddBook',
    methods: {
        openFileDialog() {
            this.$refs.input.click()
        },
        handleFileChange(event) {
            const file = event.target.files[0]
            this.$refs.input.value = ''

            if (file.type != 'application/pdf') {
                return this.$emit('error', 'Invalid book format')
            }

            this.$emit('change', file)
        }
    }
}
</script>

<style lang="scss" scoped>
    .add-book {
        &__input {
            display: none;
        }
    }
</style>