import React, { Component } from "react";

export default class DashboardPayakumbuh extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        await fetch("grid_profile_payakumbuh.json")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    data: data,
                })
            );
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
                    cek print
                </button>
            </div>
        );
    }
}
