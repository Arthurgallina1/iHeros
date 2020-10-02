import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { isBefore, parseISO } from "date-fns";
import HeroModal from "../../components/HeroModal";
import "./styles.scss";

export default function Card({ hero, handleDelete }) {
    const parsedDate = parseISO(hero.releaseTime);
    const showRecoveringLabel = isBefore(new Date(), parsedDate);

    return (
        <div className='hero--card'>
            <div className='hero-img'>
                {showRecoveringLabel && (
                    <div className='tag'>Em recuperação</div>
                )}
                <img
                    src='http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_xlarge.jpg'
                    alt=''
                />
            </div>
            <div className='hero-footer'>
                <h4>{hero.name}</h4>
                <span>Rank {hero.rank}</span>
                <div className='hero-footer-box'>
                    <span>LAT: {hero.location.coordinates[1]}</span>
                    <span>LNG: {hero.location.coordinates[0]}</span>
                </div>
                <div className='hero-footer-box'>
                    <HeroModal isEditting={true} hero={hero} />

                    <button>
                        <AiFillDelete
                            size={18}
                            color={"red"}
                            onClick={() => handleDelete(hero._id)}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
