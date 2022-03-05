import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./Top5ARPU.css";

class Top5arpu extends Component {
    render() {
        return (
            <div id="top5ARPU" data-aos="fade-up" data-aos-delay="200">
                <div className="top5ARPU-title-container">
                    <p className="top5ARPU-title">Chart Top 10 ARPU {this.props.dataApa} </p>
                </div>

                <div className="barChart-container">
                    <Bar
                        height={200}
                        width={600}
                        data={{
                            labels: this.props.labelWilayah,
                            datasets: [
                                {
                                    label: "Avarage RPU",
                                    backgroundColor: "#afbdf0",
                                    borderColor: "rgba(0,0,0,1)",
                                    borderWidth: 2,
                                    data: this.props.valueARPU,
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
        );
    }
}

export default Top5arpu;
