const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false,
    user: null,
};

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "@auth/SIGN_IN_SUCCESS":
            return Object.assign({}, state, {
                token: action.payload.token,
                signed: true,
                user: action.payload.user,
            });
        case "@auth/SIGN_OUT": {
            return Object.assign({}, state, {
                signed: false,
                token: null,
                user: null,
            });
        }

        default:
            return state;
    }
}
