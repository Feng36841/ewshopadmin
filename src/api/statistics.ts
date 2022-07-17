import request from "@/utils/request";

export function getAllUsers(params: any) {
    return request(
        {
            url: '/api/admin/users',
            method: 'GET',
            params,
        }
    );
}
export function getAllGoods(params: any) {
    return request(
        {
            url: '/api/admin/goods',
            method: 'GET',
            params,
        }
    );
}

export function getAllOrder(params: any) {
    return request(
        {
            url: '/api/admin/orders',
            method: 'GET',
            params,
        }
    );
}