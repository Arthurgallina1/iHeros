import React from "react";
// import { Wrapper } from './styles'
import "./styles.scss";
import Sidebar from "../../components/Sidebar/";

export default function authLayout({ children }) {
    return (
        <div className='auth-layout'>
            <Sidebar />
            <>{children}</>
        </div>
    );
}
