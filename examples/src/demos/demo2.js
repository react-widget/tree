import React, { Component } from "react";
import TreeStore from "xtree-store";
import NilTree from "../../../src";
import data from "../data.json";

export default class DEMO extends Component {
    dataStore = {};

    constructor(props) {
        super(props);

        this.store = new TreeStore(data, {
            simpleData: true,
        });
    }

    loadData = node => {
        if (this.dataStore[node.id]) return this.dataStore[node.id];

        return new Promise(resolve => {
            const server = this.store;
            setTimeout(() => {
                const childs = server.getChildren(node.id);
                this.dataStore[node.id] = childs;
                resolve(childs);
            }, 500);
        });
    };

    render() {
        return <NilTree loadData={this.loadData} showIcon />;
    }
}
