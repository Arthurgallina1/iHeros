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
    const [closestHero, setClosestHero] = useState(false);
    const [threat, setThreat] = useState({});
    const [releaseDate, setReleaseDate] = useState("");

    useEffect(() => {
        const { threat, closestHero } = modalData;
        setThreat(threat);
        let releaseDate = "";
        if (closestHero) {
            releaseDate = format(
                parseISO(closestHero.releaseTime),
                "dd/MM/yyyy HH:mm"
            );
            setReleaseDate(releaseDate);
            setClosestHero(closestHero);
        }
    }, [modalData]);

    function openModal() {
        setIsAlertOpen(true);
    }

    function closeModal() {
        setIsAlertOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={isAlertOpen}
                onRequestClose={closeModal}
                className='modal-body'
                contentLabel='Example Modal'
            >
                {threat && (
                    <>
                        <h3>UMA NOVA AMEAÇA APARECEU!</h3>
                        <div className='modal--logo'>
                            <GiFishMonster size={50} color={"#FF6902"} />
                        </div>
                        {closestHero ? (
                            <h4>
                                A ameaça <span>{threat.monsterName}</span> de
                                nível <span>{threat.dangerLevel}</span> apareceu
                                mas já foi derrotada pelo héroi{" "}
                                <span>{closestHero.name}</span> de rank{" "}
                                <span>{closestHero.rank}</span> que agora está
                                em recuperação até <span>{releaseDate}</span>.
                            </h4>
                        ) : (
                            <h4>
                                Nenhum herói em condições de derrotar essa
                                ameaça foi encontrado, é possível que todos
                                estejam em recuperação, é necessário contratar
                                mais!
                            </h4>
                        )}
                    </>
                )}
                <div className='modal--threat'>
                    <button onClick={closeModal}>Fechar</button>
                </div>
            </Modal>
        </div>
    );
}
