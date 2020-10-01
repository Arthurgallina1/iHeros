import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
    content: {
        // top: "50%",
        // left: "50%",
        // right: "auto",
        // bottom: "auto",
        // marginRight: "-50%",
        // transform: "translate(-50%, -50%)",
    },
};

export default function AlertModal({ isAlertOpen, setIsAlertOpen }) {
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
                style={customStyles}
                contentLabel='Example Modal'
            >
                <button onClick={closeModal}>close</button>
                <div>UMA NOVA AMEAÇA APARECEU!</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    );
}
