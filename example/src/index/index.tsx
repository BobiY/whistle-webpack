import React from "react";
import ReactDOM from "react-dom";
// import "./index.less";
import { AA } from "../utils";
export const a: string = AA;



export default class App extends React.Component<any,any> {
    constructor(props){
        super(props);
        this.state = {
            com: null
        }
    }
    click() {
        import(/* webpackChunkName: "newComponent" */'./newComponent').then( com => {
            console.log(com);
            this.setState({com: <com.New></com.New>});
        } )
    }
    render() {

        return <div id="hello" className='a' style={{color: "red"}} onClick={this.click.bind(this)}>
                hello world
                {this.state.com ? this.state.com : null}
                </div>
    }
}

// ReactDOM.render(<App />, document.getElementById('app'));

console.log(33333 ,'hello index page22222')