import {defineStore} from "pinia";
import {login,user} from "../api/auth";
import {info} from "autoprefixer";

export interface IUserState {
    token:string;
    username:string;
    avatar:string;
    permissions:string[];
    info:Object;
}

export const useUserStore =defineStore({
    id:'app-user',
    state:():IUserState => ({
        token:localStorage.getItem('token') || '',
        username:'',
        avatar:'',
        permissions:[],
        info:{},
    }),
    getters:{
        getToken():string{
            return this.token;
        },
        getAvatar():string{
            return this.avatar;
        },
        getUsername():string{
            return this.username;
        },
        getPermissions():string[]{
            return this.permissions;
        },
        getUserInfo():Object{
            //判断this.info是否是空对象
            // if (this.info?.id){
            //     console.log(123123)
            // }else {
            //     console.log(456456)
            // }
            return this.info;
        }
    },
    actions:{
        setToken(token:string){
            localStorage.setItem('token',token);
            //sessionStorage只存储在当前标签页
            this.avatar=token;
        },
        setAvatar(avatar:string){
            this.avatar=avatar;
        },
        setUserName(username:string){
            this.username=username;
        },
        setUserInfo(info:Object){
            this.info=info;
        },
        setPermissions(permissions:string[]){
            this.permissions=permissions;
        },
        async login(userInfo:Object){
            try {
                const response=await login(userInfo);
                if (response.access_token){
                    this.setToken(response.access_token);
                    this.getUser();
                }
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        },
        async getUser(){
            try {
                const response=await user();
                console.log(response);
                this.setUserInfo(response);
                this.setAvatar(response.avatar);
                this.setUserName(response.name);
                if (response.data){
                    this.setUserInfo(response.data);
                    this.setPermissions(response.data.permissions);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
})