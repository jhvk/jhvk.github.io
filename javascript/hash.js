var Route = (function(){
    if(!location.hash.match(/^#\/.*$/)) location = '/#/';
    var oldRoute = location.hash.substr(1), newRoute = location.hash.substr(1), oldRouteIndex = -1, newRouteIndex = -1;
    var exit = function(){};

    var process = window.onhashchange = function(){
        var hash = location.hash.substr(1);
        var routeFound = -1;
        var params = {};
        for(var i = 0; i < routes.length; i++){
            var matches = hash.match(routes[i].exp);
            if(matches){
                for(var j = 1; j < matches.length; j++){
                    params[routes[i].params[j-1]] = matches[j];
                }
                routeFound = i;
                break;
            }
        }
        if(routeFound >= 0){
            oldRouteIndex = newRouteIndex;
            if(oldRouteIndex >= 0){
                routes[oldRouteIndex].onLeave();
            }
            newRouteIndex = routeFound;
            oldRoute = newRoute;
            newRoute = hash;
            routes[routeFound].listener(hash.split('/')[1], params, hash);
        }else if(oldRoute){
            console.log('navigating back');
            history.back();
        }
    };

    var routes = [];

    setTimeout(process, 100);

    var createRoute = function(route, response, onLeave){
        if(!response && route){
            location.hash = '#' + route;
        }else if(typeof response == 'function'){
            if(route instanceof Array){
                for(var i = 0; i < route.length; i++){
                    createRoute(route[i], response, onLeave);
                }
                return createRoute;
            }
            var parts = route.split('/');
            var params = [];
            for(var i = 0; i < parts.length; i++){
                if(parts[i].match(/^:.*$/)){
                    params.push(parts[i].substr(1));
                    parts[i] = '([^\\\/]+)';
                }
            }
            routes.push({
                exp: new RegExp('^' + parts.join('\/') + '$'),
                params: params,
                listener: response,
                onLeave: onLeave || function(){}
            });
        }
        return createRoute;
    };
    return createRoute;
})();