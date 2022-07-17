<template>
    <div>
        控制台
    </div>
</template>

<script setup>
    import {users} from "../../api/users";
    users().then(res=>{
        console.log(res,'222')
    })
</script>

<style scoped>

</style>