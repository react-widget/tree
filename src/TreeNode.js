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

    // _shouldUpdate = false;

    getTree() {
        return this.context.tree;
    }
    getTreeProps() {
        const tree = this.getTree();
        return tree.props;
    }
    getTreeProp(prop, defaultValue) {
        const tree = this.getTree();
        const treeProps = tree.props;

        return prop in treeProps ? treeProps[prop] : defaultValue;
    }

    // componentDidMount() {
    //     // this.shouldUpdateTreeNode();
    // }

    // componentDidUpdate() {
    //     // this.shouldUpdateTreeNode();
    // }

    // shouldUpdateTreeNode() {
    //     if (this._shouldUpdate) {
    //         this._shouldUpdate = false;
    //         this.forceUpdate();
    //     }
    // }

    renderRootLoading() {
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

    renderNodeLoading() {
        return null;
    }

    renderNodeList(list) {
        const tree = this.getTree();
        const { node: pNode } = this.props;
        const options = this.getTreeProps();

        return list.map((data, i) => {
            const node = new Node(data, pNode, options);

            node.setExpanded(tree.isExpanded(node));
            node.setSelected(tree.isSelected(node));

            return <TreeNode node={node} key={node.id} />;
        });
    }

    renderChildNodes() {
        const tree = this.getTree();
        const { node, isRoot } = this.props;
        const { isLoading, childNodes } = this.state;
        const { loadData, asyncTestDelay } = this.getTreeProps();

        const Loader = isRoot
            ? this.renderRootLoading()
            : this.renderNodeLoading();

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

            const expanded = tree.isExpanded(node);

            node.loading = false;

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

                node.loading = true;

                this.setState({
                    isLoading: true,
                });
            }, asyncTestDelay);

            results.then(success).catch(fail);
        }

        return isAsync ? null : this.renderNodeList(results);
    }

    renderChildNodesWrapper() {
        const tree = this.getTree();
        const {
            prefixCls,
            maxDepth,
            childNodesWrapperComponent: ChildNodesWrapper,
        } = tree.props;
        const { node } = this.props;
        const leaf = tree.isLeaf(node);
        const shouldRender = !leaf && tree.isExpanded(node);

        if (shouldRender && node.relativeDepth >= maxDepth) {
            warning(false, `maximum depth: ${maxDepth}`);
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
        const tree = this.getTree();
        const {
            nodeItemWrapperComponent: NodeItemWrapperComponent,
        } = tree.props;
        const { node, isRoot } = this.props;

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
            wrapProps.node = node;
        }

        return (
            <NodeItemWrapperComponent {...wrapProps}>
                <NodeItem
                    node={node}
                    data={node.data}
                    // self={this}
                    // parentProps={parentProps}
                />
                {this.renderChildNodesWrapper()}
            </NodeItemWrapperComponent>
        );
    }
}
