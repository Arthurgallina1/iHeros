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
                <h3>
                    <strong>{threat.monsterName}</strong>
                </h3>
                <span>Periculosidade {threat.dangerLevel}</span>
                {iconByRanking[threat.dangerLevel]}

                <div className='threat-footer-box'>
                    <span>
                        <strong>LAT</strong>{" "}
                        {Number(threat.location.coordinates[1]).toFixed(2)}
                    </span>
                    <span>
                        <strong>LNG</strong>{" "}
                        {Number(threat.location.coordinates[0]).toFixed(2)}
                    </span>
                </div>
                <div className='threat-footer-box text-center'>
                    {threat.defeatedBy !== "none" ? (
                        <span>
                            Derrotado por <strong>{threat.defeatedBy}</strong>{" "}
                            em <strong>{defeatedDate}</strong>.
                        </span>
                    ) : (
                        <span>
                            Essa ameaça não foi derrotada por falta de hérois.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
