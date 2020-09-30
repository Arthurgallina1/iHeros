import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../../services/api";
import history from "../../../services/history";
import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
    const { username, password } = payload;
    try {
        const response = yield call(api.post, "session", {
            username,
            password,
        });
        const { token, user } = response.data;
        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        yield put(signInSuccess(token, user));

        history.push("/dashboard");
    } catch (err) {
        console.log(err);
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
}

export function signOut() {
    history.push("/");
}

export default all([
    takeLatest("persist/REHYDRATE", setToken),
    takeLatest("@auth/SIGN_OUT", signOut),
    takeLatest("@auth/SIGN_IN_REQUEST", signIn),
]);
