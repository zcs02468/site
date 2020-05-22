import React, { Component } from "react";
import BraftEditor from "braft-editor";
import { Modal, Button } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import Iconfont from "../Iconfont/index";
import SendDialog from "./sendDialog/index";

import "braft-editor/dist/index.css";
import Style from "./style.module.scss";

// componentWillMount----组件将要挂载到页面的时刻执行
// render----开始挂载渲染
// componentDidMount----组件挂载完成的时刻执行

//当组件从页面中删除的时候执行    componentWillUnmount

interface LetterProps {
    visible: boolean;
}

interface LetterState {
    editorState: any;
    visible: boolean;
    isShowDialog: boolean;
}

class Letter extends React.Component<LetterProps, LetterState> {
    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null),
        visible: false,
        isShowDialog: false,
    };

    componentWillReceiveProps(props: LetterProps) {
        this.setState({ visible: props.visible });
    }

    componentWillMount() {
        document.getElementsByTagName("body")[0].style.cssText = "position: relative; overflow: hidden";
    }
    componentWillUnmount() {
        document.getElementsByTagName("body")[0].style.cssText = "";
    }
    async componentDidMount() {
        let rawContent: string = "";
        const storageRawContent = localStorage.getItem("letterRawState");
        if (storageRawContent) {
            rawContent = storageRawContent;
        }
        this.setState({
            editorState: BraftEditor.createEditorState(rawContent),
            visible: this.props.visible,
        });
    }

    abortLetter = () => {
        this.saveLetterState();
        this.setState({
            visible: false,
            isShowDialog: false,
        });
    };

    saveLetterState() {
        const rawContent = this.state.editorState.toRAW();
        const htmlContent = this.state.editorState.toHTML();
        localStorage.setItem("letterRawState", rawContent);
        localStorage.setItem("letterHtmlState", htmlContent);
    }

    handleEditorChange = (editorState: any) => {
        this.setState({ editorState });
        this.saveLetterState();
    };

    sendLetter = () => {
        this.setState({
            isShowDialog: true,
        });
    };

    render() {
        const { editorState, visible, isShowDialog } = this.state;
        return (
            visible && (
                <div className={Style.box}>
                    <div className={Style.warp}>
                        <div className={Style.body}>
                            <div className={Style.title}>寄给未来的信</div>
                            <div className={Style.content}>
                                <BraftEditor value={editorState} controls={[]} id="editor-with-code-highlighter" onChange={this.handleEditorChange} />
                            </div>
                        </div>
                        <div className={Style.btn}>
                            <Button type="primary" shape="round" icon={<DeleteOutlined />} className={Style.delete} onClick={this.abortLetter}>
                                取消
                            </Button>
                            <Button type="primary" shape="round" icon={<Iconfont type="iconzhifeiji" />} className={Style.send} onClick={this.sendLetter}>
                                发送
                            </Button>
                        </div>
                    </div>
                    <SendDialog
                        visible={isShowDialog}
                        onCancel={() => {
                            this.setState({
                                isShowDialog: false,
                            });
                        }}
                        cancelAll={() => {
                            this.setState({
                                visible: false,
                            });
                        }}
                    />
                </div>
            )
        );
    }
}

export default Letter;
