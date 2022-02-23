import React, { Component } from "react";
import "./CardSedang.css";

class Cardsedang extends Component {
    render() {
        return (
            <div className="cardSedang">
                <p className="cardSedangJudul">{this.props.judul}</p>
                <div className="row">
                    <h3 className="cardSedangJumlahData">{this.props.jumlah}</h3>
                </div>
            </div>
        );
    }
}

export default Cardsedang;
