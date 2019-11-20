import React, { Component } from "react";
import TreeStore from "xtree-store";
import NilTree from "../../../src";
import data from "../data.json";

export default class DEMO extends Component {
    constructor(props) {
        super(props);

        this.store = new TreeStore(data, {
            simpleData: true,
        });
    }

    loadData = node => {
        console.log(node);
        const store = this.store;
        return store.getChildren(node.id);
    };

    //checkable的选择状态需要通过回调设置checked
    render() {
        return <NilTree loadData={this.loadData} showIcon checkable />;
    }
}
