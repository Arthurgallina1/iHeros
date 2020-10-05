import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { isBefore, parseISO } from "date-fns";
import HeroModal from "../AddOrEditHeroModal";
import { deleteHero } from "../../services/heroServices";
import { HeroContext } from "../../context/HerosContext";
import HeroS from "../../assets/hero_s.webp";
import HeroA from "../../assets/hero_a.webp";
import HeroB from "../../assets/hero_b.webp";
import HeroC from "../../assets/hero_c.jpg";
import "./styles.scss";

const heroImage = {
    S: HeroS,
    A: HeroA,
    B: HeroB,
    C: HeroC,
};

export default function Card({ hero }) {
    const parsedDate = parseISO(hero.releaseTime);
    const showRecoveringLabel = isBefore(new Date(), parsedDate);
    const { filteredHeroList, setFilteredHeroList } = useContext(HeroContext);

    const handleDelete = (heroId) => {
        deleteHero(heroId, filteredHeroList, setFilteredHeroList);
    };
    return (
        <div className='hero--card'>
            <div className='hero-img'>
                {showRecoveringLabel && (
                    <div className='tag'>Em recuperação</div>
                )}
                <img src={heroImage[hero.rank]} alt='' />
            </div>
            <div className='hero-footer'>
                <h4>{hero.name}</h4>
                Rank {hero.rank}
                <div className='hero-footer-box'>
                    <p>
                        <span>LAT</span> {hero.location.coordinates[1]}
                    </p>
                    <p>
                        {" "}
                        <span>LNG</span> {hero.location.coordinates[0]}
                    </p>
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
