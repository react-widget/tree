# react-nil-tree

`npm install --save react-nil-tree`


## Tree属性

```
{
    prefixCls: 'nil-tree',
    className: '',
    rootId: null,
    loadingLabel: 'Loading...',
    loadingComponent: 'div',
    loadData: null,
    showIcon: true,
    showExpanderIcon: true,
    checkable: false,
    maxDepth: 50, //最大层级

    rootComponent: 'div',
    childNodesWrapperComponent: ChildNodesWrapper,
    nodeItemWrapperComponent: Fragment,
    //自定义
    renderIndentIcons: null,
    renderExpanderIcon: null,
    renderLoadingIcon: null,
    renderIcon: null,
    renderCheckbox: null,
    renderLabel: null,
    renderExtIcons: null,
    renderNode: null,
    //events
    onNodeClick: noop,
    onNodeDoubleClick: noop,
    onNodeContextMenu: noop,
    onNodeMouseDown: noop,
    onNodeMouseUp: noop,
    onNodeMouseEnter: noop,
    onNodeMouseLeave: noop,
    onNodeMouseOver: noop,
    onNodeMouseOut: noop,
    onNodeMouseMove: noop,
}
```

## Node属性

- id
- label 
- leaf
- pid 
- cls
- iconCls
- relativeDepth [readonly]
- expanded
- checked
- loading [readonly]
- isRoot  [readonly]

## 示例

```
import React, { Component } from 'react';
import TreeStore from 'xtree-store';
import NilTree from 'react-nil-tree';
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

```
