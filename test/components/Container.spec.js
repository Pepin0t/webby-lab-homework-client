import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import Container from "../../src/components/Container";

describe("Container Component", () => {
    it("render children", () => {
        const wrapper = shallow(
            <Container>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </Container>
        );

        expect(wrapper.find("#container").children()).to.have.length(5);
    });
});
