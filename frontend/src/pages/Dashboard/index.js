import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import "./styles.scss";
import { getAllHeroes } from "../../services/heroServices";
import api from "../../services/api";
import HeroCard from "../../components/Card";
import Modal from "../../components/Modal";
import HeroModal from "../../components/HeroModal";
import { HeroContext } from "../../context/HerosContext";

// const socket = openSocket("https://zrp-challenge-socket.herokuapp.com");

export default function Dashboard() {
    const [heroList, setHeroList] = useState([]);
    const [filter, setFilter] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [modalData, setModalData] = useState("");
    const [filteredHeroList, setFilteredHeroList] = useState(heroList);

    useEffect(() => {
        const getHeroes = async () => {
            const { heros } = await getAllHeroes();
            setHeroList(heros);
            setFilteredHeroList(heros);
        };
        getHeroes();
    }, []);

    // useEffect(() => {
    //     socket.on("occurrence", async (threat) => {
    //         setIsAlertOpen(true);
    //         // setTimeout(async () => {
    //         try {
    //             const response = await api.post("/allocation", threat);
    //             const { closestHero } = response.data;
    //             setModalData({ threat, closestHero });
    //         } catch (error) {}
    //         // }, 2500);

    //         console.log(threat);
    //     });
    // }, []);

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
        <HeroContext.Provider value={{ filteredHeroList, setFilteredHeroList }}>
            <div className='dashboard'>
                <Modal
                    isAlertOpen={isAlertOpen}
                    setIsAlertOpen={setIsAlertOpen}
                    modalData={modalData}
                />
                <div className='dashboard--header'>
                    <HeroModal />
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
                            return <HeroCard hero={hero} key={hero._id} />;
                        })}
                </div>
            </div>
        </HeroContext.Provider>
    );
}
