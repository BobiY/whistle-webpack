import React from "react";
import ReactDom from "react-dom";
import "./index.less";
export const a: string = 'ssss';

export class App extends React.Component<any,any> {
    constructor(props){
        super();
    }

    render() {
        return <div id="hello" className='a'>hello world</div>
    }
}
