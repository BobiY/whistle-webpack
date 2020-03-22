import React from "react";
import ReactDom from "react-dom";
import "./index.less";
import { AA } from "../utils";
export const a: string = AA;

export class App extends React.Component<any,any> {
    constructor(props){
        super();
    }

    render() {
        return <div id="hello" className='a'>hello world</div>
    }
}
