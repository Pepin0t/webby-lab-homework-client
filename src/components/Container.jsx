import React from "react";
import PropTypes from "prop-types";

function Container(props) {
    return <div id="container">{props.children}</div>;
}

Container.propTypes = {
    children: PropTypes.PropTypes.node.isRequired
};

export default Container;
