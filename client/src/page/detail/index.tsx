import React from "react";
import Prism from "prismjs";
import { getBlogContent } from "../../axios/index";
import PostMeta from "../../components/postMeta/index";
import PageBack from "../../components/pageBack";
import "./style.scss";

interface Props {
    match: {
        isExact: boolean;
        params: any;
        path: string;
        url: string;
    };
}

class DetailPage extends React.PureComponent<Props, {}> {
    state = {
        outputContent: "",
        title: "",
        createTime: "",
        coverPhoto: "",
    };

    async componentDidMount() {
        let [res] = await getBlogContent(this.props.match.params.id);
        this.setState({
            outputContent: res.data.htmlContent,
            title: res.data.title,
            createTime: res.data.createTime,
            coverPhoto: res.data.coverPhoto,
        });
        Prism.hooks.add("before-highlight", function (env: any) {
            env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g, "\n");
            env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/, "");
        });
    }

    render() {
        return (
            <div className="detail-page animated fadeInUp">
                <PageBack />
                <div className="content-wrap">
                    <div className="post">
                        <header className="post-header">
                            <h1>{this.state.title}</h1>
                            <PostMeta createTime={this.state.createTime} />
                        </header>
                        <div className="post-content">
                            <div className="content-head">
                                <div className="img-box">{this.state.coverPhoto && <img src={this.state.coverPhoto} />}</div>
                            </div>
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
