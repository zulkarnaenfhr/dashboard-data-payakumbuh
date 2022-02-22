import React, { Component } from "react";
import Data from "./grid_profile_payakumbuh.json";
import "./DashboardPayakumbuh.css";
import CardKecil from "./Component/CardKecil/CardKecil";

export default class DashboardPayakumbuh extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],

            statusLoad: false,
            statusLoadKel: false,

            dataKecamatan: [],
            dataKelurahan: [],
            pilKecamatan: "",

            dataPerKecamatan: [],
            dataKelurahanPerKecamatan: [],

            pilKeyword: "",
            dataWithKeyword: [],

            jumlahPenduduk: null,
            jumlahKartuKeluarga: null,
            jumlahKTP: null,
            jumlahCustIndihome: null,
            jumlahCustHVC: null,
        };
        this.handleKecamatanChange = this.handleKecamatanChange.bind(this);
    }

    handleKelurahanChange = async (event) => {
        await this.setState({
            pilKeyword: event.target.value,
            dataWithKeyword: [],
        });
        await this.state.data.map((data) => {
            if (data.desa_kelurahan === event.target.value) {
                this.state.dataWithKeyword.push(data);
            }
        });

        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;

        await this.state.dataWithKeyword.map((data) => {
            jumlahPenduduk += data.jumlah_penduduk_kelurahan;
            jumlahKartuKeluarga += data.jumlah_kk_kelurahan;
            jumlahKTP += data.jumlah_ktp_kelurahan;
            jumlahCustIndihome += data.jml_cust_indihome;
            jumlahCustHVC += data.jml_plg_hvc;
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
        });
        // console.log(this.state.dataWithKeyword);
    };

    handleKecamatanChange = async (event) => {
        await this.setState({
            pilKeyword: event.target.value,
            pilKecamatan: event.target.value,
            dataPerKecamatan: [],
            dataKelurahanPerKecamatan: [],
            statusLoadKel: false,
            dataWithKeyword: [],
        });

        await this.state.data.map((data) => {
            if (data.kecamatan === this.state.pilKecamatan) {
                this.state.dataPerKecamatan.push(data);
            }
        });

        await this.state.dataPerKecamatan.map((data) => {
            const kelurahan = data.desa_kelurahan;

            const statusKel = this.state.dataKelurahanPerKecamatan.includes(kelurahan);
            if (statusKel === false) {
                this.state.dataKelurahanPerKecamatan.push(kelurahan);
            }
        });

        await this.state.data.map((data) => {
            if (data.kecamatan === event.target.value) {
                this.state.dataWithKeyword.push(data);
            }
        });

        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;

        await this.state.dataWithKeyword.map((data) => {
            jumlahPenduduk += data.jumlah_penduduk_kelurahan;
            jumlahKartuKeluarga += data.jumlah_kk_kelurahan;
            jumlahKTP += data.jumlah_ktp_kelurahan;
            jumlahCustIndihome += data.jml_cust_indihome;
            jumlahCustHVC += data.jml_plg_hvc;
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
        });

        this.setState({
            statusLoadKel: true,
        });
    };

    async componentDidMount() {
        Data.map((data) => this.state.data.push(data));

        await this.state.data.map((data) => {
            const kecamatan = data.kecamatan;
            const statusKec = this.state.dataKecamatan.includes(kecamatan);
            if (statusKec === false) {
                this.state.dataKecamatan.push(kecamatan);
            }

            const kelurahan = data.desa_kelurahan;
            const statusKel = this.state.dataKelurahan.includes(kelurahan);
            if (statusKel === false) {
                this.state.dataKelurahan.push(kelurahan);
            }
        });

        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;

        await this.state.data.map((data) => {
            jumlahPenduduk += data.jumlah_penduduk_kelurahan;
            jumlahKartuKeluarga += data.jumlah_kk_kelurahan;
            jumlahKTP += data.jumlah_ktp_kelurahan;
            jumlahCustIndihome += data.jml_cust_indihome;
            jumlahCustHVC += data.jml_plg_hvc;
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
        });

        this.setState({
            statusLoad: true,
        });
    }

    render() {
        const statusPilKecamatan = this.state.pilKecamatan;

        const optionKelurahan =
            statusPilKecamatan === ""
                ? this.state.dataKelurahan.map((kel) => (
                      <option value={kel} key={kel}>
                          {kel}
                      </option>
                  ))
                : this.state.dataKelurahanPerKecamatan.map((kel) => (
                      <option value={kel} key={kel}>
                          {kel}
                      </option>
                  ));

        // const apa = this.state.pilKeyword === "" ? "payakumbuh" : this.state.pilKecamatan.includes(this.state.pilKeyword) ? "kecamatan" : "kelurahan";

        const apa = this.state.pilKeyword === "" ? "Kota Payakumbuh" : this.state.pilKeyword;

        // let totalCustIndihome = 0;
        // this.state.dataWithKeyword.map((data) => {
        //     totalCustIndihome += data.jml_cust_indihome;
        // });

        return (
            <div>
                {this.state.statusLoad === false ? (
                    <h1>load data</h1>
                ) : (
                    <div>
                        <div className="sideNavbar">
                            <div className="sideNavbar-header">
                                <h4 className="dashboardTitle">Dashboard Data Kota Payakumbuh</h4>
                            </div>
                            <div className="sideNavbar-navigation">
                                <div>
                                    <h5>Pilih Wilayah</h5>
                                    <form action="">
                                        <label className="formLabel" htmlFor="">
                                            Pilih Kecamatan :
                                        </label>
                                        <select className="selectOption" onChange={this.handleKecamatanChange} name="" id="">
                                            <option value="">pilih kecamatan</option>
                                            {this.state.dataKecamatan.map((kec) => (
                                                <option value={kec} key={kec}>
                                                    {kec}
                                                </option>
                                            ))}
                                        </select>
                                        <br />
                                        <br />
                                        <label className="formLabel" htmlFor="">
                                            Pilih Kelurahan :
                                        </label>
                                        <select className="selectOption" onChange={this.handleKelurahanChange} name="" id="">
                                            <option value="">pilih kelurahan</option>
                                            {optionKelurahan}
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="mainContent">
                            <h1>menampilkan data untuk {apa}</h1>
                            <div className="row">
                                <CardKecil judul={"Jumlah Penduduk"} jumlah={this.state.jumlahPenduduk.toLocaleString()} />

                                <CardKecil judul={"Jumlah Kartu Keluarga"} jumlah={this.state.jumlahKartuKeluarga.toLocaleString()} />
                                <CardKecil judul={"Jumlah Penduduk Ber-KTP"} jumlah={this.state.jumlahKTP.toLocaleString()} />
                            </div>
                            <div className="row mainContent-row2">
                                <CardKecil judul={"Jumlah Customer Indihome"} jumlah={this.state.jumlahCustIndihome.toLocaleString()} />
                                <CardKecil judul={"Jumlah Customer HVC"} jumlah={this.state.jumlahCustHVC.toLocaleString()} />
                            </div>
                        </div>
                        {/* <h1>masuk</h1>
                        <button
                            onClick={() => {
                                console.log(this.state.dataWithKeyword);
                            }}
                        >
                            cek print
                        </button>
                        <h1>cust indihome: {this.state.jumlahCustIndihome}</h1>
                        <h1>jumlah kk: {this.state.jumlahKartuKeluarga}</h1>
                        <form action="">
                            <select onChange={this.handleKecamatanChange} name="" id="">
                                <option value="">pilih kecamatan</option>
                                {this.state.dataKecamatan.map((kec) => (
                                    <option value={kec} key={kec}>
                                        {kec}
                                    </option>
                                ))}
                            </select>
                            <select onChange={this.handleKelurahanChange} name="" id="">
                                <option value="">pilih kelurahan</option>
                                {optionKelurahan}
                            </select>
                        </form>
                        <h1>{apa}</h1> */}
                    </div>
                )}
            </div>
        );
    }
}
