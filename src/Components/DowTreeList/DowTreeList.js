import React,{Component}from 'react';
import {Tree} from 'antd';

const {TreeNode} = Tree;

export default class extends Component{
    loop = data => data.map((item) => {
        if (item.children && item.children.length) {
          return <TreeNode key={item.key} title={item.title}>{this.loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.title} />;
      });
    render(){
        return (
            <Tree
            loadData={this.props.onLoadData?this.props.onLoadData:null}
            showLine
            draggable
            {...this.props.treeOptions}
            >
            {this.props.data && this.loop(this.props.data)}
            </Tree>
        )
    };
}