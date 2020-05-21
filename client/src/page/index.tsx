import React, { Component } from "react";
import "./style.scss";

class DetailPage extends Component {

    render() {
        return (
          <div className="index-page">
            <div className="index-warp">
                <div className="index-post">
                    <div className="index-item">
                        <div className="item-bg"></div>
                        <a href="/blog">博客</a>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default DetailPage;
