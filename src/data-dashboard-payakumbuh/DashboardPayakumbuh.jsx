import React, { Component } from "react";
import Data from "./grid_profile_payakumbuh.json";
import "./DashboardPayakumbuh.css";
import CardKecil from "./Component/CardKecil/CardKecil";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Cardsedang from "./Component/CardBesar/CardSedang";
import Welcomeheader from "./Component/Welcome Header/WelcomeHeader";
import Cardcontainer from "./Component/CardContainer/CardContainer";

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

            // untuk perhitungan card kecil
            jumlahPenduduk: null,
            jumlahKartuKeluarga: null,
            jumlahKTP: null,
            jumlahCustIndihome: null,
            jumlahCustHVC: null,
            avgRPU: null,

            tvCategory: [],
            tvCategoryJumlah: [],
            tvCategoryData: [],
        };
        this.handleKecamatanChange = this.handleKecamatanChange.bind(this);
    }

    handleKelurahanChange = async (event) => {
        await this.setState({
            pilKeyword: event.target.value,
            dataWithKeyword: [],
            statusLoadKel: false,
        });
        await this.state.data.map((data) => {
            if (data.desa_kelurahan === event.target.value) {
                this.state.dataWithKeyword.push(data);
            }
        });

        // awal perhitungan data card kecil
        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;
        let jumlahAvgValue = 0;
        let jumlahJumlahAvgValue = 0;

        await this.state.dataWithKeyword.map((data) => {
            jumlahPenduduk += data.jumlah_penduduk_kelurahan;
            jumlahKartuKeluarga += data.jumlah_kk_kelurahan;
            jumlahKTP += data.jumlah_ktp_kelurahan;
            jumlahCustIndihome += data.jml_cust_indihome;
            jumlahCustHVC += data.jml_plg_hvc;

            if (data.avg_arpu !== "") {
                jumlahAvgValue += parseInt(data.avg_arpu);
                jumlahJumlahAvgValue += 1;
            }
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
            tvCategoryJumlah: [],
            tvCategoryData: [],
            avgRPU: jumlahAvgValue / jumlahJumlahAvgValue,
        });
        // akhir perhitungan data card kecil

        // awal perhitungan tv program
        await this.state.tvCategory.map((category) => {
            let jumlah = 0;
            this.state.dataWithKeyword.map((data) => {
                if (data.top_tv_genre_program1 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program2 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program3 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program4 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program5 === category) {
                    jumlah += 1;
                }
            });

            // buat Sorting top 5
            this.state.tvCategoryData.push({
                category: category,
                jumlah: jumlah,
            });

            this.state.tvCategoryJumlah.push(jumlah);
        });

        function compare(a, b) {
            if (a.jumlah > b.jumlah) {
                return -1;
            }
            if (a.jumlah < b.jumlah) {
                return 1;
            }
            return 0;
        }

        this.state.tvCategoryData.sort(compare);
        // akhir perhitungan tv program

        // console.log(this.state.dataWithKeyword);
        this.setState({
            statusLoadKel: true,
        });
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

        // awal perhitungan data card kecil
        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;
        let jumlahAvgValue = 0;
        let jumlahJumlahAvgValue = 0;

        await this.state.dataWithKeyword.map((data) => {
            jumlahPenduduk += data.jumlah_penduduk_kelurahan;
            jumlahKartuKeluarga += data.jumlah_kk_kelurahan;
            jumlahKTP += data.jumlah_ktp_kelurahan;
            jumlahCustIndihome += data.jml_cust_indihome;
            jumlahCustHVC += data.jml_plg_hvc;
            if (data.avg_arpu !== "") {
                jumlahAvgValue += parseInt(data.avg_arpu);
                jumlahJumlahAvgValue += 1;
            }
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
            tvCategoryJumlah: [],
            tvCategoryData: [],
            avgRPU: jumlahAvgValue / jumlahJumlahAvgValue,
        });
        // akhir perhitungan data card kecil

        // awal perhitungan tv program
        await this.state.tvCategory.map((category) => {
            let jumlah = 0;
            this.state.dataWithKeyword.map((data) => {
                if (data.top_tv_genre_program1 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program2 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program3 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program4 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program5 === category) {
                    jumlah += 1;
                }
            });
            // buat Sorting top 5
            this.state.tvCategoryData.push({
                category: category,
                jumlah: jumlah,
            });
            this.state.tvCategoryJumlah.push(jumlah);
        });

        function compare(a, b) {
            if (a.jumlah > b.jumlah) {
                return -1;
            }
            if (a.jumlah < b.jumlah) {
                return 1;
            }
            return 0;
        }

        this.state.tvCategoryData.sort(compare);
        // akhir perhitungan tv program

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

        // awal perhitungan data card kecil
        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;
        let jumlahAvgValue = 0;
        let jumlahJumlahAvgValue = 0;

        await this.state.data.map((data) => {
            jumlahPenduduk += data.jumlah_penduduk_kelurahan;
            jumlahKartuKeluarga += data.jumlah_kk_kelurahan;
            jumlahKTP += data.jumlah_ktp_kelurahan;
            jumlahCustIndihome += data.jml_cust_indihome;
            jumlahCustHVC += data.jml_plg_hvc;

            if (data.avg_arpu !== "") {
                jumlahAvgValue += parseInt(data.avg_arpu);
                jumlahJumlahAvgValue += 1;
            }
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
            avgRPU: jumlahAvgValue / jumlahJumlahAvgValue,
        });
        // akhir perhitungan data card kecil

        // awal perhitungan tv program
        await this.state.data.map((data) => {
            if (!this.state.tvCategory.includes(data.top_tv_genre_program1) && data.top_tv_genre_program1 !== "") {
                this.state.tvCategory.push(data.top_tv_genre_program1);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program2) && data.top_tv_genre_program2 !== "") {
                this.state.tvCategory.push(data.top_tv_genre_program2);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program3) && data.top_tv_genre_program3 !== "") {
                this.state.tvCategory.push(data.top_tv_genre_program3);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program4) && data.top_tv_genre_program4 !== "") {
                this.state.tvCategory.push(data.top_tv_genre_program4);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program5) && data.top_tv_genre_program5 !== "") {
                this.state.tvCategory.push(data.top_tv_genre_program5);
            }
        });

        await this.state.tvCategory.map((category) => {
            let jumlah = 0;
            this.state.data.map((data) => {
                if (data.top_tv_genre_program1 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program2 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program3 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program4 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program5 === category) {
                    jumlah += 1;
                }
            });
            // buat Sorting top 5
            this.state.tvCategoryData.push({
                category: category,
                jumlah: jumlah,
            });
            this.state.tvCategoryJumlah.push(jumlah);
        });

        function compare(a, b) {
            if (a.jumlah > b.jumlah) {
                return -1;
            }
            if (a.jumlah < b.jumlah) {
                return 1;
            }
            return 0;
        }

        this.state.tvCategoryData.sort(compare);

        // akhir perhitungan tv program

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

        const apa = this.state.pilKeyword === "" ? "Kota Payakumbuh" : this.state.pilKeyword;

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
                                    <h5 className="sideNavbar-navigation-title1">Pilih Wilayah</h5>
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
                            <div className="welcomeHeader-container">
                                <Welcomeheader />
                            </div>
                            <div className="card-container">
                                <Cardcontainer
                                    dataApa={apa}
                                    jumlahPenduduk={this.state.jumlahPenduduk.toLocaleString()}
                                    jumlahKartuKeluarga={this.state.jumlahKartuKeluarga.toLocaleString()}
                                    jumlahPendudukBerKTP={this.state.jumlahKTP.toLocaleString()}
                                    avarageRPU={`Rp. ${this.state.avgRPU.toLocaleString("id-ID")}`}
                                    jumlahCustIndihome={this.state.jumlahCustIndihome.toLocaleString()}
                                    jumlahCustHVC={this.state.jumlahCustHVC.toLocaleString()}
                                />
                            </div>
                            {/* <h1 className="mainContent-judul">Menampilkan Data Untuk {apa}</h1>
                            <div className="row mainContent-row1">
                                <CardKecil judul={"Jumlah Penduduk"} jumlah={this.state.jumlahPenduduk.toLocaleString()} />

                                <CardKecil judul={"Jumlah Kartu Keluarga"} jumlah={this.state.jumlahKartuKeluarga.toLocaleString()} />

                                <CardKecil judul={"Jumlah Penduduk Ber-KTP"} jumlah={this.state.jumlahKTP.toLocaleString()} />

                                <CardKecil judul={"Avarage RPU"} jumlah={`Rp. ${this.state.avgRPU.toLocaleString("id-ID")}`} />
                            </div>

                            <div className="row mainContent-row2">
                                <Cardsedang judul={"Jumlah Customer Indihome"} jumlah={this.state.jumlahCustIndihome.toLocaleString()} />
                                <Cardsedang judul={"Jumlah Customer HVC"} jumlah={this.state.jumlahCustHVC.toLocaleString()} />
                            </div>

                            <div className="row mainContent-row3">
                                <div className="col-6">
                                    <p className="barChart-title">Bar Chart Program Tv</p>
                                    <div className="barChart-container">
                                        <Bar
                                            height={200}
                                            data={{
                                                labels: this.state.tvCategory,
                                                datasets: [
                                                    {
                                                        label: "Jumlah",
                                                        backgroundColor: "rgba(75,192,192,1)",
                                                        borderColor: "rgba(0,0,0,1)",
                                                        borderWidth: 2,
                                                        data: this.state.tvCategoryJumlah,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: "Average Rainfall per month",
                                                    fontSize: 20,
                                                },
                                                legend: {
                                                    display: true,
                                                    position: "right",
                                                },
                                                maintainAspectRatio: true,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="cardTopTvProgram">
                                        <p>daftar top 5 tv program</p>
                                        {this.state.tvCategoryData.map((data, index) => {
                                            if (index < 5) {
                                                return (
                                                    <p key={data.category}>
                                                        {index + 1}.{data.category} ({data.jumlah})
                                                    </p>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </div> */}
                            {/* <button
                                onClick={() => {
                                    console.log(this.state.tvCategoryData);
                                }}
                            >
                                cek print state
                            </button> */}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
