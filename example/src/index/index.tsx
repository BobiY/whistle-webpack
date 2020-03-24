import React from "react";
import ReactDOM from "react-dom";
// import "./index.less";
import { AA } from "../utils";
export const a: string = AA;



class App extends React.Component<any,any> {
    constructor(props){
        super();
    }

    render() {
        return <div id="hello" className='a' style={{color: "red"}}>hello world</div>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

console.log(33333 ,'hello index page22222')