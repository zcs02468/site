import React from "react"
import PostMeta from "../postMeta/index"
import { Button } from 'antd';
import "./style.scss"


interface BlogListProps {
    blogItem: {
        _id: string;
        title: string;
        coverPhoto: string;
        introduce: string;
        views: number;
        createTime: string;
    };
    
}

const BlogList: React.FC<BlogListProps> = ({ 
    blogItem,
}) => {
    console.log('blogItem', blogItem);
    const detailUrl = `/detail/${blogItem._id}`
    return(
        <div className="index-list">
            <div className="item-header">
                <div className="item-title">
                    <a href={detailUrl}>{blogItem.title}</a>
                </div>
                <PostMeta createTime={blogItem.createTime}/>
            </div>
            <img src={blogItem.coverPhoto}></img>
            <div className="item-content">{blogItem.introduce}</div>
            <div className="item-button">
                {/* <a>-&nbsp;阅读全文&nbsp;-</a> */}
                <Button href={detailUrl}>阅读全文</Button>
            </div>
        </div>
    )
}


export default BlogList;