import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getAllThreats } from "../../services/threatServices";
import Threat from "../../components/Threat";

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
            <div className='threat--body'>
                {threatList.length > 0 ? (
                    threatList.map((threat) => (
                        <Threat threat={threat} key={threat._id} />
                    ))
                ) : (
                    <h2>
                        Nenhuma ameaça apareceu ainda, tudo tranquilo na terra.
                    </h2>
                )}
            </div>
        </div>
    );
}
