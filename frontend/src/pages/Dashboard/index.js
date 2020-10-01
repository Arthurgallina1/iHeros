import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getAllHeroes } from "../../services/heroServices";
import HeroCard from "../../components/Card";

export default function Dashboard() {
    const [heroList, setHeroList] = useState([]);
    const [filter, setFilter] = useState("");
    const [filteredHeroList, setFilteredHeroList] = useState(heroList);

    useEffect(() => {
        const getHeroes = async () => {
            const { heros } = await getAllHeroes();
            setHeroList(heros);
            setFilteredHeroList(heros);
        };
        getHeroes();
    }, []);

    const filterHeroList = (e) => {
        setFilter(e.target.value);
        if (filter.length >= 2) {
            const filteredList = heroList.filter(
                (hero) => hero.name.toLowerCase().search(e.target.value) != -1
            );
            setFilteredHeroList(filteredList);
        } else {
            setFilteredHeroList(heroList);
        }
    };

    return (
        <div className='dashboard'>
            <div className='dashboard--header'>
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
            </div>
            <div className='dashboard--body'>
                {filteredHeroList &&
                    filteredHeroList.map((hero) => {
                        return <HeroCard data={hero} key={hero._id} />;
                    })}
            </div>
        </div>
    );
}
