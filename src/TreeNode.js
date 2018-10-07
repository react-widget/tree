import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {isPromiseLike, arrayFill} from './utils';

export default class TreeNode extends Component{
	
	static propTypes = {
		parentProps: PropTypes.object,	
		node: PropTypes.object,	
		isRoot: PropTypes.bool,	
	};
	
	static defaultProps = {
		parentProps: null,
		node: null,
		isRoot: false,
	};
	
	state = {
		childNodes: null,	
	};
	
	renderLoadingNode(){
		const {prefixCls, loadingText} = this.props.parentProps;
		
		if( !loadingText ) return null;
		
		return (
			<div className={`${prefixCls}-loading-wrapper`}>{loadingText}</div>
		);
	}	
	
	renderIndentIcons(){
		const {parentProps, node} = this.props;
		const {renderIndentIcons, prefixCls} = parentProps;
		const depth = node.depth - 1;
		
		if( depth <= 0 ) return null; 
 		
		if( renderIndentIcons ) return renderIndentIcons(node);
		
		const indents = arrayFill(Array(depth), 0);
		
		return indents.map( (v , i)=> <span key={i} className={`${prefixCls}-indent`} /> );
	}
	
	renderExpanderIcon(){
		const {parentProps, node} = this.props;
		const {renderExpanderIcon, prefixCls} = parentProps;
		
		const isLeaf = this.isLeaf(node);
		const classes = classNames({
			[`${prefixCls}-icon`]: true,
			[`${prefixCls}-expander-icon`]: !isLeaf,
			open:!isLeaf && this.isExpanded( node ),
			[`${prefixCls}-indent`]: isLeaf,
		});
		
		const expanderProps = {
			className: classes,
			onClick: e => {
				this.toggleExpand();
			}
		};
		
		if( renderExpanderIcon ) return renderExpanderIcon(node, expanderProps, this);
		
		return <span {...expanderProps}/>;
	}
	
	renderLoadingIcon(){
		const {parentProps, node} = this.props;
		const {renderLoadingIcon, prefixCls} = parentProps;	
		
		if( renderLoadingIcon ) return renderLoadingIcon(node, this);
		
		const classes = classNames({
			[`${prefixCls}-icon`]: true,
			[`${prefixCls}-loading-icon`]: true,
		});
		
		return <span className={classes} />;
	}
	
	renderIcon(){
		const {parentProps, node} = this.props;
		const {renderIcon, prefixCls} = parentProps;	
		
		if( renderIcon ) return renderIcon(node, this);
		
		const isLeaf = this.isLeaf(node);
		const classes = classNames({
			[`${prefixCls}-icon`]: true,
			[`${prefixCls}-icon-parent`]: !isLeaf,
			[`${prefixCls}-icon-leaf`]: isLeaf,
			[node.iconCls]: node.iconCls,
		});
		
		return <span className={classes}/>;
	}
	
	renderCheckbox(){
		const {parentProps, node} = this.props;
		const {renderCheckbox, prefixCls} = parentProps;	
		
		if( renderCheckbox ) return renderCheckbox(node, this);

		const classes = classNames({
			[`${prefixCls}-icon`]: true,
			[`${prefixCls}-icon-checkbox`]: true,
			checked: !!node.checked,
		});
		
		return <span className={classes}/>;
	}
	
	renderLabel(){
		const {parentProps, node} = this.props;
		const {renderLabel, prefixCls, onSelect} = parentProps;	
		
		const labelProps = {
			className: `${prefixCls}-label`,
		};
		
		if( renderLabel ) return renderLabel(node, labelProps, this);	
		
		return <div {...labelProps}>{node.label}</div>
	}
	
	renderExtIcons(){
		const {parentProps, node} = this.props;
		const {renderExtIcons, prefixCls} = parentProps;	
		
		if( renderExtIcons ) return renderExtIcons(node, this);		
	}
	
