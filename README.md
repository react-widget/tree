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
| prefixCls | 组件CSS样式前缀 | string | rw-tree |
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
| renderIndentIcons | 自定义缩进渲染函数 | function(node:Node, props, inst) => ReactNode | null |
| renderExpanderIcon | 自定义渲染函数 | function(node:Node, props, inst) => ReactNode | null |
| renderLoadingIcon | 自定义渲染函数 | function(node:Node, props, inst) => ReactNode | null |
| renderIcon | 自定义渲染函数 | function(node:Node, props, inst) => ReactNode | null |
| renderCheckbox | 自定义渲染函数 | function(node:Node, props, inst) => ReactNode | null |
| renderLabel | 自定义渲染函数 | function(node:Node, props, inst) => ReactNode | null |
| renderExtIcons | 自定义扩展图标函数 | function(node:Node, props, inst) => ReactNode | null |
| renderNode | 节点自定义渲染函数 | function(node:Node, props, inst) => ReactNode | null |
| onNodeClick | - | function(node, e, inst) | null |
| onNodeDoubleClick | - | function(node, e, inst) | null |
| onNodeContextMenu | - | function(node, e, inst) | null |
| onNodeMouseDown | - | function(node, e, inst) | null |
| onNodeMouseUp | - | function(node, e, inst) | null |
| onNodeMouseEnter | - | function(node, e, inst) | null |
| onNodeMouseLeave | - | function(node, e, inst) | null |
| onNodeMouseOver | - | function(node, e, inst) | null |
| onNodeMouseOut | - | function(node, e, inst) | null |
| onNodeMouseMove | - | function(node, e, inst) | null |

### Node props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 节点ID | any | - |
| label | 节点显示文本 | ReactNode | - |
| pid | 父节点 | any | - |
| leaf | 是否叶子节点 | boolean | - |
| cls | 节点样式 | boolean | - |
| iconCls | 节点icon样式 | boolean | - |
| relativeDepth | `readonly`节点相对当前组件所在深度 | number | - |
| expanded | 当前节点是否展开 | boolean | - |
| checked | 当前节点是否checked | boolean | - |
| loading | `readonly`当前节点是否加载中 | boolean | - |
| isRoot | `readonly`是否根节点 | boolean | - |

### 示例

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
