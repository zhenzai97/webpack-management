import React, { Component } from 'react';
import { ThemeContext } from './ThemeContext.js'
import ThemeButton from "./ThemedButton";

// 1. 如果子组件是类组件,需要指定contextType等于当前的context（也是两种方式）
export default class ToolBar extends Component {
    // static contextType = ThemeContext // 方式1：在class组件中声明静态属性static
    render() {
        let theme = this.context; 
        return (
            <div style={{ border: '1px solid #000', background: theme.background }}>
                <h2 style={{ color: theme.foreground }}>ToolBar</h2>
                <ThemeButton onClick={this.props.changeTheme}>
                    Change Theme
                </ThemeButton>
            </div>
        )
    }
}
ToolBar.contextType = ThemeContext; // 方式2： 在class组件外面指定

// 2. 如果子组件是函数式组件，需要用Consumer组件来包裹，通过value拿到数据
// export default function ToolBar(props) {
//     return (
//         <ThemeContext.Consumer>
//             {theme => (
//                 <div style={{ border: '1px solid #000', background: theme.background }}>
//                     <h2 style={{ color: theme.foreground }}>ToolBar</h2>
//                     <ThemeButton onClick={props.changeTheme}>
//                         Change Theme
//                     </ThemeButton>
//                 </div>
//             )}
//         </ThemeContext.Consumer>
//     )
// }