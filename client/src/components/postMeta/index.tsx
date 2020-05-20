import React from "react";
import moment from 'moment';
import { ClockCircleOutlined, EyeOutlined, CommentOutlined } from "@ant-design/icons";
import "./style.scss"

interface PostMetaProps {
    createTime: string | number;
}

function PostMeta(props: PostMetaProps) {
    const { createTime } = props;
    
    return (
        <div className="post-meta">
            <span className="time">
                <ClockCircleOutlined /> 发表于 <time>{moment(Number(createTime)).format(`YYYY-MM-DD`)}</time>
            </span>
            <span className="look">
                <EyeOutlined /> 浏览量 411
            </span>
            <span className="interactionCount">
                <a className="discussionUrl" href="https://www.luymm.com/archives/402/#comments">
                    <CommentOutlined /> 没有评论
                </a>
            </span>
        </div>
    );
}

export default PostMeta;
