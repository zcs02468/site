import React, { Component } from "react";
import { Card, List, Pagination } from "antd";
import { getBlogList } from "../axios/index";
import "./style.scss";
import { Link } from "react-router-dom";

import BlogList from "../components/blogList/index"

interface BlogBase {
    _id: string;
    title: string;
    time: string;
    traffic: number;
}

class BlogPage extends Component {
    state = {
        list: [],
        total: 0,
    };
    componentWillMount() {
        this.getPointBlogList(1, 10);
    }
    getPointBlogList = async(page: number, pageSize: number) => {
        const [res] = await getBlogList(page, pageSize )
        this.setState({
            list: res.data.list,
            total: res.data.count,
        });
    };

    render() {
        return (
            <div className="blog-page">
                <div className="blog-warp">
                    <div className="blog-content">
                        <BlogList />
                    </div>
                </div>
            </div>
        )
    }




    // render() {
    //     return (
    //         <div className="blog-page">
    //             <div className="blog-wrap">
    //                 <div className="blog-content">
    //                     <List
    //                         rowKey="id"
    //                         split={false}
    //                         className="list-box animated fadeInUp"
    //                         dataSource={this.state.list}
    //                         renderItem={(item: BlogBase) => (
    //                             <List.Item>
    //                                 <Link to={`/detail/${item._id}`} className="list-link">
    //                                     <Card className="card-box">
    //                                         <div className="imgBox">
    //                                             <img alt={item.title} src="https://cdn.zrahh.com:4433/usr/uploads/2019/06/1326502380.jpg" />
    //                                         </div>
    //                                         <div className="card-content">
    //                                             <h2>{item.title}</h2>
    //                                         </div>
    //                                         <div></div>
    //                                     </Card>
    //                                 </Link>
    //                             </List.Item>
    //                         )}
    //                     />
    //                 </div>
    //                 <Pagination className="page-navigator" defaultCurrent={1} total={this.state.total} showSizeChanger={false} hideOnSinglePage />
    //             </div>
    //         </div>
    //     );
    // }
}

export default BlogPage;
