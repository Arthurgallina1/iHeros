import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { GiFishMonster } from "react-icons/gi";
import { format, parseISO } from "date-fns";
import { HeroContext } from "../../context/HerosContext";
import "./styles.scss";

Modal.setAppElement("#root");

export default function ThreatModal({
    isAlertOpen,
    setIsAlertOpen,
    modalData,
}) {
    // useEffect(() => {}, modalData);
    const { filteredHeroList, setFilteredHeroList } = useContext(HeroContext);

    const { threat, closestHero } = modalData;
    let releaseDate = "";
    if (closestHero) {
        releaseDate = format(
            parseISO(closestHero.releaseTime),
            "dd/MM/yyyy HH:mm"
        );
    }
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