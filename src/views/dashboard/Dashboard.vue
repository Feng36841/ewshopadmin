<template>
    <div class="p-5 flex justify-around homeStatistic">
        <n-card title="用户数" content-style="color:#3F8600;font-size:24px">
            {{userCout}}
        </n-card>
        <n-card title="商品数" content-style="color:#CF1322;font-size:24px">
            {{goodCout}}
        </n-card>
        <n-card title="订单数" content-style="color:#003B90;font-size:24px">
            {{orderCount}}
        </n-card>
    </div>
</template>

<script setup>
    import {getAllUsers,getAllGoods,getAllOrder} from '../../api/statistics'
    import {ref} from 'vue'
    const userCout=ref(0)
    const goodCout=ref(0)
    const orderCount=ref(0)
    getAllUsers().then(res=>{
        console.log(res.meta.pagination.total,'用户数')
        userCout.value=res.meta.pagination.total
    })
    getAllGoods().then(res=>{
        console.log(res.meta.pagination.total,'商品数')
        goodCout.value=res.meta.pagination.total
    })
    getAllOrder().then(res=>{
        console.log(res.meta.pagination.total,'订单数')
        orderCount.value=res.meta.pagination.total
    })
</script>

<style scoped>
    .n-card {
        max-width: 390px;
    }


</style>
<style lang="less">
    .homeStatistic {
        .n-card-header__main {
            font-size: 16px;
            color: #8C8C8C !important;
        }
    }
</style>