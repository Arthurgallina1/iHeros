import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { GiFishMonster } from "react-icons/gi";
import { format, parseISO } from "date-fns";
import { HeroContext } from "../../context/HerosContext";
import "./styles.scss";

Modal.setAppElement("#root");

export default function AlertModal({ isAlertOpen, setIsAlertOpen, modalData }) {
    // useEffect(() => {}, modalData);
    const { filteredHeroList, setFilteredHeroList } = useContext(HeroContext);

    const modalData2 = {
        threat: {
            location: [
                {
                    lat: 45.76751931659519,
                    lng: 19.245843617920222,
                },
            ],
            dangerLevel: "Tiger",
            monsterName: "The Wretched Pest",
        },
        closestHero: {
            releaseTime: "2020-10-01T22:43:25.814Z",
            _id: "5f765bbc708701dda5130e83",
            name: "Pao de Coco",
            rank: "B",
            location: {
                coordinates: [-15.05, 51.35],
                _id: "5f765bbc708701dda5130e84",
                type: "Point",
            },
            createdAt: "2020-10-01T22:44:12.207Z",
            updatedAt: "2020-10-01T22:44:12.207Z",
            __v: 0,
        },
    };
    const { threat, closestHero } = modalData2;
    const releaseDate = format(
        parseISO(closestHero.releaseTime),
        "dd/MM/yyyy HH:mm"
    );
    function openModal() {
        setIsAlertOpen(true);
    }

    function closeModal() {
        setIsAlertOpen(false);
    }

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
                isOpen={isAlertOpen}
                onRequestClose={closeModal}
                // overlayClassName='Overlay'
                // portalClassName='modal'
                className='modal-body'
                contentLabel='Example Modal'
            >
                {threat && closestHero && (
                    <>
                        <h3>UMA NOVA AMEAÇA APARECEU!</h3>
                        <div className='modal--logo'>
                            <GiFishMonster size={50} color={"#FF6902"} />
                        </div>
                        <h4>
                            A ameaça <span>{threat.monsterName}</span> de nível{" "}
                            <span>{threat.dangerLevel}</span> apareceu mas já
                            foi derrotada pelo héroi{" "}
                            <span>{closestHero.name}</span> de rank{" "}
                            <span>{closestHero.rank}</span> que agora está em
                            recuperação até <span>{releaseDate}</span>.
                        </h4>
                    </>
                )}
                <button onClick={closeModal}>Fechar</button>
            </Modal>
        </div>
    );
}
