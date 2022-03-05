import React, { Component } from "react";
import Data from "./grid_profile_payakumbuh.json";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const center = [-0.22348730600256111, 100.63326721240696];

const limposiTigoNagoro = [
    [-0.19397662512211722, 100.62996298768024],
    [-0.19349764346272383, 100.62850048853343],
    [-0.193926794444015, 100.62764218163238],
    [-0.19362638875824473, 100.6253676683446],
    [-0.19435594541444137, 100.62446644609851],
    [-0.19414136993059583, 100.62270691695136],
    [-0.1944846907034485, 100.6217627793602],
    [-0.19409845483350102, 100.61953118141749],
    [-0.19564339825925967, 100.61738541444888],
    [-0.19530007751003217, 100.6160979540973],
    [-0.19521424732161843, 100.61442425564026],
    [-0.19564339825925967, 100.61360886408426],
    [-0.194956756753782, 100.61202099631733],
    [-0.19658753028340248, 100.60940316026914],
    [-0.19633003973664673, 100.60777237715715],
    [-0.19684502082617616, 100.60725739301651],
    [-0.19654461519254157, 100.60721447767146],
    [-0.19671627555528548, 100.60579827128474],
    [-0.19435594541351267, 100.60554077921441],
    [-0.193626388757316, 100.60652783215062],
    [-0.19324015286778903, 100.60657074749568],
    [-0.19332598306622786, 100.6050257950738],
    [-0.19324015286778903, 100.60386708075738],
    [-0.1934118132642214, 100.6034808426519],
    [-0.19349764347170573, 100.6035666736188],
    [-0.19335800137311823, 100.6025784640725],
    [-0.191622939909405, 100.60092601519423],
    [-0.19170556188787077, 100.59976930097946],
    [-0.19145769595129022, 100.59931487753794],
    [-0.19145769595129022, 100.59774505110362],
    [-0.19207736078599882, 100.59675358177664],
    [-0.19220129375025616, 100.59638178077904],
    [-0.19240784868866645, 100.59592735733753],
    [-0.19282095855799364, 100.595472933896],
    [-0.19339931235819732, 100.59382048501776],
    [-0.19315144644623428, 100.59336606157622],
    [-0.19327537940266745, 100.59278770446883],
    [-0.19368848925091392, 100.59208541369559],
    [-0.19538223952323186, 100.5918788575858],
    [-0.19554748344311634, 100.59167230147604],
    [-0.1960019042144211, 100.59125918925646],
    [-0.19653894692823867, 100.5905568984832],
    [-0.19641501427477243, 100.59051558747132],
    [-0.19691074599896904, 100.5897719854761],
    [-0.19744778868353824, 100.58935887325653],
    [-0.1981913862181492, 100.58894576103697],
    [-0.1981913862181492, 100.58716937849286],
    [-0.1981500752448763, 100.58584741939025],
    [-0.1995959592478895, 100.58531037350483],
    [-0.20038086765351212, 100.58464939395353],
    [-0.19798483135076703, 100.58572348572439],
    [-0.19934809342780632, 100.58543430717069],
    [-0.20050480055621936, 100.58456677150961],
    [-0.20116577602151514, 100.58386448073635],
    [-0.2019093733879511, 100.58357530218265],
    [-0.20335525705857088, 100.58341005729483],
    [-0.20380967761406865, 100.58374054707048],
    [-0.20546211588939492, 100.58307956751916],
    [-0.20612309115174587, 100.58374054707048],
    [-0.20922141232692906, 100.58274907774353],
    [-0.21008894214673618, 100.583244812407],
    [-0.21174137976532884, 100.58638446527567],
    [-0.2123610438269718, 100.58811953659786],
    [-0.21422003586256733, 100.59010247525174],
    [-0.21467445610371177, 100.59035034258349],
    [-0.21488101075430732, 100.59101132213479],
    [-0.2155419856174605, 100.5921267251276],
    [-0.21533543097580868, 100.59295294956674],
    [-0.21583116211106834, 100.59315950567652],
    [-0.21620296053212593, 100.59444015329382],
    [-0.21719442272983605, 100.59555555628666],
    [-0.2174422882691144, 100.59724931638686],
    [-0.21818588486252288, 100.59762111738445],
    [-0.218764237743101, 100.5988191428212],
    [-0.21917734692986843, 100.59914963259685],
    [-0.21954914518822155, 100.60191748446792],
    [-0.21822719578329117, 100.6028676425729],
    [-0.21781408657040502, 100.60295026501683],
    [-0.21719442272983605, 100.60394173434378],
    [-0.21607902775284965, 100.60427222411941],
    [-0.21607902775284965, 100.60489189244878],
    [-0.21504625455298723, 100.60505713733659],
    [-0.21426134687433762, 100.60551156077811],
    [-0.21384823755363067, 100.60592467299767],
    [-0.21302201887887182, 100.60683351988072],
    [-0.2131872626173756, 100.60712269843441],
    [-0.21326988436922054, 100.60708138695153],
    [-0.2122784219169897, 100.60790761139069],
    [-0.2124436656634449, 100.60848596849807],
    [-0.21136958127992228, 100.60922957049328],
    [-0.21335250623735924, 100.61174955503262],
    [-0.21215448910598422, 100.61323675902304],
    [-0.21236104379043358, 100.61356724879867],
    [-0.2120305562939864, 100.61377380490846],
    [-0.21170006879046568, 100.61373249368653],
    [-0.20914541605623604, 100.61619230496272],
    [-0.20735202386452856, 100.61884792258203],
    [-0.20645532769238606, 100.61850303717692],
    [-0.20611044453577168, 100.61895138820357],
    [-0.20552414315240064, 100.61933076214919],
    [-0.20490335330383627, 100.62098621189133],
    [-0.20486886498515205, 100.62208984518767],
    [-0.20455847011372433, 100.62243473059279],
    [-0.20462744675233957, 100.62284859307893],
    [-0.20286854237523658, 100.6234693868081],
    [-0.20269610075933525, 100.62357285242962],
    [-0.2010061728264393, 100.62367631805117],
    [-0.20052333624200155, 100.62391773783473],
    [-0.20024742961592717, 100.624745462807],
    [-0.199557663030443, 100.62467648572596],
    [-0.19924726805753012, 100.62560767631976],
    [-0.19683308473597821, 100.6271596606427],
    [-0.1958329229715703, 100.62736659188576],
    [-0.19514315620270803, 100.62798738561497],
    [-0.1944189010649724, 100.62895306474925],
    [-0.19400504097231006, 100.63002220950509],
];

