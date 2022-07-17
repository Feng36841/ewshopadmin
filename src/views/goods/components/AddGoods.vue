<template>
    <n-modal v-model:show="props.showModal" @update:show="$emit('changeshowModal',false)">
        <n-card
                style="width: 600px"
                title="添加用户"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
        >
            <template #header-extra>
                <span @click="$emit('checkShowModal',false)" class="cursor-pointer">X</span>
            </template>
            <n-form ref="formRef" :model="model" :rules="rules">
                    <Editor @backContent="backContent"></Editor>
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div style="display: flex; justify-content: flex-end">
                            <n-button
                                    round
                                    type="primary"
                                    @click="userSubmit"
                            >
                                添加
                            </n-button>
                        </div>
                    </n-col>
                </n-row>
            </n-form>

        </n-card>
    </n-modal>
</template>

<script setup>
    import Editor from '../../../components/editor/Editor.vue'
    import {addUsers} from "../../../api/users";
    import {ref,defineProps} from 'vue'
import {useMessage,} from 'naive-ui'


    const emit = defineEmits(['checkShowModal'])
const  props=defineProps({
    showModal:{
        type:Boolean,
        default:false
    }
})
const formRef = ref()
    const editor=ref()
const rPasswordFormItemRef = ref(null)
const message = useMessage()
const model = ref({
    details: null,
})

const rules= {
    details: [
        {
            required: true,
            message: '请输入商品详情',
            trigger:'blur'
        }
    ],

}

    const userSubmit=(e)=>{
        e.preventDefault()
        // console.log(editor.value.getHTML())
        console.log(model.value)
    }
    const backContent=(htmlString)=>{
        model.value.details=htmlString
    }

</script>

<style scoped>

</style>