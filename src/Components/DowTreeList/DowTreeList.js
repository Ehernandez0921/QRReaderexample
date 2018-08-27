import React, { Component } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

export default class extends Component {
    loop = data => data.map((item) => {
        if (item.children && item.children.length) {
            return <TreeNode {...item} key={item.key} title={item.title} dataRef={item}>{this.loop(item.children)}</TreeNode>;
        }
        return <TreeNode {...item} key={item.key} title={item.title} dataRef={item} />;
    });
    render() {
        return (
            <Tree
                loadData={this.props.onLoadData?this.props.onLoadData:null}
                showLine
                draggable
                // onSelect={this.props.onSelect}
                {...this.props.treeOptions}
            >
                {this.props.data && this.loop(this.props.data)}
            </Tree>
        )
    };
}