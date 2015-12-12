var matches = function(s){
    var matches = document.querySelectorAll(s), i = 0;
    while(matches[i] && matches[i] != this) i++;
    return !!matches[i];
};
var proto = Element.prototype;
proto.matches = proto.matches || proto.matchesSelector || matches;