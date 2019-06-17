import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    static getDerivedStateFromError() {
        return { error: true };
    }

    render() {
        if (this.state.error) return <div>Somethig wrong!</div>;

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ErrorBoundary;
