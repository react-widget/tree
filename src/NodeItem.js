import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isLoading, isLeaf, isExpanded, arrayFill } from './utils';

export default class NodeItem extends Component {

    static propTypes = {
        parentProps: PropTypes.object,
        self: PropTypes.object,
        node: PropTypes.object,
    };

    static defaultProps = {};

    renderLoadingNode() {
        const { prefixCls, loadingText } = this.props.parentProps;

        if (!loadingText) return null;

        return (
            <div className={`${prefixCls}-loading-wrapper`}>{loadingText}</div>
        );
    }

    renderIndentIcons() {
        const { parentProps, node } = this.props;
        const { renderIndentIcons, prefixCls } = parentProps;
        const relativeDepth = node.relativeDepth - 1;

        if (relativeDepth <= 0) return null;

        if (renderIndentIcons) return renderIndentIcons(node);

        const indents = arrayFill(Array(relativeDepth), 0);

        return indents.map((v, i) => <span key={i} className={`${prefixCls}-indent`} />);
    }

    renderExpanderIcon() {
        const { parentProps, node } = this.props;
        const { renderExpanderIcon, prefixCls } = parentProps;

        const leaf = isLeaf(node);
        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-expander-icon`]: !leaf,
            open: !leaf && isExpanded(node),
            [`${prefixCls}-indent`]: leaf,
        });

        const expanderProps = {
            className: classes,
        };

        if (renderExpanderIcon) return renderExpanderIcon(node, expanderProps, this);

        return <span {...expanderProps} />;
    }

    renderLoadingIcon() {
        const { parentProps, node } = this.props;
        const { renderLoadingIcon, prefixCls } = parentProps;

        if (renderLoadingIcon) return renderLoadingIcon(node, this);

        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-loading-icon`]: true,
        });

        return <span className={classes} />;
    }

    renderIcon() {
        const { parentProps, node } = this.props;
        const { renderIcon, prefixCls } = parentProps;

        if (renderIcon) return renderIcon(node, this);

        const leaf = isLeaf(node);
        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-icon-parent`]: !leaf,
            [`${prefixCls}-icon-leaf`]: leaf,
            [node.iconCls]: node.iconCls,
        });

        return <span className={classes} />;
    }

    renderCheckbox() {
        const { parentProps, node } = this.props;
        const { renderCheckbox, prefixCls } = parentProps;

        if (renderCheckbox) return renderCheckbox(node, this);

        const classes = classNames({
            [`${prefixCls}-icon`]: true,
            [`${prefixCls}-icon-checkbox`]: true,
            checked: !!node.checked,
        });

        return <span className={classes} />;
    }

    renderLabel() {
        const { parentProps, node } = this.props;
        const { renderLabel, prefixCls } = parentProps;

        const labelProps = {
            className: `${prefixCls}-label`,
        };

        if (renderLabel) return renderLabel(node, labelProps, this);

        return <div {...labelProps}>{node.label}</div>
    }

    renderExtIcons() {
        const { parentProps, node } = this.props;
        const { renderExtIcons, prefixCls } = parentProps;

        if (renderExtIcons) return renderExtIcons(node, this);
    }

    render() {
        const { node, parentProps, self } = this.props;

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
            className: classNames({
                [`${prefixCls}-item-wrapper`]: true,
                [node.cls]: node.cls,
                [`${prefixCls}-item-expanded`]: isExpanded(node),
            }),
            onClick: e => {
                onNodeClick(node, e, self);
            },
            onDoubleClick: e => {
                onNodeDoubleClick(node, e, self);
            },
            onContextMenu: e => {
                onNodeContextMenu(node, e, self);
            },
            onMouseDown: e => {
                onNodeMouseDown(node, e, self);
            },
            onMouseUp: e => {
                onNodeMouseUp(node, e, self);
            },
            onMouseEnter: e => {
                onNodeMouseEnter(node, e, self);
            },
            onMouseLeave: e => {
                onNodeMouseLeave(node, e, self);
            },
            onMouseOver: e => {
                onNodeMouseOver(node, e, self);
            },
            onMouseOut: e => {
                onNodeMouseOut(node, e, self);
            },
            onMouseMove: e => {
                onNodeMouseMove(node, e, self);
            }
        };

        return renderNode ?
            renderNode(node, nodeProps, this) :
            <div
                {...nodeProps}
            >
                <Fragment>
                    {this.renderIndentIcons()}
                    {isLoading(node) ? this.renderLoadingIcon() : this.renderExpanderIcon()}
                    {showIcon ? this.renderIcon() : null}
                    {checkable ? this.renderCheckbox() : null}
                    {this.renderLabel()}
                    {this.renderExtIcons()}
                </Fragment>
            </div>;
    }

}