<template>
    <n-modal v-model:show="props.showModal" @update:show="$emit('changeshowModal',false)">
        <n-card
                style="width: 600px"
                title="添加轮播图"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
        >
            <template #header-extra>
                <span @click="$emit('checkShowModal',false)" class="cursor-pointer">X</span>
            </template>
            <n-form ref="formRef" :model="model" :rules="rules">
                <n-form-item path="title" label="标题">
                    <n-input v-model:value="model.title" placeholder="请输入标题" />
                </n-form-item>
                <n-form-item path="url" label="跳转url">
                    <n-input
                            v-model:value="model.url"
                            type="email"
                            placeholder="请输入跳转url"
                    />
                </n-form-item>
                <n-form-item label="是否启用" path="status">
                    <n-radio-group v-model:value="model.status" name="status">
                        <n-space>
                            <n-radio value="0">
                                否
                            </n-radio>
                            <n-radio value="1">
                                是
                            </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>

                <n-form-item label="图片上传" path="img">
                    <Upload @backKey="backKey"></Upload>
                </n-form-item>

                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div style="display: flex; justify-content: flex-end">
                            <n-button
                                    round
                                    type="primary"
                                    @click="slideSubmit"
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
    import Upload from '../../../components/upload/index.vue'
    import {addSlides} from "../../../api/slides";
    import axios from 'axios';
    import {uploadToken} from "../../../api/base";
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
const rPasswordFormItemRef = ref(null)
const message = useMessage()
const model = ref({
    title: null,
    img: null,
    url: null,
    status:null
})

const rules= {
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger:'blur'
        }
    ],
    img: [
        {
            required: true,
            message: '请上传图片',
        }
    ],
    url: [
        {
            required: true,
            message: '请输入图片地址',
            trigger:'blur'
        }
    ],
    status: [
        {
            required: true,
            message: '请选择状态',
        }
    ],
}
    const slideSubmit=(e)=>{
        e.preventDefault()
        formRef.value.validate(errors=>{
            if (errors){
                console.log(errors)
            }else {
                //请求API 添加数据
                addSlides(model.value).then(res=>{
                    console.log(res)
                    window.$message.success('添加成功')
                    emit('checkShowModal',false)
                    emit('reloadTable')
                })
            }
            console.log(model.value)
        })
    }
const backKey=(key)=>{
        model.value.img=key
}
</script>

<style scoped>

</style>