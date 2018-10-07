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

    toggleExpand = () => {

    }

    render() {
        return (
            <NilTree
                onNodeDoubleClick={this.toggleExpand}
                loadData={this.loadData}
                showIcon
            />
        );
    }

}
