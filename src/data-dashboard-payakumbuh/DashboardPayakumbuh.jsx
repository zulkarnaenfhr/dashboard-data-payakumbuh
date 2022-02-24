import React, { Component } from "react";
import Data from "./grid_profile_payakumbuh.json";
import "./DashboardPayakumbuh.css";
import CardKecil from "./Component/CardKecil/CardKecil";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Welcomeheader from "./Component/Welcome Header/WelcomeHeader";
import Cardcontainer from "./Component/CardContainer/CardContainer";
import Tvprogramcontainer from "./Component/TvProgram Container/TvProgramContainer";
import Cardtoptvprogram from "./Component/Card Top Tv Program/CardTopTvProgram";
import Footer from "./Component/Footer/Footer";
import ChoropletMaps from "./Component/Maps Interactive/Choroplet Maps";

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

        this.handleKelurahanChange = this.handleKelurahanChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
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

    handleReset = async () => {
        await this.setState({
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
        });

        await Data.map((data) => this.state.data.push(data));

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
    };

    componentDidMount() {
        this.handleReset();
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
                    <h1>""</h1>
                ) : (
                    <div>
                        <div className="sideNavbar">
                            <div className="sideNavbar-header">
                                <h4 className="dashboardTitle">Dashboard Data Kota Payakumbuh</h4>
                            </div>
                            <div className="sideNavbar-navigation" data-aos="fade-up" data-aos-delay="50">
                                <div>
                                    <div className="form-container">
                                        <form action="">
                                            <label className="formLabel" htmlFor="">
                                                Pilih Kecamatan :
                                            </label>
                                            <div className="select">
                                                <select className="selectOption" onChange={this.handleKecamatanChange} name="" id="">
                                                    <option value="">pilih kecamatan</option>
                                                    {this.state.dataKecamatan.map((kec) => (
                                                        <option value={kec} key={kec}>
                                                            {kec}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <label className="formLabel formLabel2" htmlFor="">
                                                Pilih Kelurahan :
                                            </label>
                                            <div className="select ">
                                                <select className="selectOption" onChange={this.handleKelurahanChange} name="" id="">
                                                    <option value="">pilih kelurahan</option>
                                                    {optionKelurahan}
                                                </select>
                                            </div>
                                        </form>
                                        <button className="resetButton" onClick={this.handleReset}>
                                            Kota Payakumbuh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mainContent">
                            <div className="container">
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
                            </div>

                            <div className="container">
                                <div className="row tvProgram-container">
                                    <div className="col-7">
                                        <Tvprogramcontainer dataApa={apa} labelTableTvProgram={this.state.tvCategory} tvCategoryJumlah={this.state.tvCategoryJumlah} />
                                    </div>
                                    <div className="col-5">
                                        <Cardtoptvprogram dataApa={apa} tvCategoryData={this.state.tvCategoryData} />
                                        <ChoropletMaps />
                                    </div>
                                    {/* <div className="maps-container">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63836.58103671247!2d100.59773331023011!3d-0.22949540713366975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd54c3c6f83a013%3A0x4039d80b2210dd0!2sPayakumbuh%2C%20Kota%20Payakumbuh%2C%20Sumatera%20Barat!5e0!3m2!1sid!2sid!4v1645664985372!5m2!1sid!2sid"
                                            className="maps"
                                            loading="lazy"
                                            allowFullScreen=""
                                        ></iframe>
                                    </div> */}
                                </div>
                            </div>

                            {/* <button
                                onClick={() => {
                                    console.log(this.state.tvCategoryData);
                                }}
                            >
                                cek print state
                            </button> */}
                            <div className="footer-container">
                                <Footer />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
