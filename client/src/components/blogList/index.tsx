import React from "react"
import PostMeta from "../postMeta/index"
import "./style.scss"


// interface BlogListProps {
//     title: string;
    
// }


function BlogList() {
    
    
    
    
    
    
    return(
        <div className="index-list">
            <div className="item-header">
                <div className="item-title">
                    <a href="">1111111111111111111111111111</a>
                </div>
                <PostMeta createTime={1589978600512}/>
            </div>
            <img src="https://www.luymm.com/usr/uploads/2020/04/2382868296.gif" alt="thank-you-emergency-services-workers-6753651837108755-law.gif"></img>
            <div className="item-content">
            前言由于国内的 app store有很多应用是没有的，所以现在大家一般都有一个美服的 apple id，具体的注册方法大家可以自行搜索，不是特别困难。不过有些软件是收费的，比如 shadowro...
            </div>
            <div className="item-button">
                <button>-&nbsp;阅读全文&nbsp;-</button>
            </div>
        </div>
    )
}


export default BlogList;