import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'number',
            value: null,
            error: '',
            success: ''
        }
    }

    onTypeChange = (event) => {
        const { value } = event.target;
        
        if (value === 'number') {
            this.setState({
                type: value,
                value: null,
            });
        } else {
            this.setState({
                type: value,
                value: null,
            });
        }

    }

    onDataChange = (event) => {
        const { value } = event.target;

        this.setState({value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { type, value } = this.state;

        if (type === 'number' && !value.match(/^(\d+)(,(\s+?)(\d+))*$/)) {
            this.setState({
                error: 'Please enter the correct form of input: e.g. 1, 2, 3, 4, 5'
            });

            return;
        } else if (type === 'string' && !value.match(/^(\w+)(,(\s+?)(\w+))*$/)) {
            this.setState({
                error: 'Please enter the correct form of input: e.g. myname, yourname, hisname'
            });

            return;
        }

        this.setState({
            error: '',
            success: 'Data has been sent successfully'
        });
        
        axios({
            method: 'post',
            url: 'localhost:60000/sorting',
            data: {
                type, value 
            },
            config: { 
                headers: 
                    {
                        'Content-Type': 'application/json' 
                    }
                }
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    render() {
        const { type, error, success } = this.state;

        return <div>
            <form onSubmit={this.onSubmit}>
                { error && <div>{error}</div>}
                { success && <div>{success}</div>}
                <label>Please choose an input type</label>

                <select id="input-type" onChange={this.onTypeChange} value={type}>
                    <option value="number">Number</option>
                    <option value="string">String</option>
                </select>
                    <input onChange={this.onDataChange}/>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    }
}
