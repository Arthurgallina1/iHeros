import React from "react";
import {
    GiHandOfGod,
    GiTigerHead,
    GiSpikedDragonHead,
    GiWolfHead,
} from "react-icons/gi";
import { format, parseISO } from "date-fns";
import "./styles.scss";

const iconByRanking = {
    God: <GiHandOfGod size={40} color={"white"} />,
    Dragon: <GiSpikedDragonHead size={40} color={"white"} />,
    Tiger: <GiTigerHead size={40} color={"white"} />,
    Wolf: <GiWolfHead size={40} color={"white"} />,
};

export default function Threat({ threat }) {
    const defeatedDate = format(parseISO(threat.createdAt), "dd/MM/yyyy");
    return (
        <div className='threat--card'>
            <div className='threat-footer'>
                {iconByRanking[threat.dangerLevel]}
                <h4>{threat.monsterName}</h4>
                <span>Periculosidade {threat.dangerLevel}</span>
                <div className='threat-footer-box'>
                    <span>
                        LAT {Number(threat.location.coordinates[1]).toFixed(2)}
                    </span>
                    <span>
                        LNG {Number(threat.location.coordinates[0]).toFixed(2)}
                    </span>
                </div>
                <div className='threat-footer-box text-center'>
                    <span>
                        Derrotado por {threat.defeatedBy} em {defeatedDate}.
                    </span>
                </div>
            </div>
        </div>
    );
}
