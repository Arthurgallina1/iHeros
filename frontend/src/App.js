import React from "react";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import history from "./services/history";
import Routes from "./routes/index";
import { store, persistor } from "./store";
import "./styles.scss";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <Routes />
                    <ToastContainer autoclose={3000} />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
