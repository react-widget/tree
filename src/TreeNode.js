import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import warning from "warning";
import { isPromiseLike } from "./utils";
import TreeContext from "./TreeContext";
import Node from "./Node";
import NodeItem from "./NodeItem";

class TreeNode extends Component {
    static contextType = TreeContext;

    state = {
        isLoading: false,
        childNodes: null,
    };

    getTree() {
        return this.context.tree;
    }
    getTreeProps() {
        const tree = this.getTree();
        return tree.props;
    }

    renderRootLoading() {
        const { rootLoadingComponent: LoadingComponent } = this.getTreeProps();

        if (!LoadingComponent) return null;

        return <LoadingComponent />;
    }

    renderNodeLoading() {
        const { nodeLoadingComponent: LoadingComponent } = this.getTreeProps();

        if (!LoadingComponent) return null;

        return <LoadingComponent />;
    }

    renderNodeList(list) {
        const tree = this.getTree();
        const { node: pNode } = this.props;
        const options = this.getTreeProps();
        const state = tree.state;

        return list.map((data, i) => {
            const node = new Node(data, pNode, options, state);

            return <TreeNode node={node} key={node.getId()} />;
        });
    }

    renderChildNodes() {
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

            const expanded = node.isExpanded();

            node.setLoading(false);

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

                node.setLoading(true);

                this.setState({
                    isLoading: true,
                });
            }, asyncTestDelay);

            results.then(success).catch(fail);
        }

        return isAsync ? null : this.renderNodeList(results);
    }

    renderChildNodesWrapper() {
        const {
            prefixCls,
            maxDepth,
            childNodesWrapperComponent: ChildNodesWrapper,
        } = this.getTreeProps();
        const { node } = this.props;
        const leaf = node.isLeaf();
        const shouldRender = !leaf && node.isExpanded();

        if (shouldRender && node.getDepth() >= maxDepth) {
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
        const {
            nodeItemWrapperComponent: NodeItemWrapperComponent,
        } = this.getTreeProps();
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

        const props = {};

        if (NodeItemWrapperComponent !== Fragment) {
            props.node = node;
        }

        return (
            <NodeItemWrapperComponent {...props}>
                <NodeItem node={node} data={node.getData()} />
                {this.renderChildNodesWrapper()}
            </NodeItemWrapperComponent>
        );
    }
}

TreeNode.propTypes = {
    node: PropTypes.object,
    isRoot: PropTypes.bool,
};

TreeNode.defaultProps = {
    node: null,
    isRoot: false,
};

export default TreeNode;
