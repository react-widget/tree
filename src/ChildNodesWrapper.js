import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { isLoading, isPromiseLike } from "./utils";

export default class ChildNodesContainer extends Component {
    static propTypes = {
        expanded: PropTypes.bool,
        node: PropTypes.object,
    };

    static defaultProps = {
        expanded: false,
    };

    render() {
        const { expanded, children } = this.props;

        if (!expanded) return null;

        const results = children();

        // if (isPromiseLike(results)) {
        //     return null;
        // }

        return <Fragment>{results}</Fragment>;
    }
}
