import React, { Component } from "react";
import "./WelcomeHeader.css";

class Welcomeheader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cuaca: null,
            suhu: null,
            idLogo: null,
            description: null,
            statusLoadWeather: false,
        };
    }

    componentDidMount() {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=payakumbuh&appid=1665d94c7f76b78c63f3956e321d3769&lang=id")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    suhu: data.main.temp - 273.15,
                    cuaca: data.weather[0].main,
                    idLogo: data.weather[0].icon,
                    description: data.weather[0].description,
                    statusLoadWeather: true,
                })
            );
    }
    render() {
        return (
            <div id="welcomeHeader" data-aos="fade-up" data-aos-delay="200">
                {this.state.statusLoadWeather === false ? (
                    <h1>load data</h1>
                ) : (
                    <div className="row">
                        <div className="col-6 welcomeHeader-left">
                            <h2 data-aos="fade-up" data-aos-delay="500">
                                Welcome, <span className="welcomeTitle">Kota Payakumbuh !</span>
                            </h2>
                            <h5 data-aos="fade-up" data-aos-delay="800">
                                <img src={`https://openweathermap.org/img/wn/${this.state.idLogo}@2x.png`} width="50" height="50" />
                                {this.state.suhu.toFixed(2)}°C, {this.state.description}
                            </h5>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Welcomeheader;
