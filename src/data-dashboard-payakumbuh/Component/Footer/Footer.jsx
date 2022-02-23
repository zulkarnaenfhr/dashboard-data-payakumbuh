import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kosong: "‎",
        };
    }
    render() {
        return (
            <div id="FooterComp">
                <p className="footerContent">
                    Design and Develop {this.state.kosong}
                    <span>SpaceCapt-Tech</span>
                    {this.state.kosong}@2022
                </p>
            </div>
        );
    }
}

export default Footer;
