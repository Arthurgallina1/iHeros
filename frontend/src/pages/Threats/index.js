import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getAllThreats } from "../../services/threatServices";
import HeroCard from "../../components/Card";

export default function Dashboard() {
    const [threatList, setThreatList] = useState([]);

    useEffect(() => {
        const getThreats = async () => {
            const { threats } = await getAllThreats();
            setThreatList(threats);
        };
        getThreats();
    }, []);

    return (
        <div className='threat'>
            {/* <div className='dashboard--header'>
                <div className='add-box'>
                    <button>+</button>
                    <span>
                        <strong>Adicionar Herói</strong>
                    </span>
                </div>
                <input
                    type='text'
                    placeholder='Procurar por um heroi'
                    value={filter}
                    onChange={(e) => filterHeroList(e)}
                />
            </div> */}
            <div className='threat--body'>
                {threatList.map((threat) => (
                    <h1>{threat.monsterName}</h1>
                ))}
            </div>
        </div>
    );
}
