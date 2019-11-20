import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class ChildNodesContainer extends Component {
    render() {
        const { expanded, children } = this.props;

        if (!expanded) return null;

        const results = children();

        return <Fragment>{results}</Fragment>;
    }
}

ChildNodesContainer.propTypes = {
    expanded: PropTypes.bool,
    node: PropTypes.object,
};

ChildNodesContainer.defaultProps = {
    expanded: false,
};

export default ChildNodesContainer;
