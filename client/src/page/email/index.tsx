import React, { Component } from "react";
import { HeartOutlined, HeartFilled, HighlightOutlined } from "@ant-design/icons";
import Letter from "../../components/letter/index"
import "./style.scss";

interface DetailPageState {
    isLike: boolean;
    visible: boolean
}

class DetailPage extends React.Component<{},DetailPageState> {
    state = {
        isLike: false,
        visible: false
    };
    clickLike = () => {
        this.setState({
            isLike: !this.state.isLike,
        });
    };

    openLetter = (e:any) => {
        
        this.setState({
            visible: true
        })
    }

    render() {
        let like;
        if (this.state.isLike) {
            like = <HeartFilled style={{ color: "red" }} className="no-like zoomIn" onClick={this.clickLike} />;
        } else {
            like = <HeartOutlined className="no-like zoomIn" onClick={this.clickLike} />;
        }
        const { visible } = this.state;
        return (
            <div className="email-page">
                <div className="email-warp">
                    <div className="email-title">公开信箱</div>
                    <div className="letter-box">
                        <div className="letter-item">
                            <div className="letter-item-header">寄往2020</div>
                            <div className="letter-item-content">{content}</div>
                            <div className="letter-item-footer">{like}</div>
                        </div>
                    </div>
                    <div className="write-letter" onClick={this.openLetter}>
                        <HighlightOutlined />
                        我也要撰写
                    </div>
                    <Letter 
                        visible={visible}
                        cancel={() => {
                            this.setState({
                                visible: false,
                            });
                        }}
                    />
                </div>
            </div>
        );
    }
}

var content: string = `
面朝大海，春暖花开全文

        海子
        
从明天起，做一个幸福的人
喂马、劈柴，周游世界
从明天起，关心粮食和蔬菜
我有一所房子，面朝大海，春暖花开
从明天起，和每一个亲人通信
告诉他们我的幸福
那幸福的闪电告诉我的
我将告诉每一个人
给每一条河每一座山取一个温暖的名字
陌生人，我也为你祝福
愿你有一个灿烂的前程
愿你有情人终成眷属
愿你在尘世获得幸福`;

export default DetailPage;
