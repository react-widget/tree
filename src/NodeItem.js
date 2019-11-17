import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isLoading, isLeaf, isExpanded, arrayFill, closest } from "./utils";
import TreeContext from "./TreeContext";

export default class NodeItem extends Component {
    static contextType = TreeContext;

    static propTypes = {
        parentProps: PropTypes.object,
        self: PropTypes.object,
        node: PropTypes.object,
    };

    static defaultProps = {};

    getTree() {
        return this.context.tree;
    }
    getTreeProps(prop) {
        const tree = this.getTree();
        return tree.props;
    }
    getTreeProp(prop, defaultValue) {
        const tree = this.getTree();
        const treeProps = tree.props;

        return prop in treeProps ? treeProps[prop] : defaultValue;
    }

    getNode() {
        return this.props.node;
    }

    renderLoadingNode() {
        const { prefixCls, loadingText } = this.getTreeProps();

        if (!loadingText) return null;

        return (
            <div className={`${prefixCls}-loading-wrapper`}>{loadingText}</div>
        );
    }

    renderIndentIcons() {
        const { prefixCls, renderIndentIcons } = this.getTreeProps();
        const { node, data } = this.props;

        const relativeDepth = node.relativeDepth - 1;

        if (relativeDepth <= 0) return null;

        const indentProps = {
            className: `${prefixCls}-indent`,
        };

        if (renderIndentIcons) {
            return renderIndentIcons(data, indentProps, this);
        }

        const indents = arrayFill(Array(relativeDepth), 0);

        return indents.map((v, i) => <div {...indentProps} key={i} />);
    }

