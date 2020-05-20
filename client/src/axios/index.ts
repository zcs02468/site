import { get, post } from "./tools";

// export async function getQuote(){
//     const [err, res] = await get({ url: '/api/user/getQuote' })
//     if( err ) {
//         return null
//     }
//     return res
// }q
export const getQuote = async () => await get({ url: "/api/quote/getQuote" });


export const getBlogList = async (page: number, pageSize: number) => await get({ url: "/api/blog/getBlogList", params: { page: page, pageSize: pageSize } });

export const getBlogContent = async (id: string) => await get({url:'/api/blog/getPointBlog',params: {id: id }})