import React, { Component } from "react";
import { getBlogList } from "../../axios/index";
import PageBack from "../../components/pageBack";
import "./style.scss";

import BlogList from "../../components/blogList/index";

class BlogPage extends Component {
    state = {
        list: [],
        total: 0,
    };
    componentWillMount() {
        this.getPointBlogList(1, 10);
    }
    getPointBlogList = async (page: number, pageSize: number) => {
        
        const [res] = await getBlogList(page, pageSize);
        this.setState({
            list: res.data.list,
            total: res.data.count,
        });
    };

    render() {
        const { list } = this.state
        return (
            <div className="blog-page">
                <PageBack />
                <div className="blog-warp">
                    <div className="blog-content">
                        {
                            list.map((item:any)=> {
                                return(
                                    <BlogList blogItem={item} key={item._id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogPage;
