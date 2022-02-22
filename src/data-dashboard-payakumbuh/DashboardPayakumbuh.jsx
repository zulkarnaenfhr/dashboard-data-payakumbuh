import React, { Component } from "react";
import Data from "./grid_profile_payakumbuh.json";

export default class DashboardPayakumbuh extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        // Data.map((data) => console.log(data));
        Data.map((data) => this.state.data.push(data));
    }

    render() {
        return (
            <div className="container">
                <h1>masuk</h1>
                <button
                    onClick={() => {
                        console.log(this.state.data);
                    }}
                >
                    {/* {Data.map((value) => console.log(value))} */}
                    cek print
                </button>
            </div>
        );
    }
}
