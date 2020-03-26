import React from 'react';

// 加载异步组件 用于路由的代码分割
export default function getComponents(getComponent) {
  return class AsyncComponent extends React.Component<any, any> {
    mount: boolean;
    static component;
    constructor(props) {
        super(props);
        this.state = { Component: null };
        this.mount = true;
    }

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
            if ( !this.mount ) { // 防止组件卸载以后设置组件的状态
                return false;
            }
            // 组件需要默认导出
            AsyncComponent.component = Component.default;
            this.setState({ Component: Component.default })
        })
      }
    }
    componentWillUnmount() {
        this.mount = false;
    }
    render() {

      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null;
    }
  }
}