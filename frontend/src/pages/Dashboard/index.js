import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getAllHeroes } from "../../services/heroServices";
import HeroCard from "../../components/HeroCard";

export default function Dashboard() {
    const [heroList, setHeroList] = useState([]);
    useEffect(() => {
        const getHeroes = async () => {
            const { heros } = await getAllHeroes();
            setHeroList(heros);
        };
        getHeroes();
    }, []);
    return (
        <div className='dashboard'>
            <div className='dashboard--header'>
                <div className='add-box'>
                    <button>+</button>
                    <span>
                        <strong>Adicionar Herói</strong>
                    </span>
                </div>
                <input type='text' placeholder='Procurar por um heroi' />
            </div>
            <div className='dashboard--body'>
                {heroList &&
                    heroList.map((hero) => {
                        return <HeroCard hero={hero} />;
                    })}
            </div>
        </div>
    );
}
