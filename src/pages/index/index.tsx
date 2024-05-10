import React, { Component } from 'react'
import { Button, DatePicker } from 'antd'
import './styles.scss'
import axios from 'axios'
import moment from 'moment'
import utilsTest from '@utils/index'

class App extends Component {
    componentDidMount(): void {
        const id = utilsTest.getUrlParam('id')
        console.log('id', id)
        axios.get('/index/gray').then((res) => {

        }).catch((error) => {
            console.log(error)
        })
    }

    handleDateChange = (date:moment.Moment|null) => {
        console.log(date, moment(date).unix())
    }

    render() {
        return (
            <div className="index-page">
                <div className="middle-box">
                    <span>helloo</span>
                    <Button type="primary">按钮</Button>
                    <DatePicker onChange={this.handleDateChange} />
                </div>
                hello this is a test
            </div>
        )
    }
}
export default App
