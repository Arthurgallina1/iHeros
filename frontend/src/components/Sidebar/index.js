import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { signOut } from "../../store/modules/auth/actions";
const activeStyle = {
    color: "#004AA0",
    borderLeft: "3px solid #FF6902",
};

export default function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className='sidebar'>
            <div className='sidebar--header'>
                <h2>iHeros</h2>
                <img src='https://picsum.photos/100' alt='' />
            </div>
            <div className='sidebar--menu'>
                <NavLink
                    to='/dashboard'
                    activeStyle={activeStyle}
                    className='navlink'
                    exact
                >
                    <strong>Herois</strong>
                </NavLink>
                <NavLink
                    to='/signup'
                    activeStyle={activeStyle}
                    exact
                    className='navlink'
                >
                    <strong>Ameaças </strong>
                </NavLink>
            </div>

            <div className='sidebar--footer'>
                <button
                    onClick={() => {
                        dispatch(signOut());
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
