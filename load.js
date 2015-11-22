var load = (function(){
    var cache = {};
    return function(url){
        var xhr = new XMLHttpRequest();
        var listener = function(){};
        if(url in cache){
            setTimeout(function(){
                listener(cache[url]);
            }, 0);
        }else {
            xhr.onload = function () {
                try {
                    listener(JSON.parse(xhr.responseText));
                    cache[url] = JSON.parse(xhr.responseText);
                } catch (e) {
                    listener(xhr.responseText);
                    cache[url] = xhr.responseText;
                }
            };
            xhr.open('GET', url);
            xhr.send();
        }
        return function(l){listener = l;}
    }
})();