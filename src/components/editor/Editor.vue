<template>
    <QuillEditor @update:content="updateContent" ref="editor" theme="snow" />
</template>

<script setup>
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import {ref} from "vue";
    const editor=ref()
    const emit = defineEmits(['backContent'])
    const updateContent=(e)=>{
        // console.log(e)
        emit('backContent',editor.value.getHTML())
        // model.value.details=editor.value.getHTML()
    }
</script>

<style scoped>

</style>