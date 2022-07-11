import {createRouter,createWebHistory} from "vue-router";
import Home from '@/views/Home.vue'
import Login from '@/views/login/index.vue'
import {login} from "../api/auth";
// import dashboard from './modules/dashboard'
const modules=import.meta.globEager('./modules/**/*.ts');
// console.log(modules,'modules');
const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod)? [...mod] : [mod];
    routeModuleList.push(...modList);
})
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login ,
        meta:{
            title:'登录'
        }
    },
]
// const baseRoutes=[...routes,...dashboard];
const baseRoutes=[...routes,...routeModuleList];
// console.log(baseRoutes)
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history:createWebHistory(),
    routes:baseRoutes, // short for `routes: routes`
})
router.beforeEach((to,from,next)=>{
    // console.log(to,from);
    document.title=(to?.meta?.title as string) || document.title;
    if (to.name != 'login'){
        //判断是否登录
        if (!localStorage.getItem('token')){
            // localStorage.setItem('turnUrl',to.fullPath)//将变量存储在本地
            next({
                path:'/login',
                query:{
                    redirect:to.fullPath
                }
            })

        }
    }

    next();
})

export {routeModuleList}
export default router;