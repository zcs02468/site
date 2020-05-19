import * as React from "react"
import Snow from './snow'
import './style.scss'
import ribbon from "./ribbon"

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