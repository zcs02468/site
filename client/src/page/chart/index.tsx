import React, { Component } from "react";
import { Chart } from "@antv/g2";
import "./style.scss";
// componentWillMount----组件将要挂载到页面的时刻执行
// render----开始挂载渲染
// componentDidMount----组件挂载完成的时刻执行

//当组件从页面中删除的时候执行    componentWillUnmount
class DetailPage extends Component {
    state = {
        data: [
            { genre: "Sports", sold: 275 },
            { genre: "Strategy", sold: 115 },
            { genre: "Action", sold: 120 },
            { genre: "Shooter", sold: 350 },
            { genre: "Other", sold: 150 },
        ],
    };
    componentDidMount() {
        // Step 1: 创建 Chart 对象
        const chart = new Chart({
            container: "c1", // 指定图表容器 ID
            width: 600, // 指定图表宽度
            height: 300, // 指定图表高度
        });

        // Step 2: 载入数据源
        chart.data(this.state.data);

        // Step 3：创建图形语法，绘制柱状图
        chart.interval().position("genre*sold");

        // Step 4: 渲染图表
        chart.render();
    }
    render() {
        return (
            <div className="chart-page">
                <div id="c1"></div>
            </div>
        );
    }
}

export default DetailPage;
