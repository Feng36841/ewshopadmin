<template>
        <n-upload
                :custom-request="customRequest"
        >
            <n-button v-if="!imgurl">上传文件</n-button>
            <n-image
                    v-else
                    width="100"
                    :src="imgurl"
            />
        </n-upload>
</template>

<script setup>
    import {ref} from 'vue'
 import {uploadToken} from "../../api/base";
 import axios from "axios";

 const imgurl=ref(null)
 const emit = defineEmits(['backKey'])
 const customRequest=({file,action,header,onFinish,onError})=>{
     // console.log(file,action,header,onFinish,onError)
     uploadToken().then(res=>{
         //图片上传的逻辑
         // console.log(res)
         //组装上传的参数
         const formData=new FormData();
         //随机生成图片名称 带有时间戳 根据file.name 来获取文件名后缀
         let fileName=`${Date.now()}${Math.floor(Math.random()*1000)}.${file.name.split('.').pop()}`;
         // let fileName2=`${Math.random().toString(36).substr(2)}.${file.name.split('.').pop()}`
         formData.append('key',fileName)
         formData.append('OSSAccessKeyId',res.accessid)
         formData.append('policy',res.policy)
         formData.append('Signature',res.signature)
         formData.append('file',file.file)
         //发送请求
         console.log(formData)
         axios.post(res.host,formData,{
             headers:{
                 'Content-Type':'multipart/form-data'
             }
         }).then((we)=>{
             console.log(we,'res22222')
             // model.value.img=fileName;
             emit('backKey',fileName)
             imgurl.value=`${res.host}${fileName}`;
             console.log(imgurl.value,'654')
             onFinish(fileName)
         }).catch(err=>{
             // onError(err)
         })
     })
     // key: upload/1657943116627.png
     // OSSAccessKeyId: LTAI5tH86j3fBs1X99z8GMZT
     // policy: eyJleHBpcmF0aW9uIjoiMjAyMi0wNy0xNlQwMzo1MDowNVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDAwXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0=
     // Signature: KhGQ1bFuUvClo47OoNTkDHDBN+w=
     // file: (binary)
 }
</script>

<style scoped>

</style>