import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TreeNode from './TreeNode';
import ChildNodesWrapper from './ChildNodesWrapper';

const noop = () => { };

export default class Tree extends React.Component {

    static propTypes = {
        loadData: PropTypes.func,
    };

    static defaultProps = {
        prefixCls: 'nil-tree',
        className: '',
        rootId: null,
        loadingText: 'Loading...',
        loadData: null,
        showIcon: true,
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