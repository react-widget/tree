import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { arrayFill, closest } from "./utils";
import TreeContext from "./TreeContext";

class NodeItem extends Component {
    static contextType = TreeContext;

    getTree() {
        return this.context.tree;
    }

    getTreeProps() {
        const tree = this.getTree();
        return tree.props;
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

        const depth = node.getDepth() - 1;

        if (depth <= 0) return null;

        const props = {
            className: `${prefixCls}-indent`,
        };

        if (renderIndentIcons) {
            return renderIndentIcons({
                data,
                node,
                props,
                component: this,
            });
        }

        const indents = arrayFill(Array(depth), 0);

        return indents.map((v, i) => <div {...props} key={i} />);
    }

    renderExpanderIcon() {
        const { prefixCls, renderExpanderIcon } = this.getTreeProps();
        const { node, data } = this.props;

        const leaf = node.isLeaf();
        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-expander-icon`]: !leaf,
            open: !leaf && node.isExpanded(),
            [`${prefixCls}-indent`]: leaf,
        });

        const props = {
            className: classes,
        };

        if (renderExpanderIcon) {
            return renderExpanderIcon({
                data,
                node,
                props,
                component: this,
            });
        }

        return <div {...props} />;
    }

    renderLoadingIcon() {
        const { prefixCls, renderLoadingIcon } = this.getTreeProps();
        const { node, data } = this.props;

        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-loading-icon`]: true,
        });

        const props = {
            className: classes,
        };

        if (renderLoadingIcon) {
            return renderLoadingIcon({
                data,
                node,
                props,
                component: this,
            });
        }

        return <div {...props} />;
    }

    renderIcon() {
        const { prefixCls, renderIcon } = this.getTreeProps();
        const { node, data } = this.props;

        const leaf = node.isLeaf();
        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-icon-parent`]: !leaf,
            [`${prefixCls}-icon-leaf`]: leaf,
            [data.iconCls]: data.iconCls,
        });

        const props = {
            className: classes,
        };

        if (renderIcon) {
            return renderIcon({
                data,
                node,
                props,
                component: this,
            });
        }

        return <div {...props} />;
    }

    renderCheckbox() {
        const { prefixCls, renderCheckbox } = this.getTreeProps();
        const { node, data } = this.props;

        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            // [`${prefixCls}-icon-checkbox`]: true,
            // checked: !!node.checked,
        });

        const props = {
            className: classes,
        };

        if (renderCheckbox) {
            return renderCheckbox({
                data,
                node,
                props,
                component: this,
            });
        }

        return null;
        // return <div {...props} />;
    }

    renderLabel() {
        const { prefixCls, labelField, renderLabel } = this.getTreeProps();
        const { node, data } = this.props;

        const props = {
            className: `${prefixCls}-label`,
        };

        if (renderLabel) {
            return renderLabel({
                data,
                node,
                props,
                component: this,
            });
        }

        return <div {...props}>{data[labelField]}</div>;
    }

    renderExtIcons() {
        const { renderExtIcons } = this.getTreeProps();
        const { node, data } = this.props;

        if (renderExtIcons) {
            return renderExtIcons({
                data,
                node,
                props: {},
                component: this,
            });
        }

        return null;
    }

    handleNodeClick = e => {
        const tree = this.getTree();
        const treeProps = tree.props;
        const { node, data } = this.props;
        const {
            prefixCls,
            multiple,
            singleExpand,
            selectable,
            unselectable,
            onSelect,
            onExpand,
            onNodeClick,
        } = treeProps;

        const id = node.getId();

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
        let newExpandedKeys = [...expandedKeys];
        const idx = newExpandedKeys.indexOf(id);
        const isExpanded = idx !== -1;
        const sIdx = selectedKeys.indexOf(id);
        const isSelected = sIdx !== -1;

        if (!isSelected && selectable) {
            newSelectedKeys = multiple ? [...selectedKeys, id] : [id];

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
                if (singleExpand) {
                    newExpandedKeys = newExpandedKeys.filter(id => {
                        const sNode = tree.getNode(id);
                        if (!sNode) return true;
                        return sNode.getDepth() !== node.getDepth();
                    });
                }

                newExpandedKeys.push(id);
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

        if (isExpanderClick && onExpand) {
            onExpand(newExpandedKeys, {
                event: e,
                node: data,
                expanded: !isExpanded,
            });
        }

        if (onNodeClick) {
            onNodeClick({
                event: e,
                node: data,
            });
        }
    };

    getNodeProps() {
        const tree = this.getTree();
        const { node, data } = this.props;

        const {
            prefixCls,
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
                [`${prefixCls}-item-selected`]: node.isSelected(),
                [`${prefixCls}-item-expanded`]: node.isExpanded(),
                [data.cls]: data.cls,
            }),
            onClick: this.handleNodeClick,
            onDoubleClick: event => {
                onNodeDoubleClick({
                    event,
                    node,
                    data,
                });
            },
            onContextMenu: event => {
                onNodeContextMenu({
                    event,
                    node,
                    data,
                });
            },
            onMouseDown: event => {
                onNodeMouseDown({
                    event,
                    node,
                    data,
                });
            },
            onMouseUp: event => {
                onNodeMouseUp({
                    event,
                    node,
                    data,
                });
            },
            onMouseEnter: event => {
                onNodeMouseEnter({
                    event,
                    node,
                    data,
                });
            },
            onMouseLeave: event => {
                onNodeMouseLeave({
                    event,
                    node,
                    data,
                });
            },
            onMouseOver: event => {
                onNodeMouseOver({
                    event,
                    node,
                    data,
                });
            },
            onMouseOut: event => {
                onNodeMouseOut({
                    event,
                    node,
                    data,
                });
            },
            onMouseMove: event => {
                onNodeMouseMove({
                    event,
                    node,
                    data,
                });
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
                    {node.isLoading()
                        ? this.renderLoadingIcon()
                        : // : showExpanderIcon
                          // ? this.renderExpanderIcon() : null
                          this.renderExpanderIcon()}
                    {showIcon ? this.renderIcon() : null}
                    {this.renderCheckbox()}
                    {this.renderLabel()}
                    {this.renderExtIcons()}
                </Fragment>
            </div>
        );
    }

    render() {
        const { renderNode } = this.getTreeProps();
        const { node, data } = this.props;

        return renderNode
            ? renderNode({
                  node,
                  data,
                  props: this.getNodeProps(),
                  component: this,
              })
            : this.renderNode();
    }
}

NodeItem.propTypes = {
    node: PropTypes.object,
    data: PropTypes.object,
};

NodeItem.defaultProps = {};

export default NodeItem;
