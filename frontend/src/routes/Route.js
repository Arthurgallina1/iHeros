import React from "react";
import { Route, Redirect } from "react-router-dom";
import authLayout from "../pages/_layouts/authLayout";
import defaultLayout from "../pages/_layouts/authLayout";

import { store } from "../store";

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}) {
    const { signed } = store.getState().auth;

    if (!signed && isPrivate) {
        return <Redirect to='/' />;
    }

    if (signed && !isPrivate) {
        return <Redirect to='/dashboard' />;
    }

    const Layout = signed ? defaultLayout : authLayout;

    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}
