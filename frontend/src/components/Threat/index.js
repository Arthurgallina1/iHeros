import React from "react";
import {
    GiOni,
    GiTigerHead,
    GiSpikedDragonHead,
    GiWolfHead,
} from "react-icons/gi";
import "./styles.scss";

const iconByRanking = {
    God: <GiOni size={40} color={"white"} />,
    Dragon: <GiSpikedDragonHead size={40} color={"white"} />,
    Tiger: <GiTigerHead size={40} color={"white"} />,
    Wolf: <GiWolfHead size={40} color={"white"} />,
};

export default function Threat({ threat }) {
    console.log(threat);
    return (
        <div className='threat--card'>
            <div className='threat-footer'>
                {iconByRanking[threat.dangerLevel]}
                <h4>{threat.monsterName}</h4>
                <span>Periculosidade {threat.dangerLevel}</span>
                <div className='threat-footer-box'>
                    <span>LAT: {threat.location.coordinates[1]}</span>
                    <span>LNG: {threat.location.coordinates[0]}</span>
                </div>
                <div className='threat-footer-box text-center'>
                    <span>Derrotado por João de Barro em 20/01/2020</span>
                </div>
            </div>
        </div>
    );
}
