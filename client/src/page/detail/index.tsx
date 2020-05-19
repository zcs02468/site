import React from "react";
import { ClockCircleOutlined, EyeOutlined, CommentOutlined } from "@ant-design/icons";
import Prism from "prismjs";
import moment from 'moment';
// import 'moment/locale/en-ca';
import { getBlogContent } from "../../axios/index";
import "./style.scss";

interface Props {
    match: {
        isExact: boolean;
        params: any;
        path: string;
        url: string;
    }
}

class DetailPage extends React.PureComponent<Props, {}> {
    state = {
        outputContent: "",
        title: '',
        createTime: ""
    };

    async componentDidMount() {
        let [res] = await getBlogContent(this.props.match.params.id)
        
        this.setState({
            outputContent: res.data.htmlContent,
            title: res.data.title,
            createTime: moment(Number(res.data.createTime)).format(`YYYY-MM-DD`)
        });
        Prism.hooks.add('before-highlight', function(env: any) {
            env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g,'\n');
            env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/,'');
        });
    }

    render() {
        return (
            <div className="detail-page">
                <div className="content-wrap">
                    <div className="post">
                        <header className="post-header">
                            <h1>{ this.state.title }</h1>
                            <div className="post-meta">
                                <span className="time">
                                    <ClockCircleOutlined /> 发表于 <time>{this.state.createTime}</time>
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
                        <div className="post-content">
                            <div className="before-highlight" dangerouslySetInnerHTML={{ __html: this.state.outputContent }}></div>
                        </div>
                        <header className="post-footer"></header>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailPage;
