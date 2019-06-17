import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import { Film } from "../../src/components/Film";

describe("Film Component", () => {
    const props = {
        film: {
            ID: "unique ID",
            title: "Blazing Saddles",
            release: 1974,
            format: "VHS",
            stars: ["Mel Brooks", "Clevon Little", "Harvey Korman", "Gene Wilder", "Slim Pickens", "Madeline Kahn"]
        },
        deleteFilm: function() {}
    };

    it("show question", () => {
        const wrapper = shallow(<Film {...props} />);

        const event = {
            stopPropagation: function() {}
        };

        wrapper.find(".prepare-to-delete-button").simulate("click", event);

        expect(wrapper.state("showDeleteConfirm")).to.equal(true);

        expect(wrapper.find(".delete").contains(<div className="question">Delete?</div>)).to.equal(true);
        expect(wrapper.find(".confirm-button").text()).to.equal("✓");
        expect(wrapper.find(".prepare-to-delete-button").text()).to.equal("×");
    });

    it("show/hide information", () => {
        const wrapper = shallow(<Film {...props} />);

        expect(wrapper.state("expanded")).to.equals(false);
        expect(wrapper.find(".info").children()).to.have.lengthOf(1);

        wrapper.find(".film-container").simulate("click");

        expect(wrapper.state("expanded")).to.equals(true);
        expect(wrapper.find(".info").children()).to.have.lengthOf(5);
    });
});
