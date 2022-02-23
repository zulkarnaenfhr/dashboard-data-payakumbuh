import React, { Component } from "react";
import "./CardTopTvProgram.css";

class Cardtoptvprogram extends Component {
    render() {
        return (
            <div id="CardTopTvProgram">
                <div className="CardTopTvProgram-judul-container">
                    <p className="CardTopTvProgram-title">Daftar Top 5 Tv Program {this.props.dataApa}</p>
                </div>
                <div className="listTopTvProgram-container container">
                    {this.props.tvCategoryData.map((data, index) => {
                        if (index < 5) {
                            return (
                                <p className="listTopTvProgram" key={data.category}>
                                    {index + 1}.{data.category} ({data.jumlah})
                                </p>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Cardtoptvprogram;
