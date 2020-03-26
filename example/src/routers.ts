
        const routres = [
        
    
            {
                path: "/.",
                component: getComponent(import(/* webpackChunkName: "src" */ "./index"))
            },
        
            {
                path: "/index",
                component: getComponent(import(/* webpackChunkName: "index" */ "./index/index"))
            },
        
            {
                path: "/home",
                component: getComponent(import(/* webpackChunkName: "home" */ "./home/index"))
            },
        
            {
                path: "/index",
                component: getComponent(import(/* webpackChunkName: "newComponent" */ "./index/newComponent"))
            },
        
            {
                path: "/search",
                component: getComponent(import(/* webpackChunkName: "search" */ "./search/index"))
            },
        
        ];
        export default routres;
    