class Cekambildatapolygon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            arrKoordinat1: [],
            arrKoordinat2: [],
            arrKoordinat3: [],
            arrKoordinat4: [],
            arrKoordinat5: [],
            arrKoordinat6: [],
            arrKoordinat7: [],
            arrKoordinat8: [],
            arrKoordinat9: [],
            arrKoordinat10: [],
            koordinatTiakar: [],
            koordinatSicincin: [],
        };
    }

    async componentDidMount() {
        await Data.map((data) => this.state.data.push(data));

        let dibelakangkoma = 8;

        this.state.data.map((data) => {
            if (data.desa_kelurahan === "KOTO BARU") {
                let koordinat1 = parseFloat(data.st_astext.substring(11, 23));
                let koordinat2 = parseFloat(data.st_astext.substring(24, 35));
                let koordinat3 = parseFloat(data.st_astext.substring(37, 49));
                let koordinat4 = parseFloat(data.st_astext.substring(50, 61));
                let koordinat5 = parseFloat(data.st_astext.substring(63, 75));
                let koordinat6 = parseFloat(data.st_astext.substring(76, 87));
                let koordinat7 = parseFloat(data.st_astext.substring(89, 101));
                let koordinat8 = parseFloat(data.st_astext.substring(102, 113));
                let koordinat9 = parseFloat(data.st_astext.substring(115, 127));
                let koordinat10 = parseFloat(data.st_astext.substring(128, 139));

                // this.state.arrKoordinat1.push(koordinat1);
                // this.state.arrKoordinat2.push(koordinat2);
                // this.state.arrKoordinat3.push(koordinat3);
                // this.state.arrKoordinat4.push(koordinat4);
                // this.state.arrKoordinat5.push(koordinat5);
                // this.state.arrKoordinat6.push(koordinat6);
                // this.state.arrKoordinat7.push(koordinat7);
                // this.state.arrKoordinat8.push(koordinat8);
                // this.state.arrKoordinat9.push(koordinat9);
                // this.state.arrKoordinat10.push(koordinat10);

                this.state.koordinatTiakar.push([koordinat2, koordinat1], [koordinat4, koordinat3], [koordinat6, koordinat5], [koordinat8, koordinat7], [koordinat10, koordinat9]);
            } else if (data.desa_kelurahan === "KUBU GADANG") {
                let koordinat1 = parseFloat(data.st_astext.substring(11, 23));
                let koordinat2 = parseFloat(data.st_astext.substring(24, 35));
                let koordinat3 = parseFloat(data.st_astext.substring(37, 49));
                let koordinat4 = parseFloat(data.st_astext.substring(50, 61));
                let koordinat5 = parseFloat(data.st_astext.substring(63, 75));
                let koordinat6 = parseFloat(data.st_astext.substring(76, 87));
                let koordinat7 = parseFloat(data.st_astext.substring(89, 101));
                let koordinat8 = parseFloat(data.st_astext.substring(102, 113));
                let koordinat9 = parseFloat(data.st_astext.substring(115, 127));
                let koordinat10 = parseFloat(data.st_astext.substring(128, 139));

                // this.state.arrKoordinat1.push(koordinat1);
                // this.state.arrKoordinat2.push(koordinat2);
                // this.state.arrKoordinat3.push(koordinat3);
                // this.state.arrKoordinat4.push(koordinat4);
                // this.state.arrKoordinat5.push(koordinat5);
                // this.state.arrKoordinat6.push(koordinat6);
                // this.state.arrKoordinat7.push(koordinat7);
                // this.state.arrKoordinat8.push(koordinat8);
                // this.state.arrKoordinat9.push(koordinat9);
                // this.state.arrKoordinat10.push(koordinat10);

                this.state.koordinatSicincin.push([koordinat2, koordinat1], [koordinat4, koordinat3], [koordinat6, koordinat5], [koordinat8, koordinat7], [koordinat10, koordinat9]);
            }
        });

        // this.state.koordinatTiakar.push([0.21455412, 0.20554551], [0.20554551, 0.21455412]);

        // console.log(this.state.arrKoordinat1);
        // console.log(this.state.arrKoordinat2);
        console.log(this.state.koordinatTiakar);
    }

    render() {
        return (
            <div className="container">
                <MapContainer
                    center={center}
                    zoom={12}
                    style={{
                        width: "485px",
                        height: "400px",
                    }}
                >
                    <TileLayer
                        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                        attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                    />
                    <Polygon color="cadetblue" fillColor="cadetblue" positions={this.state.koordinatTiakar}>
                        <Popup>Tiakar</Popup>
                    </Polygon>
                    <Polygon color="cadetblue" fillColor="cadetblue" positions={this.state.koordinatSicincin}>
                        <Popup>Sicincin</Popup>
                    </Polygon>
                </MapContainer>
            </div>
        );
    }
}

export default Cekambildatapolygon;
