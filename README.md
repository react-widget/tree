# react-widget-tree

`npm install --save react-widget-tree`

## API

```html
<Tree 
loadData={loadData}
>
</Tree>
```

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 组件CSS样式前缀 | string | rw-listbox |
| className | 组件className属性 | string | - |
| style | 组件style属性 | React.CSSProperties | - |
| rootId | 根节点ID | any | null |
| loadingLabel | 数据加载中提示文本 | ReactNode | - |
| loadingComponent | 数据加载组建类 | ReactElement | div |
| loadData | 数据装载方法, 该方法接收当前节点数据对象 | function(node:Node) => Promise\|Array<Node> | - |
| showIcon | 是否显示图标 | boolean | true |
| showExpanderIcon | 是否显示展开/收起图标 | boolean | true |
| checkable | 是否显示复选图标 | boolean | true |
| maxDepth | 树形最大深度 | number | 50 |
| rootComponent | 树形组建根节点类 | ReactElement | div |
| childNodesWrapperComponent | 子节点列表容器组件类 | ReactElement | ChildNodesWrapper |
| nodeItemWrapperComponent | 节点容器组件类 | ReactElement | Fragment |
| renderIndentIcons | 自定义渲染函数 | function | null |
| renderExpanderIcon | 自定义渲染函数 | function | null |
| renderLoadingIcon | 自定义渲染函数 | function | null |
| renderIcon | 自定义渲染函数 | function | null |
| renderCheckbox | 自定义渲染函数 | function | null |
| renderLabel | 自定义渲染函数 | function | null |
| renderExtIcons | 自定义渲染函数 | function | null |
| renderNode | 自定义渲染函数 | function | null |
| onNodeClick |  | function | null |
| onNodeDoubleClick |  | function | null |
| onNodeContextMenu |  | function | null |
| onNodeMouseDown |  | function | null |
| onNodeMouseUp |  | function | null |
| onNodeMouseEnter |  | function | null |
| onNodeMouseLeave |  | function | null |
| onNodeMouseOver |  | function | null |
| onNodeMouseOut |  | function | null |
| onNodeMouseMove |  | function | null |

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
import RWTree from 'react-widget-tree';
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
            <RWTree
                onNodeClick={this.toggleExpand}
                loadData={this.loadData}
                showIcon
                checkable
            />
        );
    }

}

```
