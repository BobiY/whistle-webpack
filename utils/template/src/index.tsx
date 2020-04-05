import './index.less';
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>this is hello world!!!</div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));