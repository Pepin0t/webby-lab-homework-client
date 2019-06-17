import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import { ListOfFilms } from "../../src/components/ListOfFilms";

describe("ListOfFilms Component", () => {
    it("initial state", () => {
        const props = {
            getListOfFilms: function() {},
            list: [],
            loading: false,
            response: { ok: undefined }
        };

        const wrapper = shallow(<ListOfFilms {...props} />);

        expect(wrapper.find("#list-of-films").children()).to.have.lengthOf(props.list.length);
        expect(
            wrapper
                .find(".message")
                .children()
                .html()
        ).to.equal('<div class="simple-message">The list is empty</div>');
    });
});
