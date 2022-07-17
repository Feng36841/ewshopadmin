
import request from "@/utils/request";


/**
 * @description: 轮播图
 * @param params
 */
export function goods(params: any) {
    return request(
        {
            url: '/api/admin/goods',
            method: 'GET',
            params,
        }
    );
}
