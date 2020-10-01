import React from "react";
import "./styles.scss";

export default function HeroCard({ hero }) {
    return (
        <div className='hero--card'>
            <div className='hero-img'>
                <img
                    src='http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_xlarge.jpg'
                    alt=''
                />
            </div>
            <div className='hero-footer'>
                <h4>{hero.name}</h4>
                <span>Rank {hero.rank}</span>
            </div>
        </div>
    );
}