    renderExpanderIcon() {
        const tree = this.getTree();
        const { prefixCls, renderExpanderIcon } = this.getTreeProps();
        const { node, data } = this.props;

        const leaf = tree.isLeaf(node);
        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-expander-icon`]: !leaf,
            open: !leaf && tree.isExpanded(node),
            [`${prefixCls}-indent`]: leaf,
        });

        const expanderProps = {
            className: classes,
        };

        if (renderExpanderIcon) {
            return renderExpanderIcon(data, expanderProps, this);
        }

        return <div {...expanderProps} />;
    }

    renderLoadingIcon() {
        const { prefixCls, renderLoadingIcon } = this.getTreeProps();
        const { data } = this.props;

        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-loading-icon`]: true,
        });

        const loadingProps = {
            className: classes,
        };

        if (renderLoadingIcon)
            return renderLoadingIcon(data, loadingProps, this);

        return <div {...loadingProps} />;
    }

    renderIcon() {
        const { prefixCls, renderIcon } = this.getTreeProps();
        const { node, data } = this.props;

        const leaf = isLeaf(node);
        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-icon-parent`]: !leaf,
            [`${prefixCls}-icon-leaf`]: leaf,
            [data.iconCls]: data.iconCls,
        });

        const iconProps = {
            className: classes,
        };

        if (renderIcon) return renderIcon(data, iconProps, this);

        return <div {...iconProps} />;
    }

    renderCheckbox() {
        const { prefixCls, renderCheckbox } = this.getTreeProps();
        const { node, data } = this.props;

        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-icon-checkbox`]: true,
            checked: !!node.checked,
        });

        const checkboxProps = {
            className: classes,
        };

        if (renderCheckbox) return renderCheckbox(data, checkboxProps, this);

        return <div {...checkboxProps} />;
    }

    renderLabel() {
        const { prefixCls, labelField, renderLabel } = this.getTreeProps();
        const { data } = this.props;

        const labelProps = {
            className: `${prefixCls}-label`,
        };

        if (renderLabel) return renderLabel(data, labelProps, this);

        return <div {...labelProps}>{data[labelField]}</div>;
    }

    renderExtIcons() {
        const { renderExtIcons } = this.getTreeProps();
        const { data } = this.props;

        if (renderExtIcons) return renderExtIcons(data, {}, this);
    }

    handleNodeClick = e => {
        const tree = this.getTree();
        const treeProps = tree.props;
        const { node, data } = this.props;
        const {
            prefixCls,
            multiple,
            selectable,
            unselectable,
            onSelect,
            onExpand,
            onNodeClick,
        } = treeProps;

        const { selectedKeys, expandedKeys } = tree.state;
        const isExpanderClick = closest(
            e.target,
            `.${prefixCls}-expander-icon`
        );
        let shouldTriggerSelect = false;
        const newState = Object.create(null);

        //是否受控检测
        const isSelectControlled = "selectedKeys" in treeProps;
        const isExpandedControlled = "expandedKeys" in treeProps;

        let newSelectedKeys = selectedKeys;
        const newExpandedKeys = [...expandedKeys];
        const idx = newExpandedKeys.indexOf(node.id);
        const isExpanded = idx !== -1;
        const sIdx = selectedKeys.indexOf(node.id);
        const isSelected = sIdx !== -1;

        if (!isSelected && selectable) {
            newSelectedKeys = multiple ? [...selectedKeys, node.id] : [node.id];

            if (!isSelectControlled) {
                newState.selectedKeys = newSelectedKeys;
            }

            shouldTriggerSelect = true;
        }

        if (isSelected && unselectable) {
            newSelectedKeys = [...selectedKeys];

            newSelectedKeys.splice(sIdx, 1);

            if (!isSelectControlled) {
                newState.selectedKeys = newSelectedKeys;
            }

            shouldTriggerSelect = true;
        }

        if (isExpanderClick) {
            if (isExpanded) {
                newExpandedKeys.splice(idx, 1);
            } else {
                newExpandedKeys.push(node.id);
            }

            if (!isExpandedControlled) {
                newState.expandedKeys = newExpandedKeys;
            }
        }

        if (Object.keys(newState).length) {
            tree.setState(newState);
        }

        if (shouldTriggerSelect && onSelect) {
            onSelect(newSelectedKeys, {
                event: e,
                node: data,
                selected: !isSelected,
            });
        }

        if (onExpand) {
            onExpand(newExpandedKeys, {
                event: e,
                node: data,
                expanded: !isExpanded,
            });
        }

        if (onNodeClick) {
            onNodeClick(e);
        }
    };

    getNodeProps() {
        const { node, self } = this.props;
        const {
            prefixCls,
            onSelect,
            onExpand,
            onNodeClick,
            onNodeDoubleClick,
            onNodeContextMenu,
            onNodeMouseDown,
            onNodeMouseUp,
            onNodeMouseEnter,
            onNodeMouseLeave,
            onNodeMouseOver,
            onNodeMouseOut,
            onNodeMouseMove,
        } = this.getTreeProps();

        const nodeProps = {
            className: classNames({
                [`${prefixCls}-item`]: true,
                //[`${prefixCls}-item-wrapper`]: true,
                [node.cls]: node.cls,
                [`${prefixCls}-item-expanded`]: isExpanded(node),
            }),
            onClick: this.handleNodeClick,
            onDoubleClick: e => {
                onNodeDoubleClick(node, e, self);
            },
            onContextMenu: e => {
                onNodeContextMenu(node, e, self);
            },
            onMouseDown: e => {
                onNodeMouseDown(node, e, self);
            },
            onMouseUp: e => {
                onNodeMouseUp(node, e, self);
            },
            onMouseEnter: e => {
                onNodeMouseEnter(node, e, self);
            },
            onMouseLeave: e => {
                onNodeMouseLeave(node, e, self);
            },
            onMouseOver: e => {
                onNodeMouseOver(node, e, self);
            },
            onMouseOut: e => {
                onNodeMouseOut(node, e, self);
            },
            onMouseMove: e => {
                onNodeMouseMove(node, e, self);
            },
        };

        return nodeProps;
    }

    renderNode() {
        const { showIcon, showExpanderIcon, checkable } = this.getTreeProps();
        const { node } = this.props;

        return (
            <div {...this.getNodeProps()}>
                <Fragment>
                    {this.renderIndentIcons()}
                    {isLoading(node)
                        ? this.renderLoadingIcon()
                        : showExpanderIcon
                        ? this.renderExpanderIcon()
                        : null}
                    {showIcon ? this.renderIcon() : null}
                    {checkable ? this.renderCheckbox() : null}
                    {this.renderLabel()}
                    {this.renderExtIcons()}
                </Fragment>
            </div>
        );
    }

    render() {
        const { renderNode } = this.getTreeProps();
        const { node } = this.props;

        return renderNode
            ? renderNode(node, this.getNodeProps(), this)
            : this.renderNode();
    }
}
