<template>
    <div class="goodslist">
        <div class="pl-5 mt-0.5 h-16 w-full bg-white py-2">
            <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">商品管理</span>
            <div class="font-bold text-xl mt-0.5">商品管理</div>
        </div>
        <div class="content pt-1 ">
            <div class="bg-white pr-8 h-12">
                <n-form
                        class="mt-2"
                        label-placement="left"
                        ref="formRef"
                        inline
                        :label-width="80"
                        :model="formSearch"
                >
                    <n-form-item label="姓名" path="user.name">
                        <n-input v-model:value="formSearch.name" placeholder="输入姓名" size="small"/>
                    </n-form-item>
                    <n-form-item label="年龄" path="user.age">
                        <n-input v-model:value="formSearch.email" placeholder="输入邮箱" size="small"/>
                    </n-form-item>
                    <n-form-item class="ml-auto">
                        <n-button size="small" class="mr-4" attr-type="button" @click="serachReload">
                            重置
                        </n-button>
                        <n-button type="info" size="small" attr-type="button" @click="serachSubmit">
                            搜索
                        </n-button>
                    </n-form-item>
                </n-form>
            </div>
            <div class="mt-1 bg-white">
                <div class="py-2 flex">
                    <span class="text-base pl-5 ">商品列表</span>
                    <span class="ml-auto mr-8"><n-button @click="showModal = true" type="info" size="small">+ 新建</n-button></span>
                </div>
                <div >
                    <div class="pl-5 pr-5">
                        <n-data-table

                                row-class-name="rowclass"
                            size="tiny"
                            :columns="columns"
                            :data="data"
                            :pagination="pagination"
                            :bordered="false"
                        />

                    </div>
                    <div class="p-2 flex justify-end pr-10">
                        <n-pagination v-model:page="page" @update:page="updatePage" :page-count="total_pages" />
                    </div>
                </div>
            </div>
            <AddGoods  @checkShowModal="checkShowModal" @reloadTable="reload"  :showModal="showModal"></AddGoods>
