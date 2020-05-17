import { get, post } from "./tools";

// export async function getQuote(){
//     const [err, res] = await get({ url: '/api/user/getQuote' })
//     if( err ) {
//         return null
//     }
//     return res
// }
export const getQuote = async () => await get({ url: "/api/user/getQuote" });

export const getBlogList = async (page: number, pageSize: number) => await get({ url: "/api/blog/getBlogList", params: { page: page, pageSize: pageSize } });
