/* 聚光灯 */
import React, { Component } from 'react'

export default class Lamp extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="contain">
                    <h2>Right</h2>
                </div>
                <div className='right'></div>
            </div>
        )
    }
}
