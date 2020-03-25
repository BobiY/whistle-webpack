import React from 'react';

// 加载异步组件
export default function getComponents(getComponent) {
  return class AsyncComponent extends React.Component<any, any> {
    mount: boolean;
    // static Component = null;
    constructor(props) {
        super(props);
        this.state = { Component: null };
        this.mount = true;
    }

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
            if ( !this.mount ) {
                return false;
            }
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