import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TreeNode from './TreeNode';
import ChildNodesWrapper from './ChildNodesWrapper';

const noop = () => { };

export default class Tree extends React.Component {

    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        rootId: PropTypes.any,
        loadingLabel: PropTypes.node,
        loadingComponent: PropTypes.elementType,
        loadData: PropTypes.func,
        showIcon: PropTypes.bool,
        showExpanderIcon: PropTypes.bool,
        checkable: PropTypes.bool,
        maxDepth: PropTypes.number,
        rootComponent: PropTypes.elementType,
        childNodesWrapperComponent: PropTypes.elementType,
        nodeItemWrapperComponent: PropTypes.elementType,
        renderIndentIcons: PropTypes.func,
        renderExpanderIcon: PropTypes.func,
        renderLoadingIcon: PropTypes.func,
        renderIcon: PropTypes.func,
        renderCheckbox: PropTypes.func,
        renderLabel: PropTypes.func,
        renderExtIcons: PropTypes.func,
        renderNode: PropTypes.func,
        onNodeClick: PropTypes.func,
        onNodeDoubleClick: PropTypes.func,
        onNodeContextMenu: PropTypes.func,
        onNodeMouseDown: PropTypes.func,
        onNodeMouseUp: PropTypes.func,
        onNodeMouseEnter: PropTypes.func,
        onNodeMouseLeave: PropTypes.func,
        onNodeMouseOver: PropTypes.func,
        onNodeMouseOut: PropTypes.func,
        onNodeMouseMove: PropTypes.func,

    };

    static defaultProps = {
        prefixCls: 'nil-tree',
        className: '',
        rootId: null,
        loadingLabel: 'Loading...',
        loadingComponent: 'div',
        loadData: null,
        showIcon: true,
        showExpanderIcon: true,
        checkable: false,
        maxDepth: 50, //最大层级50

        rootComponent: 'div',
        childNodesWrapperComponent: ChildNodesWrapper,
        nodeItemWrapperComponent: Fragment,
        //自定义
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
        const rootId = this.props.rootId;
        return {
            //id: this.props.rootId,
            get id() {
                return rootId;
            },
            //leaf: false,
            get leaf() {
                return false;
            },
            //expanded: true,
            get expanded() {
                return true;
            },
            //checked: false,
            get checked() {
                return false;
            },
            //pid: null,
            get pid() {
                return null;
            },
            ///root: true,
            get root() {
                return true;
            },
            // depth: 0, //deprecated
            //relativeDepth: 0,
            get relativeDepth() {
                return 0;
            },
            loading: false,
        }
    }

    render() {
        const { prefixCls, className, rootComponent: Component } = this.props;

        let classes = classNames({
            [prefixCls]: true,
            [className]: className,
        });

        if (Fragment === Component) {
            classes = {};
        }

        return (
            <Component className={classes}>
                <TreeNode parentProps={this.props} node={this.getRootNode()} isRoot />
            </Component>
        );
    }
}