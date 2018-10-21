import React, { Component } from 'react';
import TreeStore from 'xtree-store';
import NilTree from 'nil-tree';
import classnames from 'classnames';
import data from '../data.json';

export default class DEMO extends Component {

    constructor(props) {
        super(props);

        this.store = new TreeStore(data, {
            simpleData: true
        });

    }

    loadData = node => {
        const store = this.store;
        return store.getChildren(node.id);
    }

    toggleExpand = (node, e, t) => {
        // node.expanded = !node.expanded;
        // this.forceUpdate();
        //or
        t.toggleExpand()
    }

    renderIndentIcons = (node, props, item) => {
        const store = this.store;
        const pIds = store.getParentIds(node.id);

        return pIds.map((pId, i) => {
            const isLastChild = store.isLastChild(pId);
            const classes = classnames({
                [props.className]: true,
                'nil-tree-empty': isLastChild,
                'nil-tree-line': !isLastChild,
            });

            return <span {...props} className={classes} key={i} />;
        });
    }

    renderExpanderIcon = (node, props, item) => {
        const store = this.store;
        const isLastChild = store.isLastChild(node.id);

        const leaf = node.leaf;
        const classes = classnames({
            [props.className]: true,
            'nil-tree-expander-end': !leaf && isLastChild,
            'nil-tree-expander': !leaf && !isLastChild,
            'nil-tree-elbow-end': leaf && isLastChild,
            'nil-tree-elbow': leaf && !isLastChild,
        });

        return <span {...props} className={classes} />;
    }

    render() {
        return (
            <NilTree
                onNodeClick={this.toggleExpand}
                renderIndentIcons={this.renderIndentIcons}
                renderExpanderIcon={this.renderExpanderIcon}
                loadData={this.loadData}
                showIcon
            />
        );
    }

}
