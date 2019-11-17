import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import warning from "warning";
import { isPromiseLike, isLeaf, isLoading, isExpanded } from "./utils";
import TreeContext from "./TreeContext";
import Node from "./Node";
import NodeItem from "./NodeItem";

export default class TreeNode extends Component {
    static contextType = TreeContext;

    static propTypes = {
        parentProps: PropTypes.object,
        node: PropTypes.object,
        isRoot: PropTypes.bool,
    };

    static defaultProps = {
        parentProps: null,
        node: null,
        isRoot: false,
    };

    state = {
        isLoading: false,
        childNodes: null,
    };

    _shouldUpdate = false;

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

    componentDidMount() {
        // this.shouldUpdateTreeNode();
    }

    componentDidUpdate() {
        // this.shouldUpdateTreeNode();
    }

    shouldUpdateTreeNode() {
        if (this._shouldUpdate) {
            this._shouldUpdate = false;
            this.forceUpdate();
        }
    }

    //deleted
    toggleExpand = () => {
        const { node } = this.props;
        if (isLoading(node)) return;
        node.expanded = !node.expanded;
        this.forceUpdate();
    };

    renderLoadingNode() {
        const {
            prefixCls,
            loadingLabel,
            loadingComponent: LoadingComponent,
        } = this.props.parentProps;

        if (!loadingLabel) return null;

        return (
            <LoadingComponent className={`${prefixCls}-loading-wrapper`}>
                {loadingLabel}
            </LoadingComponent>
        );
    }

    renderNodeList(list) {
        // const tree = this.getTree();
        const { parentProps, node: pNode } = this.props;
        const options = this.getTreeProps();

        return list.map((data, i) => {
            const node = new Node(data, pNode, options);

            // node.setExpanded(tree.isExpanded(node));
            // node.setSelected(tree.isSelected(node));

            return (
                <TreeNode parentProps={parentProps} node={node} key={node.id} />
            );
        });
    }

    renderChildNodes() {
        const { node, isRoot } = this.props;
        const { isLoading, childNodes } = this.state;
        const { loadData, asyncTestDelay } = this.getTreeProps();

        const Loader = isRoot ? this.renderLoadingNode() : null;

        if (isLoading) return Loader;

        if (childNodes) {
            return this.renderNodeList(childNodes);
        }

        let asyncTimer = null;

        const success = childNodes => {
            if (asyncTimer) {
                clearTimeout(asyncTimer);
                asyncTimer = null;
            }

            // this._shouldUpdate = false;

            const expanded = isExpanded(node);

            // node.loading = false;

            this.setState(
                {
                    isLoading: false,
                    childNodes: expanded ? childNodes : null,
                },
                () => {
                    if (expanded) {
                        // eslint-disable-next-line
                        this.state.childNodes = null;
                    }
                }
            );
        };
        const fail = () => {
            success([]);
        };

        let isAsync = false;

        const results = loadData(node);

        if (isPromiseLike(results)) {
            isAsync = true;

            asyncTimer = setTimeout(() => {
                asyncTimer = null;
                this.setState({
                    isLoading: true,
                });
            }, asyncTestDelay);

            results.then(success).catch(fail);
        }

        return isAsync ? null : this.renderNodeList(results);
    }

    renderChildNodesWrapper() {
        const { node, parentProps } = this.props;
        const {
            prefixCls,
            childNodesWrapperComponent: ChildNodesWrapper,
        } = parentProps;
        const leaf = isLeaf(node);
        const shouldRender = !leaf && isExpanded(node);

        if (shouldRender && node.relativeDepth >= parentProps.maxDepth) {
            warning(false, `maximum depth: ${parentProps.maxDepth}`);
            return null;
        }

        return leaf ? null : (
            <ChildNodesWrapper
                expanded={shouldRender}
                node={node}
                className={`${prefixCls}-child-wrapper`}
            >
                {() => this.renderChildNodes()}
            </ChildNodesWrapper>
        );
    }

    render() {
        const { node, isRoot, parentProps } = this.props;
        const {
            nodeItemWrapperComponent: NodeItemWrapperComponent,
        } = parentProps;

        if (isRoot) {
            return this.renderChildNodes();
        }

        // return (
        //     <div className={`${prefixCls}-item`}>
        //         <NodeItem node={node} self={this} parentProps={parentProps} />
        //         {this.renderChildNodesWrapper()}
        //     </div>
        // );

        const wrapProps = {};

        if (NodeItemWrapperComponent !== Fragment) {
            Object.assign(wrapProps, {
                node,
            });
        }

        return (
            <NodeItemWrapperComponent {...wrapProps}>
                <NodeItem
                    node={node}
                    data={node.data}
                    self={this}
                    parentProps={parentProps}
                />
                {this.renderChildNodesWrapper()}
            </NodeItemWrapperComponent>
        );
    }
}
