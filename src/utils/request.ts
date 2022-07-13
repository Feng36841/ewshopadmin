//1.引入axios依赖包
import axios from 'axios';

//2.axios创建对象
const request=axios.create({
    baseURL:'https://api.shop.eduwork.cn',//管理后台要使用的接口基地址
    timeout:8000,//超时时间
})
//JWT ---json web token
/*request.post('/api/auth/login',{
    data:{//params
        email:'super@a.com',
        password:'123123'
    }
})*/

//3.定义前置拦截器，请求拦截器，请求发送出去之前触发的
request.interceptors.request.use((config)=>{
    //config 接口请求的配置信息
    //1.获取token
    const token=localStorage.getItem('token');
    //2.判断token是否存在
    if (token){
        //如果存在，添加到请求头参数中
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
},(error)=>{
    //报错的时候抛出一个报错信息
    return Promise.reject(error)
});

request.interceptors.response.use((response)=>{
    //响应回来的数据操作
    return response.data;
},(error)=>{
    const {response} = error
    // console.log(response,'response')
    //报错的是定义前置拦截器时候抛出一个报错信息
    // switch (response.status) {
    //     case 401:
    //         window.$message.error('登录失败，请重新登录')
    //         localStorage.removeItem('token')
    //         setTimeout(()=>{
    //             window.location.href='/login'
    //         },1000)
    //         break;
    //     case 404:
    //         window.$message.error('接口不存在')
    //         break;
    //     case 500:
    //         break;
    //     case 502:
    //         window.$message.error('网络异常')
    //         break;
    //     case 422:
    //         window.$message.error('参数错误')
    //         break;
    // }

    //报错的时候抛出一个报错信息
    return Promise.reject(error);
})

//5.抛出对象的信息
export default request;

/*
get /api/admin/users 获取用户列表
get /api/admin/users/:id 获取用户详情
post /api/admin/users 添加用户
put /api/admin/users/:id 修改用户
delete /api/admin/users/:id 删除用户
*/
