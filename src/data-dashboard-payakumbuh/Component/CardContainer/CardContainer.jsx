import React, { Component } from "react";
import Cardsedang from "../CardBesar/CardSedang";
import CardKecil from "../CardKecil/CardKecil";
import "./CardContainer.css";

class Cardcontainer extends Component {
    render() {
        return (
            <div id="CardContainer" data-aos="fade-up" data-aos-delay="500">
                <div className="CardContainer-judul-container">
                    <div className="container">
                        <h2 data-aos="fade-up" data-aos-delay="1000" className="mainContent-judul">
                            Menampilkan Data Untuk {this.props.dataApa}{" "}
                        </h2>
                    </div>
                </div>
                <div className="row mainContent-row1" data-aos="fade-up" data-aos-delay="1200">
                    <CardKecil judul={"Jumlah Penduduk"} jumlah={this.props.jumlahPenduduk} />
                    <CardKecil judul={"Jumlah Kartu Keluarga"} jumlah={this.props.jumlahKartuKeluarga} />
                    <CardKecil judul={"Jumlah Penduduk Ber-KTP"} jumlah={this.props.jumlahPendudukBerKTP} />
                    <CardKecil judul={"Avarage RPU"} jumlah={this.props.avarageRPU} />
                </div>
                <div className="row mainContent-row2" data-aos="fade-up" data-aos-delay="1400">
                    <Cardsedang judul={"Jumlah Customer Indihome"} jumlah={this.props.jumlahCustIndihome} />
                    <Cardsedang judul={"Jumlah Customer HVC"} jumlah={this.props.jumlahCustHVC} />
                </div>
            </div>
        );
    }
}

export default Cardcontainer;
