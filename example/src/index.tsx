// import React from "react";
// import { HashRouter, Link } from "react-router-dom";
// import { renderRoutes } from "react-router-config";
// import ReactDOM from "react-dom";
// import {getComponent} from "getComponent";
// import "getComponent/dist/getComponent.css"
// // console.log(getComponent);   
// const routers = [
//     {
//         path: '/search',
//         // exact: true,
//         component: getComponent(() => import(/* webpackChunkName: "search" */ "./search/index"))
//     },

//     {
//         path: '/home',
//         // exact: true,
//         component: getComponent(() => import(/* webpackChunkName: "indes" */ "./index/index"))
//     }
// ]
// const RenderRouter = () => (
//     <span>
//         <Link to="/home">home</Link>
//         <Link to="/search">search</Link>
//       {/* kick it all off with the root route */}
//       {renderRoutes(routers)}
//     </span>
// )
// ReactDOM.render(
//     <HashRouter>
//       <RenderRouter />
//     </HashRouter>,
//     document.getElementById("app")
// );


// function test() {
//     new Promise();
//   }
// test()
const arr = [1,2,3,4].map(item => item * item)
const hasNumber = (num) => [4, 5, 6, 7, 8].includes(num)
console.log(arr)
console.log( hasNumber(2) )