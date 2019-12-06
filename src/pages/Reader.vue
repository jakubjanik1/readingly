<template>
    <div>
        <ReturnToLibrary />
    </div>
</template>

<script>
import ReturnToLibrary from '@/components/reader/ReturnToLibrary'

export default {
    name: 'Reader',
    components: {
        ReturnToLibrary
    },
    props: {
        src: {
            type: String,
            required: true
        }
    }
}
</script>