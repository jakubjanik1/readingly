<template>
    <div>{{ src }}</div>
</template>

<script>
export default {
    name: 'Reader',
    props: {
        src: {
            type: String,
            required: true
        }
    }
}
</script>