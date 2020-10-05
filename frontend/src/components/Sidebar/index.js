import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { GiBatMask, GiDaemonSkull } from "react-icons/gi";
import { signOut } from "../../store/modules/auth/actions";
import Logo from "../../assets/logo.png";
import "./styles.scss";
const activeStyle = {
    color: "#586D75",
    fontWeight: "bold",
    borderLeft: "4px solid #FF6902",
};

export default function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className='sidebar'>
            <div className='sidebar--header'>
                <h2>iHeros</h2>
                <img src={Logo} alt='' width='100' height='100' />
            </div>
            <div className='sidebar--menu'>
                <NavLink
                    to='/dashboard'
                    activeStyle={activeStyle}
                    className='navlink'
                    exact
                >
                    <GiBatMask size={18} />
                    <strong>Hérois</strong>
                </NavLink>
                <NavLink
                    to='/threats'
                    activeStyle={activeStyle}
                    exact
                    className='navlink'
                >
                    <GiDaemonSkull size={18} />
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
