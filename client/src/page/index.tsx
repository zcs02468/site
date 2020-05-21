import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

class DetailPage extends Component {

    render() {
        return (
          <div className="index-page">
            <div className="index-warp">
                <div className="index-post">
                    <div className="index-item">
                        <div className="item-bg">
                            <img src="https://i.loli.net/2020/05/21/sYkwxnVF3R2K5dh.jpg" alt=""/>
                        </div>
                        <Link to={`/blog`}>博客</Link>
                    </div>
                    <div className="index-item">
                        <div className="item-bg">
                            <img src="https://i.loli.net/2020/05/21/rM1APCspIdu5teU.jpg" alt=""/>
                        </div>
                        <Link to={`/email`}>给未来写封信</Link>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default DetailPage;
