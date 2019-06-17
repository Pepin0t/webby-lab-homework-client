import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import { NewFilmModal } from "../../../../src/components/modals/add_new_film/NewFilmModal";

describe("NewFilmModal Component", () => {
    const props = {
        waiting: false,
        close: function() {}
    };

    it("initial state", () => {
        const wrapper = shallow(<NewFilmModal {...props} />);

        expect(
            wrapper
                .find(".change-mode-button")
                .first()
                .props().disabled
        ).to.equal(true);
        expect(
            wrapper
                .find(".change-mode-button")
                .last()
                .props().disabled
        ).to.equal(false);
        expect(wrapper.find("#close-modal").props().disabled).to.equal(false);
        expect(wrapper.find("#mode").children()).to.have.lengthOf(1);
    });

    it("change mode", () => {
        const wrapper = shallow(<NewFilmModal {...props} />);

        wrapper
            .find(".change-mode-button")
            .last()
            .simulate("click");

        expect(wrapper.state().multiple).to.equal(true);
        expect(
            wrapper
                .find(".change-mode-button")
                .first()
                .props().disabled
        ).to.equal(false);
        expect(
            wrapper
                .find(".change-mode-button")
                .last()
                .props().disabled
        ).to.equal(true);

        wrapper
            .find(".change-mode-button")
            .first()
            .simulate("click");

        expect(wrapper.state().multiple).to.equal(false);

        expect(wrapper.find("#mode").children()).to.have.lengthOf(1);

        expect(
            wrapper
                .find(".change-mode-button")
                .first()
                .props().disabled
        ).to.equal(true);
        expect(
            wrapper
                .find(".change-mode-button")
                .last()
                .props().disabled
        ).to.equal(false);
        expect(wrapper.state().multiple).to.equal(false);

        expect(wrapper.find("#mode").children()).to.have.lengthOf(1);
    });

    it("waiting", () => {
        const wrapper = shallow(<NewFilmModal {...props} />);
        wrapper.setProps({ waiting: true });

        expect(
            wrapper
                .find(".change-mode-button")
                .first()
                .props().disabled
        ).to.equal(true);
        expect(
            wrapper
                .find(".change-mode-button")
                .last()
                .props().disabled
        ).to.equal(true);
        expect(wrapper.find("#close-modal").props().disabled).to.equal(true);
    });
});
