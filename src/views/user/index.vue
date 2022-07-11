<template>
    <div>
        <div class="pl-5 mt-1 h-18 w-full bg-white py-2">
            <sapn class="text-slate-400 pr-1">首页</sapn> / <span class="pl-1">用户管理</span>
            <div class="font-bold text-xl mt-1">用户管理</div>
        </div>
        <div class="content pt-1 ">
            <div class="bg-white pr-8">
                <n-form
                        class="mt-5"
                        label-placement="left"
                        ref="formRef"
                        inline
                        :label-width="80"
                        :model="formSearch"
                >
                    <n-form-item label="姓名" path="user.name">
                        <n-input v-model:value="formSearch.name" placeholder="输入姓名" />
                    </n-form-item>
                    <n-form-item label="年龄" path="user.age">
                        <n-input v-model:value="formSearch.email" placeholder="输入邮箱" />
                    </n-form-item>
                    <n-form-item class="ml-auto">
                        <n-button attr-type="button" >
                            搜索
                        </n-button>
                    </n-form-item>
                </n-form>
            </div>
            <div class="mt-1 bg-white">
                <div class="text-lg pl-5 py-4">
                    用户列表
                </div>
                <div>
                    <n-data-table
                            :columns="columns"
                            :data="data"
                            :pagination="pagination"
                            :bordered="false"
                    />
                    <div class="p-4 flex justify-end pr-10">
                        <n-pagination v-model:page="page" :page-count="100" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    //分页
    const page= ref(1)
    //表单
    const formSearch= ref({
        name:'',
        email:''
    })

    //数据表格
    import { h,ref } from 'vue'
    import { NButton, useMessage } from 'naive-ui'
    import type { DataTableColumns } from 'naive-ui'

    type Song = {
        no: number
        title: string
        length: string
    }

    const createColumns = ({
                               play
                           }: {
        play: (row: Song) => void
    }): DataTableColumns<Song> => {
        return [
            {
                title: 'No',
                key: 'no'
            },
            {
                title: 'Title',
                key: 'title'
            },
            {
                title: 'Length',
                key: 'length'
            },
            {
                title: 'Action',
                key: 'actions',
                render (row) {
                    return h(
                        NButton,
                        {
                            strong: true,
                            tertiary: true,
                            size: 'small',
                            onClick: () => play(row)
                        },
                        { default: () => 'Play' }
                    )
                }
            }
        ]
    }

    const data: Song[] = [
        { no: 3, title: 'Wonderwall', length: '4:18' },
        { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
        { no: 12, title: 'Champagne Supernova', length: '7:27' }
    ]


    const message = useMessage()
    const columns= createColumns({
        play (row: Song) {
            message.info(`Play ${row.title}`)
        }
    })
    const pagination=ref(false as const)

</script>

<style scoped>

</style>