import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChildNodesContainer extends Component {

    static propTypes = {
        expanded: PropTypes.bool,
    };

    static defaultProps = {
        expanded: false,
    };

    render() {
        const { expanded, children, ...others } = this.props;

        return expanded ? <div {...others}>{children()}</div> : null;
    }
}