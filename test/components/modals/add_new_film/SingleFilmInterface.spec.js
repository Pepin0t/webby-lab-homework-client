import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import { SingleFilmInterface } from "../../../../src/components/modals/add_new_film/SingleFilmInterface";

describe("SingleFilmInterface Component", () => {
    it("initial state", () => {
        const wrapper = shallow(<SingleFilmInterface />);

        expect(wrapper.state().title).to.equal("");
        expect(wrapper.state().release).to.equal("");
        expect(wrapper.state().format).to.equal("");
        expect(wrapper.state().stars).to.equal("");

        expect(wrapper.find(".submit-button").text()).to.equal("Submit");
    });

    it("waiting", () => {
        const props = {
            waiting: true
        };

        const wrapper = shallow(<SingleFilmInterface {...props} />);

        expect(wrapper.find(".submit-button").text()).to.equal("Wait...");
        expect(wrapper.find(".submit-button").props().disabled).to.equal(true);
    });

    it("message", () => {
        const props = {
            waiting: true
        };
        const wrapper = shallow(<SingleFilmInterface {...props} />);

        wrapper.setProps({ response: { message: "Hello" } });
        wrapper.setState({ showMessage: true });

        expect(wrapper.find(".message").text()).to.equal("Hello");

        wrapper.setState({ innerMessage: "World" });

        expect(wrapper.find(".message").text()).to.equal("World");
    });
});
