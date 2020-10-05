import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInRequest } from "../../store/modules/auth/actions";
import history from "../../services/history";
import { storeUser } from "../../services/userServices";

export default function SignUp() {
    const dispatch = useDispatch();

    async function handleSubmit(data) {
        try {
            const { success, msg } = await storeUser(data);
            if (success) {
                const { username, password } = data;
                toast.success(
                    "Sua conta foi criada com sucesso, você será redirecionado em alguns segundos"
                );
                setTimeout(() => {
                    dispatch(signInRequest(username, password));
                }, 3000);
            } else {
                toast.error(msg);
            }
        } catch (err) {
            toast.error("Houve alguém, favor verifique os dados.");
        }
    }

    return (
        <div className='container'>
            <div className='header'>
                <h2>iHeros</h2>
                <span>Crie uma conta para se unir ao time.</span>
            </div>
            <Form onSubmit={handleSubmit}>
                <Input name='name' type='text' placeholder='Nome' />
                <Input name='username' type='username' placeholder='Username' />
                <Input name='email' type='email' placeholder='Email' />
                <Input name='password' type='password' placeholder='Password' />

                <button type='submit' className='login--btn'>
                    Criar conta
                </button>
                <Link to='/'>Já possuo conta</Link>
            </Form>
        </div>
    );
}
