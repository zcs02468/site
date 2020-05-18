import React, { Component } from "react";
import { ClockCircleOutlined, EyeOutlined, CommentOutlined } from "@ant-design/icons";
import "./style.scss";

class DetailPage extends Component {
    render() {
        return (
            <div className="detail-page">
                <div className="content-wrap">
                    <div className="post">
                        <header className="post-header">
                            <h1>如何防止PHP进行SQL注入？</h1>
                            <div className="post-meta">
                                <span className="time">
                                    <ClockCircleOutlined /> 发表于 <time>2020-05-12</time>
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
                        </header>
                        <div className="post-content"></div>
                        <header className="post-footer"></header>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailPage;
