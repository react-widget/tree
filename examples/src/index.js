import React from 'react'
import ReactDOM from 'react-dom';

import server from './store';

import  '../../src/style/index.scss';
import Tree from '../../src';

const TreeStore = new Map();

function loadData(pNode){
	//cache
	if( TreeStore.has( pNode.id ) ) {
		return TreeStore.get(pNode.id);
	}
	
	//模拟请求
	return new Promise(resolve => {
		setTimeout( () => {
			let nodes = [];
			if( pNode.root ) {
				nodes = server.getChildren();
			} else {
				nodes = server.getChildren(pNode.id)		
			}
			
			nodes = nodes.map( id=> {
				const node = server.getNode(id);
				return {
					id: node.label,
					label: node.label,
					leaf: server.isLeaf(id)
				}	
			} );
			
			nodes.sort( (a, b) => {
				const av = a.leaf ? 1 : 2;
				const bv = b.leaf ? 1: 2;
				
				return av - bv;	
			} );
			
			TreeStore.set(pNode.id, nodes);
			
			resolve( nodes )
				
			
		}, 300 );
	});
}
//双击展开
function toggleExpand(node, e, target){
	target.toggleExpand()	
}

function STree(props){
	return (
		<Tree 
			onNodeDoubleClick={toggleExpand}
			loadData={loadData} 
			showIcon
		/>
	);	
}

ReactDOM.render(<div>
    <STree />
</div>, demo);