	renderChildNodes(){
		const {node, parentProps} = this.props;
		const {prefixCls, loadData} = parentProps;
		const childNodes = this.state.childNodes;
		
		if( childNodes ) {
			return this.renderNodeList(childNodes);
		};
		
		const success = childNodes=>{
			if( !node.expanded ) return;
			node.loading = false;
			this.setState({
				childNodes,
			}, () => {
				this.state.childNodes = null;	
			})
		};
		const fail = () => {
			success(null);	
		};
		
		let async = false;
		const results = loadData(node);
		if( isPromiseLike( results ) ) {
			async = true;
			node.loading = true;	
			
			results
				.then(success)
				.catch(fail);
			
		} else {
			node.loading = false;		
		}
		
		return async ? this.renderLoadingNode() : this.renderNodeList(results);
	}
	
	renderNodeList(NodeList){
		const {parentProps, node: pNode} = this.props;
		const {loadData} = parentProps;
		
		return NodeList.map( (node, i) => {
			node.depth = pNode.depth + 1;
			return <TreeNode parentProps={parentProps} node={node} key={node.id == null ? i : node.id} />	
		} );
	}
	
	isExpanded(node){
		return !!node.expanded;	
	}
	
	isLeaf(node){
		return !!node.leaf;	
	}
	
	isLoading(node){
		return node.loading;	
	}
	
	toggleExpand = () => {
		const {node} = this.props;
		if( this.isLoading( node ) ) return;
		node.expanded = !node.expanded;
		this.forceUpdate();
	}
	
	renderChildWrapper(){
		const {node, parentProps} = this.props;
		const {prefixCls, childWrapperComponent: ChildWrapper} = parentProps;
		const shouldRender = !this.isLeaf(node) && this.isExpanded(node);
		
		return shouldRender ? (
				<ChildWrapper className={`${prefixCls}-child-wrapper`}>
					{this.renderChildNodes()}
				</ChildWrapper>
			) : null
	}
	
	renderNode(){
		const {node, parentProps} = this.props;	
		const {
			prefixCls, 
			renderNode,
			showIcon,
			checkable,
			onNodeClick,
			onNodeDoubleClick,
			onNodeContextMenu,
			onNodeMouseDown,
			onNodeMouseUp,
			onNodeMouseEnter,
			onNodeMouseLeave,
			onNodeMouseOver, 
			onNodeMouseOut,
			onNodeMouseMove,
		} = parentProps;
		
		const nodeProps = {
			className: classNames(`${prefixCls}-item-wrapper`, {
				[node.cls]: node.cls,
				[`${prefixCls}-item-expanded`]: this.isExpanded(node),
			}),
			onClick: e => {
				onNodeClick(node, e, this);	
			},
			onDoubleClick: e => {
				onNodeDoubleClick(node, e, this);	
			},
			onContextMenu: e => {
				onNodeContextMenu(node, e, this);	
			},
			onMouseDown: e => {
				onNodeMouseDown(node, e, this);	
			},
			onMouseUp: e => {
				onNodeMouseUp(node, e, this);	
			},
			onMouseEnter: e => {
				onNodeMouseEnter(node, e, this);	
			},
			onMouseLeave: e => {
				onNodeMouseLeave(node, e, this);	
			},
			onMouseOver: e => {
				onNodeMouseOver(node, e, this);	
			},
			onMouseOut: e => {
				onNodeMouseOut(node, e, this);	
			},
			onMouseMove: e => {
				onNodeMouseMove(node, e, this);		
			}
		};
		
		return (
			<div 
				{...nodeProps}
			>
				{
					renderNode ? 
						renderNode(node, nodeProps, this) :
						<Fragment>
							{this.renderIndentIcons()}
							{this.isLoading(node) ? this.renderLoadingIcon() : this.renderExpanderIcon()}
							{showIcon ? this.renderIcon() : null}
							{checkable ? this.renderCheckbox() : null}
							{this.renderLabel()}
							{this.renderExtIcons()}
						</Fragment>
				}
			</div>
		);
	}
	
	render(){
		const {node, isRoot, parentProps} = this.props;
		const {prefixCls} = parentProps;
		
		if(isRoot) {
			return this.renderChildNodes();	
		}
		
		const childWrappeer = this.renderChildWrapper();
		
		return (
			<div className={`${prefixCls}-item`}>
				{this.renderNode()}
				{this.isLoading(node) ? null : childWrappeer}
			</div>
		);	
	}	
}