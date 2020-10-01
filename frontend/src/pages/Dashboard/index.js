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
                <input type='text' placeholder='Procurar por um heroi' />
                <button>+</button>
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
