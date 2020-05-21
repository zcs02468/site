import * as React from "react"
import Snow from './snow'
import './style.scss'
import ribbon from "./ribbon"

// componentWillMount----组件将要挂载到页面的时刻执行
// render----开始挂载渲染
// componentDidMount----组件挂载完成的时刻执行

//当组件从页面中删除的时候执行    componentWillUnmount


export default class Effect extends React.PureComponent {
    componentDidMount() {
        Snow();
        ribbon()
    }

    public render() {
        return(
            <div className="effect-box">
                <canvas id="Snow" width="1920" height="937"></canvas>
                {/* <canvas id="Ribbon" width="1920" height="937"></canvas> */}
            </div>
        )
    }
}