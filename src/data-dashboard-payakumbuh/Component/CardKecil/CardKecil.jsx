import React, { Component } from "react";
import "./CardKecil.css";

export default class CardKecil extends Component {
    render() {
        return (
            <div className="cardKecil">
                <p className="cardKecilJudul">{this.props.judul}</p>
                <div className="row">
                    <h3 className="cardKecilJumlahData">{this.props.jumlah}</h3>
                </div>
            </div>
        );
    }
}
