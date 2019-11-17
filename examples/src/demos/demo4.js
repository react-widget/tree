import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import TreeStore from "xtree-store";
import NilTree from "../../../src";
import data from "../data.json";

class childNodesWrapperComponent extends Component {
    _timer = null;

    componentDidMount() {
        if (this._timer) {
            clearTimeout(this._timer);
        }

        const dom = findDOMNode(this);
        if (dom) {
            dom.style.height = dom.scrollHeight + "px";

            this._timer = setTimeout(() => {
                dom.style.height = "auto";
                this._timer = null;
            }, 250);
        }
    }

    componentDidUpdate() {
        this.componentDidMount();
    }

    render() {
        const { children, expanded, ...others } = this.props;

        if (!expanded) return null;

        const childs = children();

        return !Array.isArray(childs) ? null : (
            <div
                {...others}
                style={{
                    transitionProperty: "all",
                    transitionDuration: "250ms",
                    transitionTimingFunction:
                        "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    height: 0,
                    overflow: "hidden",
                }}
            >
                {children()}
            </div>
        );
    }
}
/**
 * 通过自定义childNodesWrapperComponent属性来实现动画效果
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

    toggleExpand = (node, e, t) => {
        // node.expanded = !node.expanded;
        // this.forceUpdate();
        // or
        t.toggleExpand();
    };

    render() {
        return (
            <NilTree
                // onNodeClick={this.toggleExpand}
                loadData={this.loadData}
                showIcon
                childNodesWrapperComponent={childNodesWrapperComponent}
            />
        );
    }
}
