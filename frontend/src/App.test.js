import React from "react";
import Enzyme, { mount } from "enzyme";
import moxios from "moxios";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { findByTestAttribute, storeFactory } from "./test/testUtils";

import Dashboard from "./pages/Dashboard";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setupDashboard = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = mount(
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
    return wrapper;
};

describe("test add hero function", () => {
    test("renders add hero button without error", () => {
        const wrapper = setupDashboard();
        const component = findByTestAttribute(wrapper, "add-btn");
        expect(component.length).toBe(1);
    });
});
