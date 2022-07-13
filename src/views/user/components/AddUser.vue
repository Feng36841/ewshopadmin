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
                <span @click="$emit('changeshowModal',false)">X</span>
            </template>
            <n-form ref="formRef" :model="model" :rules="rules">
                <n-form-item path="name" label="姓名">
                    <n-input v-model:value="model.name" placeholder="请输入姓名" />
                </n-form-item>
                <n-form-item path="email" label="邮箱">
                    <n-input
                            v-model:value="model.email"
                            type="email"
                            placeholder="请输入邮箱"
                    />
                </n-form-item>
                <n-form-item
                        path="password"
                        label="密码"
                >
                    <n-input
                            v-model:value="model.password"
                            type="password"
                            placeholder="请输入密码"
                    />
                </n-form-item>
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
            <template #footer>
                尾部
            </template>
        </n-card>
    </n-modal>
</template>

<script setup>
    import {addUsers} from "../../../api/users";
    import {ref,defineProps} from 'vue'
import {useMessage,} from 'naive-ui'

    const emit = defineEmits(['changeshowModal'])
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
    name: null,
    email: null,
    password: null
})

const rules= {
    name: [
        {
            required: true,
            message: '请输入用户名称'
        }
    ],
    email: [
        {
            required: true,
            message: '请输入email'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码'
        }
    ],

}

    const userSubmit=(e)=>{
        e.preventDefault()
        formRef.value.validate(errors=>{
            if (errors){
                console.log(errors)
            }else {
                console.log(model.value)
                addUsers(model.value).then(res=>{
                    emit('changeshowModal',false)
                })
            }
        })
    }
</script>

<style scoped>

</style>