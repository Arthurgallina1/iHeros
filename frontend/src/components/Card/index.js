import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { isBefore, parseISO } from "date-fns";
import "./styles.scss";

export default function Card({ data }) {
    const parsedDate = parseISO(data.releaseTime);
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
                <h4>{data.name}</h4>
                <span>Rank {data.rank}</span>
                <div className='hero-footer-box'>
                    <span>LAT: 30</span>
                    <span>LNG: 25</span>
                </div>
                <div className='hero-footer-box'>
                    <button>
                        <AiFillEdit size={20} color={"#FF6902"} />
                    </button>
                    <button>
                        <AiFillDelete size={18} color={"red"} />
                    </button>
                </div>
            </div>
        </div>
    );
}