<!-- v-if取消之后清空数据 <AddUser v-if="showModal" @changeshowModal="changeshowModal" @reloadUsers="reloadUsers"  :showModal="showModal"></AddUser>-->
            <EditUser :user_id="user_id" v-if="showEditModal"  @checkShowModal="checkEditModal" @reloadTable="reload"  :showModal="showEditModal"></EditUser>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {user} from "../../api/auth";
    //数据表格
    import { h,ref ,onMounted,reactive} from 'vue'
    import { NButton, useMessage ,NAvatar,NSwitch,useLoadingBar} from 'naive-ui'
    import type { DataTableColumns } from 'naive-ui'
    import EditUser from './components/EditUser.vue'
    import AddGoods from './components/AddGoods.vue'
    import {goods} from '../../api/goods'
    import {users} from "../../api/users";
    //添加模态框
    const showModal=ref(false)
    //编辑模态框
    const showEditModal=ref(false)
    //分页
    const page= ref(1)
    //表单
    const formSearch= ref({
        name:'',
        email:''
    })
    // const abc=ref(1234567890)
    const checkShowModal=(status)=>{
        showModal.value=status
    }
    const checkEditModal=(show:boolean)=>{
        showEditModal.value=show
    }



    const loadingBar = useLoadingBar()
    const buer=ref(false)
    const active : boolean=buer.value
    type Song = {
        avatar_url: string
        name: string
        email: string
        is_locked: boolean
        created_at: string
        updated_at:string
    }
    const user_id=ref('')
    const createColumns = ({
                               play
                           }: {
        play: (row: Song) => void
    }): DataTableColumns<Song> => {
        return [
            {
                title: '图片',
                key: 'cover_url',
                minWidth:40,
                render (row) {
                    return h(
                        NAvatar,
                        {
                            round:true,
                            size:"tiny",
                            src:row.cover_url,
                        },
                    )
                }
            },
            {
                title: '商品名',
                key: 'title',
                align:"left"
            },
            {
                title: '价格',
                key: 'price'
            },
            {
                title: '库存',
                key: 'stock'
            },
            {
                title: '销量',
                key: 'sales'
            },
            {
                title: '是否上架',
                key: 'is_on',
                render (row) {
                    return h(
                        NSwitch,
                        // {
                        //     value:'active',
                        //     round:true,
                        //     size:"small",
                        //     activeValue:1,
                        //     inactiveValue:0,
                        //     value:row.is_locked ==1 ? fales : true
                        // },
                    )
                }

            },
            {
                title: '是否推荐',
                key: 'is_recommend',
                render (row) {
                    return h(
                        NSwitch,
                    )
                }

            },
            {
                title: '创建时间',
                key: 'created_at',

            },
            {
                title: '操作',
                key: 'updated_at',
                render (row) {
                    return h(
                        NButton,
                        {
                            size:"tiny",
                            color:'#1890ff',
                            strong:true,
                            onClick:()=>{
                                user_id.value=row.id;
                                showEditModal.value=true
                            }
                        },'编辑'
                    )
                }
            }
        ]
    }

    // console.log(user_id,123)
    const total_pages=ref(0)
    let data= ref([] as Song[]);
        // {avatar_url:'头像',name:'名字',email:'邮箱',is_locked:false,created_at:'创建时间',updated_at:'操作时间'}

    // data = [
    //     {avatar_url:'头像',name:'名字',email:'邮箱',is_locked:false,created_at:'创建时间',updated_at:'操作时间'}
    // ]
    // {avatar_url:'头像',name:'名字',email:'邮箱',is_locked:false,created_at:'创建时间',updated_at:'操作时间'}
    // { no: 3, title: 'Wonderwall', length: '4:18' },
    // { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
    // { no: 12, title: 'Champagne Supernova', length: '7:27' }

    // users().then(res=>{
    //     data.value = [
    //         {avatar_url:'头像',name:'name',email:'邮箱',is_locked:false,created_at:'创建时间',updated_at:'操作时间'}
    //     ] as Song[];
    //     console.log(data)
    //
    // })

    const message = useMessage()
    const columns= createColumns({
        play (row: Song) {
            message.info(`Play ${row.title}`)
        }
    })
    const pagination=ref(false as const)
    onMounted(()=>{
        getGoodsList({});
    })
    const updatePage=(pageNum)=>{
        getGoodsList({
            name:formSearch.value.name,
            email:formSearch.value.email,
            current:pageNum
        })
    }
    const serachSubmit=(e)=>{
        e.preventDefault()
        getGoodsList({
            name:formSearch.value.name,
            email:formSearch.value.email,
            current:1
        })
    }
    const serachReload=()=>{
        getGoodsList({});
        formSearch.value.name='';
        formSearch.value.email='';
    }
    const getGoodsList=(params)=>{
        loadingBar.start()
        goods(params).
        then(res=>{
            data.value=res.data as Song[]
            total_pages.value=res.meta.pagination.total_pages
            page.value=res.meta.pagination.current_page
            loadingBar.finish()
        }).catch(err=>{
            loadingBar.error()
        })
    }
    const reload=()=>{
        getGoodsList({
            name:formSearch.value.name,
            email:formSearch.value.email,
            current:page.value
        })
    }
</script>

<style  scoped>


</style>
<style lang="less">
    .rowclass{
        height: 42px;
    }
    .n-data-table .n-data-table-tr{
        height: 40px;
    }
    .n-data-table .n-data-table-th {
        text-align:center !important;
    }
    /*.colclass{*/
    /*    */
    /*}*/

    .goodslist {
        .n-data-table .n-data-table-td:nth-child(1){
            text-align: center;
        }
        .n-data-table .n-data-table-td:nth-child(2){
            /*padding-left: 40px;*/
        }
        .n-data-table .n-data-table-td:nth-child(3){
            /*margin-left: 40px;*/
            text-align: center;
        }
        .n-data-table .n-data-table-td:nth-child(4){
            text-align: center;
        }
        .n-data-table .n-data-table-td:nth-child(5){
            text-align: center;
        }
        .n-data-table .n-data-table-td:nth-child(6){
            text-align: center;
        }
        .n-data-table .n-data-table-td:nth-child(7){
            text-align: center;
        }
        .n-data-table .n-data-table-td:nth-child(8){
            text-align: center;
        }
        .n-data-table .n-data-table-td:nth-child(9){
            text-align: center;
        }
    }
</style>