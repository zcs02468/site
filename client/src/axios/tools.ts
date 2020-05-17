import Axios from "axios";
import { message } from "antd";


interface IFRequestParam {
    url: string;
    msg?: string;
    params?: object;
    config?: object;
}

/**
 * 公用get请求
 * @param url       接口地址
 * @param params    接口参数
 * @param msg       接口异常提示
 */
export const get = ({url, params, msg= '接口异常'}: IFRequestParam) => 
    Axios
        .get(url, {
            params: params
        })
        .then( res => [res.data])
        .catch( err => {
            console.log(err);
            message.warn(msg);
            return [null];
        })

/**
 * 公用post请求
 * @param url       接口地址
 * @param params      接口参数
 * @param msg       接口异常提示
 * @param config    接口所需配置
 */
export const post = ({ url, params, msg = "接口异常", config }: IFRequestParam) => 
    Axios.post(url, params, config)
        .then(res => [res.data])
        .catch(err => {
            console.log(err);
            message.warn(msg);
            return [null];
        })


