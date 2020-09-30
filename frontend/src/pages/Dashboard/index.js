import React from "react";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/modules/auth/actions";

export default function Dashboard() {
    const dispatch = useDispatch();

    api.get("/");
    return (
        <div>
            <h3>dasssssh</h3>
            <button
                onClick={() => {
                    dispatch(signOut());
                }}
            >
                {" "}
                lgout
            </button>
        </div>
    );
}
