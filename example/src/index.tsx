import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import ReactDOM from "react-dom";
import getComponents from "../getComponent";

const routers = [
    {
        path: '/search',
        // exact: true,
        component: getComponents(() => import(/* webpackChunkName: "search" */ "./search/index"))
    },
    {
        path: '/home',
        // exact: true,
        component: getComponents(() => import(/* webpackChunkName: "indes" */ "./index/index"))
    }
]
const RenderRouter = () => (
    <span>
        <Link to="/home">home</Link>
        <Link to="/search">search</Link>
      {/* kick it all off with the root route */}
      {renderRoutes(routers)}
    </span>
)
ReactDOM.render(
    <HashRouter>
      <RenderRouter />
    </HashRouter>,
    document.getElementById("app")
);