var template = function(html, data){
    var wrap = function(exp){
        var open = '(function(';
        var close = '){return ' + exp + '}).apply(null, newData)';
        var args = [];
        for(var prop in data) args.push(prop);
        return open + args.join(',') + close;
    };
    (function(){
        var matches = html.match(/\{\{[^\{}]*}}/g);
        var newData = [];
        for(var prop in data) newData.push(data[prop]);
        for(var i = 0; i < matches.length; i++){
            var exp = matches[i].substr(2, matches[i].length - 4);
            try{
                html = html.replace(matches[i], eval(wrap(exp)));
            }catch(e){
                html = html.replace(matches[i], "");
            }
        }
    }).call(data);
    return html;
};