import request from "../utils/request";
export function users(params:any) {
    return request(
        {
            url:'/api/admin/users',
            params
        }
    );
}
export function addUsers(params:any) {
    return request(
        {
            url:'/api/admin/users',
            method:'post',
            params
        }
    );
}
export function getUserInfo(userid) {
    return request(
        {
        url:`/api/admin/users/${userid}`,
        method:'GET'
    }
    )
}
export function updateUser(userid,data) {
    return request(
        {
            url: `/api/admin/users/${userid}`,
            method: 'put',
            data
        }
    )
}