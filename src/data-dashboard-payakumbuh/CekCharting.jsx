import React, { Component } from "react";
import Data from "./grid_profile_payakumbuh.json";

export default class CekCharting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }
    async componentDidMount() {
        await Data.map((data) => this.state.data.push(data));
        console.log(this.state.data);
    }

    render() {
        return (
            <div>
                <h1>masuk cek charting</h1>
            </div>
        );
    }
}
