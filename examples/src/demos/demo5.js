import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import TreeStore from "xtree-store";
import NilTree from "../../../src";
import data from "../data.json";

/**
 * 需要自定义的属性：
 * 		rootComponent, renderNode
 */
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

    renderNodeRow = ({ node, props, component: me }) => {
        const { showIcon, showExpanderIcon, checkable } = me.getTreeProps();

        return (
            <tr>
                <td>
                    <div {...me.getNodeProps()}>
                        {me.renderIndentIcons()}
                        {node.loading
                            ? me.renderLoadingIcon()
                            : showExpanderIcon
                            ? me.renderExpanderIcon()
                            : null}
                        {showIcon ? me.renderIcon() : null}
                        {checkable ? me.renderCheckbox() : null}
                        {me.renderLabel()}
                        {me.renderExtIcons()}
                    </div>
                </td>
                <td align="center">{node.id}</td>
                <td align="center">{node.relativeDepth}</td>
                <td align="center">{node.leaf ? "叶子" : "父级"}</td>
            </tr>
        );
    };

    render() {
        return (
            <table className="table-tree" borderspacing="0">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th width={100} align="center">
                            ID
                        </th>
                        <th width={100} align="center">
                            层级
                        </th>
                        <th width={100} align="center">
                            类型
                        </th>
                    </tr>
                </thead>
                <NilTree
                    loadData={this.loadData}
                    rootComponent="tbody"
                    loadingComponent={props => (
                        <tr>
                            <td colSpan={4} {...props}></td>
                        </tr>
                    )}
                    renderNode={this.renderNodeRow}
                />
            </table>
        );
    }
}
