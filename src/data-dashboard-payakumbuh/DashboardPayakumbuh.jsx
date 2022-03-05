import React, { Component } from "react";
import Data from "./grid_profile_payakumbuh.json";
import "./DashboardPayakumbuh.css";
import Welcomeheader from "./Component/Welcome Header/WelcomeHeader";
import Cardcontainer from "./Component/CardContainer/CardContainer";
import Tvprogramcontainer from "./Component/TvProgram Container/TvProgramContainer";
import Cardtoptvprogram from "./Component/Card Top Tv Program/CardTopTvProgram";
import Footer from "./Component/Footer/Footer";
import ChoropletMaps from "./Component/Maps Interactive/Choroplet Maps";
import Top5arpu from "./Component/Top ARPU/Top5ARPU";

export default class DashboardPayakumbuh extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [], // array seluruh data

            statusLoad: false, // buat status load apakah udah ada
            statusLoadKel: false, // status load kelurahan apakah udah apa belum

            dataKecamatan: [], // data per kecamatan
            dataKelurahan: [], // data per kelurahan
            pilKecamatan: "", // ini buat ngambil data kelurahan per kecamatan

            dataPerKecamatan: [], // data per kecamatan
            dataKelurahanPerKecamatan: [], // data kelurahan per kecamatan

            pilKeyword: "", // pilihan parameter keyword
            dataWithKeyword: [], // data yang sesuai dengan parameter

            // untuk perhitungan card kecil
            jumlahPenduduk: null,
            jumlahKartuKeluarga: null,
            jumlahKTP: null,
            jumlahCustIndihome: null,
            jumlahCustHVC: null,
            avgRPU: null,

            tvCategory: [], // category yang tersedia
            tvCategoryJumlah: [], // jumlah per masing masing kategori
            tvCategoryData: [], // data lengkap tv program

            ARPUSetiapDataKelurahan: [],
            topARPU: [],
            topARPUKeyword: [],
            top5ARPU: [],
            top5ARPUWilayah: [],
            top5ARPUValue: [],
        };

        this.handleKelurahanChange = this.handleKelurahanChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleKecamatanChange = this.handleKecamatanChange.bind(this);
        this.pengelompokanDataKecamatan = this.pengelompokanDataKecamatan.bind(this);
        this.pengelompokanDataKelurahan = this.pengelompokanDataKelurahan.bind(this);
        this.pengambilanKelurahanPerKecamatan = this.pengambilanKelurahanPerKecamatan.bind(this);
        this.dataKecamatantoDataKeyword = this.dataKecamatantoDataKeyword.bind(this);
        this.perhitunganDataCardKecil = this.perhitunganDataCardKecil.bind(this);
        this.perhitunganTvProgram = this.perhitunganTvProgram.bind(this);
        this.pengelompokanARPU = this.pengelompokanARPU.bind(this);
        this.pengelompokanARPUKecamatanChange = this.pengelompokanARPUKecamatanChange.bind(this);
        this.pengelompokanARPUKelurahanChange = this.pengelompokanARPUKelurahanChange.bind(this);
    }

    handleKelurahanChange = async (event) => {
        await this.setState({
            pilKeyword: event.target.value,
            dataWithKeyword: [],
            statusLoadKel: false,
        });

        await this.pengelompokanDataKelurahan(event.target.value);

        // awal perhitungan data card kecil
        await this.perhitunganDataCardKecil();
        // akhir perhitungan data card kecil

        // awal perhitungan tv program
        await this.perhitunganTvProgram();
        // akhir perhitungan tv program

        await this.pengelompokanARPUKelurahanChange(event.target.value);

        // console.log(this.state.dataWithKeyword);
        this.setState({
            statusLoadKel: true,
        });
    };

    pengelompokanDataKelurahan = (keyword) => {
        this.state.data.map((data) => {
            if (data.desa_kelurahan === keyword) {
                this.state.dataWithKeyword.push(data);
            }
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

        await this.pengelompokanDataKecamatan(this.state.pilKecamatan);

        await this.pengambilanKelurahanPerKecamatan();

        await this.dataKecamatantoDataKeyword();

        // awal perhitungan data card kecil
        await this.perhitunganDataCardKecil();
        // akhir perhitungan data card kecil

        // awal perhitungan tv program
        await this.perhitunganTvProgram();
        // akhir perhitungan tv program

        await this.pengelompokanARPUKecamatanChange(event.target.value);

        this.setState({
            statusLoadKel: true,
        });
    };

    pengelompokanDataKecamatan = (keyKecamatan) => {
        this.state.data.map((data) => {
            if (data.kecamatan === keyKecamatan) {
                this.state.dataPerKecamatan.push(data);
            }
        });
    };

    pengambilanKelurahanPerKecamatan = () => {
        this.state.dataPerKecamatan.map((data) => {
            const kelurahan = data.desa_kelurahan;

            if (!this.state.dataKelurahanPerKecamatan.includes(kelurahan)) {
                this.state.dataKelurahanPerKecamatan.push(kelurahan);
            }
        });
    };

    dataKecamatantoDataKeyword = () => {
        this.state.dataPerKecamatan.map((data) => this.state.dataWithKeyword.push(data));
    };

    perhitunganDataCardKecil = async () => {
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
    };

    perhitunganTvProgram = async () => {
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

            top5ARPU: [],
            topARPUKeyword: [],
            top5ARPUValue: [],
            top5ARPUWilayah: [],
        });

        await Data.map((data) => this.state.data.push(data));

        await this.state.data.map((data) => {
            const kecamatan = data.kecamatan;
            if (!this.state.dataKecamatan.includes(kecamatan)) {
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

        await this.state.tvCategoryData.sort(compare);

        await this.pengelompokanARPU();
        // akhir perhitungan tv program

        this.setState({
            statusLoad: true,
        });

        console.log(this.state.top5ARPUValue);
        console.log(this.state.top5ARPUWilayah);
        console.log(this.state.top5ARPU);
    };

    componentDidMount() {
        this.handleReset();
    }

    pengelompokanARPU = async () => {
        // bertujuan untuk charting kelompok arpu
        // console.log(this.state.dataKelurahan);
        await this.setState({
            ARPUSetiapDataKelurahan: [],
            topARPU: [],
            topARPUKeyword: [],
            top5ARPU: [],
            top5ARPUWilayah: [],
            top5ARPUValue: [],
        });
        await this.state.dataKelurahan.map(async (kelurahan) => {
            await this.setState({
                ARPUSetiapDataKelurahan: [],
            });
            let jumlahAvgValue = 0;
            let jumlahJumlahAvgValue = 0;
            let namaKecamatan = "";
            this.state.data.map((data) => {
                if (data.desa_kelurahan === kelurahan) {
                    if (data.avg_arpu !== "") {
                        jumlahAvgValue += parseInt(data.avg_arpu);
                        jumlahJumlahAvgValue += 1;
                    }
                    namaKecamatan = data.kecamatan;
                }
            });

            this.state.topARPU.push({
                namaKelurahan: kelurahan,
                valueARPU: jumlahAvgValue / jumlahJumlahAvgValue,
                namaKecamatan: namaKecamatan,
            });

            this.state.ARPUSetiapDataKelurahan.push(jumlahAvgValue / jumlahJumlahAvgValue);
        });

        function compare(a, b) {
            if (a.valueARPU > b.valueARPU) {
                return -1;
            }
            if (a.valueARPU < b.valueARPU) {
                return 1;
            }
            return 0;
        }

        await this.state.topARPU.sort(compare);

        for (let i = 0; i < 10; i++) {
            this.state.top5ARPU.push({
                namaKelurahan: this.state.topARPU[i].namaKelurahan,
                valueARPU: this.state.topARPU[i].valueARPU,
            });
        }

        this.state.top5ARPU.map((data) => {
            this.state.top5ARPUWilayah.push(data.namaKelurahan);
            this.state.top5ARPUValue.push(data.valueARPU);
        });
    };

    pengelompokanARPUKecamatanChange = async (keyword) => {
        await this.setState({
            top5ARPU: [],
            topARPUKeyword: [],
            top5ARPUValue: [],
            top5ARPUWilayah: [],
        });

        await console.log(keyword);

        await this.state.topARPU.map((data) => {
            if (data.namaKecamatan === keyword) {
                this.state.topARPUKeyword.push({
                    namaKelurahan: data.namaKelurahan,
                    valueARPU: data.valueARPU,
                });
            }
        });

        await this.state.topARPUKeyword.map((data, index) => {
            if (index < 10) {
                this.state.top5ARPU.push({
                    namaKelurahan: data.namaKelurahan,
                    valueARPU: data.valueARPU,
                });
            }
        });

        await this.state.top5ARPU.map((data) => {
            this.state.top5ARPUWilayah.push(data.namaKelurahan);
            this.state.top5ARPUValue.push(data.valueARPU);
        });
    };

    pengelompokanARPUKelurahanChange = async (keyword) => {
        await this.setState({
            top5ARPU: [],
            topARPUKeyword: [],
            top5ARPUValue: [],
            top5ARPUWilayah: [],
        });

        await console.log(keyword);

        await this.state.topARPU.map((data) => {
            if (data.namaKelurahan === keyword) {
                this.state.topARPUKeyword.push({
                    namaKelurahan: data.namaKelurahan,
                    valueARPU: data.valueARPU,
                });
            }
        });

        await this.state.topARPUKeyword.map((data, index) => {
            if (index < 10) {
                this.state.top5ARPU.push({
                    namaKelurahan: data.namaKelurahan,
                    valueARPU: data.valueARPU,
                });
            }
        });

        await this.state.top5ARPU.map((data) => {
            this.state.top5ARPUWilayah.push(data.namaKelurahan);
            this.state.top5ARPUValue.push(data.valueARPU);
        });
    };

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
                                                    <option className="defaultOption" value="">
                                                        pilih kecamatan
                                                    </option>
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
                                                    <option className="defaultOption" value="">
                                                        pilih kelurahan
                                                    </option>
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
                                <div className="row row3-container">
                                    <div className="col-7">
                                        {/* <Tvprogramcontainer dataApa={apa} labelTableTvProgram={this.state.tvCategory} tvCategoryJumlah={this.state.tvCategoryJumlah} /> */}

                                        <ChoropletMaps />
                                    </div>
                                    <div className="col-5">
                                        <Cardtoptvprogram dataApa={apa} tvCategoryData={this.state.tvCategoryData} />
                                        {/* <ChoropletMaps /> */}
                                    </div>
                                </div>

                                <div className="topARPU-container">
                                    <Top5arpu dataApa={apa} labelWilayah={this.state.top5ARPUWilayah} valueARPU={this.state.top5ARPUValue} />
                                </div>
                            </div>

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
