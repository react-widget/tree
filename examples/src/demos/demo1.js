import React, { Component } from 'react';
import TreeStore from 'xtree-store';
import NilTree from 'nil-tree';
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
        node.expanded = !node.expanded;
        node.checked = !node.checked;
        this.forceUpdate();
        //or
        // t.toggleExpand()
    }
    //checkable的选择状态需要通过回调设置checked
    render() {
        return (
            <NilTree
                onNodeClick={this.toggleExpand}
                loadData={this.loadData}
                showIcon
                checkable
            />
        );
    }

}
