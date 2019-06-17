import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import { MultipleFilmsInterface } from "../../../../src/components/modals/add_new_film/MultipleFilmsInterface";

describe("MultipleFilmsInterface Component", () => {
    it("initial state", () => {
        const wrapper = shallow(<MultipleFilmsInterface />);

        expect(wrapper.state().fileName).to.equal("");
        expect(wrapper.find(".submit-button").text()).to.equal("Submit");
    });

    it("waiting", () => {
        const props = {
            waiting: true
        };

        const wrapper = shallow(<MultipleFilmsInterface {...props} />);

        expect(wrapper.find(".submit-button").text()).to.equal("Wait...");
        expect(wrapper.find(".submit-button").props().disabled).to.equal(true);
    });

    it("message", () => {
        const props = {
            waiting: true
        };

        const wrapper = shallow(<MultipleFilmsInterface {...props} />);

        wrapper.setProps({ response: { message: "Hello" } });
        wrapper.setState({ showMessage: true });

        expect(wrapper.find(".message").text()).to.equal("Hello");

        wrapper.setState({ innerMessage: "World" });

        expect(wrapper.find(".message").text()).to.equal("World");
    });
});
