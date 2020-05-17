import React, { Component } from "react";
import {getQuote} from "../../axios/index"
import "./style.scss";

class Header extends Component {
    state ={
        sentence: ''
    }
    async componentWillMount() {
        const [res] = await getQuote();
        this.setState({
            sentence: res.data
        })
    }
    render() {
        return (
            <header id="header">
                <nav className="site-nav">
                    <ul className="menu">
                        <li className="menu-item">
                            <i className=""></i>
                            首页
                        </li>
                    </ul>
                </nav>
                <div className="header-warp">
                    <div className="header-background">
                    </div>
                    <div className="site-meta">
                        {/* <div className="site-title">LUYMM</div> */}
                        <div className="site-description">
                            <span>{this.state.sentence}</span>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;