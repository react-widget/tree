import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class ChildNodesContainer extends Component {

    static propTypes = {
        expanded: PropTypes.bool,
    };

    static defaultProps = {
        expanded: false,
    };

    render() {
        const { expanded, children } = this.props;

        return expanded ? <Fragment>{children()}</Fragment> : null;
    }
}