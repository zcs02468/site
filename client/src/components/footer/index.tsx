import React, { Component } from "react";
import getVisitorsData from "../../utils/getVisitorsData"
import Cookie from "js-cookie"
import {addVisitorsData} from "../../axios/index"

import  Style from  "./style.module.scss";
class Footer extends Component{

    async componentDidMount() {
        if( !Cookie.get("site_visitor") ) {
            const obj = getVisitorsData()
            await addVisitorsData(obj)
        }
    }

    render() {
        return (
            <footer id={ Style.footer }>
                暂无内容
            </footer>
        );
    }
}

export default Footer;