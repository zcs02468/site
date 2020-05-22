import { get, post } from "./tools";

// export async function getQuote(){
//     const [err, res] = await get({ url: '/api/user/getQuote' })
//     if( err ) {
//         return null
//     }
//     return res
// }q
//获取每日一句
export const getQuote = async () => await get({ url: "/api/quote/getQuote" });

//获取博客列表
export const getBlogList = async (page: number, pageSize: number) => await get({ url: "/api/blog/getBlogList", params: { page: page, pageSize: pageSize } });

//获取博客详情
export const getBlogContent = async (id: string) => await get({url:'/api/blog/getPointBlog',params: {id: id }})


interface createEmail {
    toEmail: string;
    fromTime: string;
    open: boolean;
    rawContent: any;
    htmlContent: any;
}

export const createFutureEmail = async (obj:createEmail)=> await post({url:'/api/email/createFutureEmail',params: { ...obj }})