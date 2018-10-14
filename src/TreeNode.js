import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import { isPromiseLike, isLeaf, isLoading, isExpanded } from './utils';
import NodeItem from './NodeItem';

export default class TreeNode extends Component {

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
        childNodes: null,
    };

    //deleted
    toggleExpand = () => {
        const { node } = this.props;
        if (isLoading(node)) return;
        node.expanded = !node.expanded;
        this.forceUpdate();
    }

    renderLoadingNode() {
        const { prefixCls, loadingText } = this.props.parentProps;

        if (!loadingText) return null;

        return (
            <div className={`${prefixCls}-loading-wrapper`}>{loadingText}</div>
        );
    }

    renderNodeList(NodeList) {
        const { parentProps, node: pNode } = this.props;

        return NodeList.map((node, i) => {
            node.relativeDepth = pNode.relativeDepth + 1;
            return <TreeNode parentProps={parentProps} node={node} key={node.id == null ? i : node.id} />
        });
    }

    renderChildNodes() {
        const { node, parentProps, isRoot } = this.props;
        const { loadData } = parentProps;
        const childNodes = this.state.childNodes;

        const Loader = isRoot ? this.renderLoadingNode() : null;

        if (isLoading(node)) return Loader;

        if (childNodes) {
            return this.renderNodeList(childNodes);
        };

        const success = childNodes => {
            node.loading = false;
            const expanded = isExpanded(node);
            this.setState({
                childNodes: expanded ? childNodes : null,
            }, () => {
                if (expanded)
                    this.state.childNodes = null;
            })
        };
        const fail = () => {
            success(null);
        };

        let async = false;
        const results = loadData(node);
        if (isPromiseLike(results)) {
            async = true;
            node.loading = true;

            this.forceUpdate();

            results
                .then(success)
                .catch(fail);

        } else {
            node.loading = false;
        }

        return async ?
            Loader :
            this.renderNodeList(results);
    }

    renderChildNodesWrapper() {
        const { node, parentProps } = this.props;
        const { prefixCls, childNodesWrapperComponent: ChildNodesWrapper } = parentProps;
        const leaf = isLeaf(node);
        const shouldRender = !leaf && isExpanded(node);

        if (shouldRender && node.relativeDepth >= parentProps.maxDepth) {
            warning(false, `maximum depth: ${parentProps.maxDepth}`);
            return null;
        }

        return leaf ?
            null :
            <ChildNodesWrapper expanded={shouldRender} className={`${prefixCls}-child-wrapper`}>
                {() => this.renderChildNodes()}
            </ChildNodesWrapper>
            ;
    }

    render() {
        const { node, isRoot, parentProps } = this.props;
        const { prefixCls, nodeItemWrapperComponent: NodeItemWrapperComponent } = parentProps;

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
            })
        }

        return (
            <NodeItemWrapperComponent {...wrapProps}>
                <NodeItem node={node} self={this} parentProps={parentProps} />
                {this.renderChildNodesWrapper()}
            </NodeItemWrapperComponent>
        );
    }
}