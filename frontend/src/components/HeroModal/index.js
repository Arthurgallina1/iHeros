import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { GiAmericanShield } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { createHero, updateHero } from "../../services/heroServices";
import { HeroContext } from "../../context/HerosContext";
import api from "../../services/api";
import "./styles.scss";

Modal.setAppElement("#root");

export default function HeroModal({ isEditting, hero = {} }) {
    let lat,
        lng = "";
    if (hero.location) {
        [lat, lng] = hero.location.coordinates;
    }
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: hero.name || "",
        rank: hero.rank || "S",
        lat: lat || "",
        lng: lng || "",
    });
    const { filteredHeroList, setFilteredHeroList } = useContext(HeroContext);
    const headerText = isEditting ? "Editar Héroi" : "Adicionar Héroi";
    const successText = isEditting ? "editado" : "adicionado";
    function openModal() {
        setIsOpenModal(true);
    }

    function closeModal() {
        setIsOpenModal(false);
    }

    const setFieldValue = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    // const handleDelete = async (_id) => {
    //     try {
    //         const response = await api.delete(`/hero/${_id}`);
    //         const filteredList = heroList.filter(
    //             (hero) => hero._id !== response.data.hero._id
    //         );
    //         setFilteredHeroList(filteredList);
    //         toast.success(
    //             `Héroi ${response.data.hero.name} deletado com sucesso!`
    //         );
    //     } catch (error) {
    //         toast.error(
    //             `Não foi possível deletar esse héroi, talvez ele seja muito forte para isso.`
    //         );
    //     }
    // };

    const verifyIfAllFieldsAreValid = (formData) => {
        let allFieldsAreValid = true;
        for (let prop in formData) {
            if (formData[prop] === "") {
                allFieldsAreValid = false;
            }
        }
        return allFieldsAreValid;
    };

    const handleSubmit = async () => {
        const allFieldsAreValid = verifyIfAllFieldsAreValid(formData);
        if (allFieldsAreValid) {
            if (isEditting) {
                updateHero(
                    hero._id,
                    formData,
                    filteredHeroList,
                    setFilteredHeroList
                );
                closeModal();
            } else {
                createHero(formData, filteredHeroList, setFilteredHeroList);
                closeModal();
            }
        } else {
            toast.error(
                "Todos os campos precisam ser preenchidos corretamente!"
            );
        }
    };

    return (
        <div>
            <div className='add-box' onClick={openModal}>
                {isEditting ? (
                    <button>
                        <AiFillEdit size={20} color={"#FF6902"} />
                    </button>
                ) : (
                    <>
                        <button>+</button>
                        <span>
                            <strong>Adicionar Herói</strong>
                        </span>
                    </>
                )}
            </div>
            <Modal
                isOpen={isOpenModal}
                onRequestClose={closeModal}
                // overlayClassName='Overlay'
                // portalClassName='modal'
                className='modal-hero'
                contentLabel='Example Modal'
            >
                <div className='modal-hero-header'>
                    <h4>{headerText}</h4>
                    <GiAmericanShield size={30} color={"#fff"} />
                </div>
                <div className='modal-hero-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='nome'>Nome do Héroi</label>
                            <input
                                type='text'
                                placeholder='Nome'
                                data-lpignore='true'
                                value={formData.name}
                                onChange={(e) => setFieldValue(e, "name")}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nome'>Rank</label>
                            <select
                                type='text'
                                placeholder='Rank'
                                value={formData.rank}
                                onChange={(e) => setFieldValue(e, "rank")}
                            >
                                <option value='S'>S</option>
                                <option value='A'>A</option>
                                <option value='B'>B</option>
                                <option value='C'>C</option>
                            </select>
                        </div>
                        <div className='form-group split'>
                            <div className='form-group'>
                                <label htmlFor='nome'>Latitude</label>
                                <input
                                    type='text'
                                    placeholder='LAT'
                                    data-lpignore='true'
                                    value={formData.lat}
                                    onChange={(e) => setFieldValue(e, "lat")}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='nome'>Longitude</label>
                                <input
                                    type='text'
                                    placeholder='LNG'
                                    data-lpignore='true'
                                    value={formData.lng}
                                    onChange={(e) => setFieldValue(e, "lng")}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='modal-hero-footer'>
                    <button onClick={closeModal}>Fechar</button>
                    <button onClick={handleSubmit}>Salvar</button>
                </div>
            </Modal>
        </div>
    );
}
