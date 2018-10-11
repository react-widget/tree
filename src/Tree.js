import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TreeNode from './TreeNode';
import ChildNodesContainer from './ChildNodesContainer';

const noop = () => { };

export default class Tree extends React.Component {

    static propTypes = {
        loadData: PropTypes.func,
    };

    static defaultProps = {
        prefixCls: 'nil-tree',
        className: '',
        rootId: null,
        loadingText: '加载中...',
        loadData: null,
        showIcon: true,
        checkable: false,
        maxDepth: 50, //最大层级50
        //showLine: false, //自定义支持
        //animate: false, //自定义支持
        childNodesWrapperComponent: ChildNodesContainer,
        renderIndentIcons: null,
        renderExpanderIcon: null,
        renderLoadingIcon: null,
        renderIcon: null,
        renderCheckbox: null,
        renderLabel: null,
        renderExtIcons: null,
        renderNode: null,

        //events
        onNodeClick: noop,
        onNodeDoubleClick: noop,
        onNodeContextMenu: noop,
        onNodeMouseDown: noop,
        onNodeMouseUp: noop,
        onNodeMouseEnter: noop,
        onNodeMouseLeave: noop,
        onNodeMouseOver: noop,
        onNodeMouseOut: noop,
        onNodeMouseMove: noop,
    };

    getRootNode() {
        return {
            id: this.props.rootId,
            leaf: false,
            expanded: true,
            checked: false,
            pid: null,
            root: true,
            // depth: 0,
            relativeDepth: 0,
        }
    }

    render() {
        const { prefixCls, className, rootId, loadData } = this.props;

        const classes = classNames({
            [prefixCls]: true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <TreeNode parentProps={this.props} node={this.getRootNode()} isRoot />
            </div>
        );
    }
}