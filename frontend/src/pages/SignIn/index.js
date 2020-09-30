import React from "react";
import { Form, Input } from "@rocketseat/unform";
import { useDispatch } from "react-redux";
import { signInRequest } from "../../store/modules/auth/actions";
export default function SignIn() {
    const dispatch = useDispatch();

    function handleSubmit({ username, password }) {
        dispatch(signInRequest(username, password));
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Input name='username' type='username' placeholder='Username' />
                <Input name='password' type='password' placeholder='Password' />

                <button type='submit'>Login</button>
                {/* <Link to='/register'>Create account.</Link> */}
            </Form>
        </>
    );
}
