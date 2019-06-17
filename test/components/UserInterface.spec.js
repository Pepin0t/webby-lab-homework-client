import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

import { UserInterface } from "../../src/components/UserInterface";

describe("UserInterface Component", () => {
    const props = {
        show: sinon.spy(),
        sort: sinon.spy(),
        search: sinon.spy()
    };

    const wrapper = shallow(<UserInterface {...props} />);

    it("show modal window", () => {
        wrapper.find("#show-modal").simulate("click");
        expect(props.show.calledOnce).to.equal(true);
    });

    it("sort list", () => {
        wrapper.find("#sort-list").simulate("click");
        expect(props.sort.calledOnce).to.equal(true);
    });
});
