import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import { useDispatch } from "react-redux";
import { signInRequest } from "../../store/modules/auth/actions";
import "./styles.scss";

export default function SignIn() {
    const dispatch = useDispatch();

    function handleSubmit({ username, password }) {
        dispatch(signInRequest(username, password));
    }

    return (
        <div className='container'>
            <div className='header'>
                <h2>iHeros</h2>
                <span>Faça seu login para conhecer os melhores hérois.</span>
            </div>
            <Form onSubmit={handleSubmit}>
                <Input name='username' type='username' placeholder='Username' />
                <Input name='password' type='password' placeholder='Password' />

                <button type='submit' className='login--btn'>
                    Login
                </button>
                <Link to='/register'>Criar conta</Link>
            </Form>
        </div>
    );
}
