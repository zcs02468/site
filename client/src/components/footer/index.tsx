import React, { Component } from "react";
import getVisitorsData from "../../utils/getVisitorsData"
import Cookie from "js-cookie"
import {addVisitorsData} from "../../axios/index"

import  Style from  "./style.module.scss";
class Footer extends Component{

    async componentDidMount() {
        console.log( "footer",this.props );
        
        console.log(Cookie.get('site_visitor'));
        if( !Cookie.get("site_visitor") ) {
            const obj = getVisitorsData()
            const [res] = await addVisitorsData(obj)
            console.log('res', res);
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