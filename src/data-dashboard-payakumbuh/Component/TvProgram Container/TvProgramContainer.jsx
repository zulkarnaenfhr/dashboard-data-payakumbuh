import React, { Component } from "react";
// import "./Tvprogramcontainer.css"
import "./TvProgramContainer.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

class Tvprogramcontainer extends Component {
    render() {
        return (
            <div id="tvProgramContainer" data-aos="fade-up" data-aos-delay="200">
                <div className="row">
                    <div>
                        <div className="tvProgramContainer-title-container">
                            <p className="barChart-title">Bar Chart Program TV {this.props.dataApa}</p>
                        </div>

                        <div className="barChart-container">
                            <Bar
                                height={200}
                                data={{
                                    labels: this.props.labelTableTvProgram,
                                    datasets: [
                                        {
                                            label: "Jumlah",
                                            backgroundColor: "#afbdf0",
                                            borderColor: "rgba(0,0,0,1)",
                                            borderWidth: 2,
                                            data: this.props.tvCategoryJumlah,
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
                </div>
            </div>
        );
    }
}

export default Tvprogramcontainer;
