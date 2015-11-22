var squares = document.querySelectorAll('.content');
var view = document.querySelector('#view');

function showSquares(){
    for (var i = 0; i < squares.length; i++) {
        (function (i) {
            setTimeout(function () {
                squares[i].classList.add('animate');
                squares[i].classList.add('show-content');
            }, 75 * i);
        })(i);
    }
}

function hideSquares(){
    for (var i = 0; i < squares.length; i++) {
        (function (i) {
            setTimeout(function(){
                squares[i].classList.remove('show-content');
            }, 75 * i);
        })(i);
    }
}

var initialized = false;
var setup = function(){
    if(initialized) return;
    initialized = true;
    //set up the image rotation
    var img = squares[4];
    img.children[0].onload = function(){
        setTimeout(function(){
            img.classList.add('animate');
            img.classList.add('show-content');
        },5);
    };
    var last = 0, next = 0;
    setInterval(function(){
        if(location.hash == "" || location.hash == "#/"){
            img.classList.remove('show-content');
            img.classList.add('change-content');
            setTimeout(function(){
                img.classList.remove('animate');
                img.classList.remove('change-content');
            }, 400);
            setTimeout(function(){
                do{
                    next = Math.floor(Math.random()*6);
                }while(next == last);
                last = next;
                img.children[0].src = 'img/' + next + '.jpg';
            }, 410);
        }
    }, 8000);
    //preload images into cache
    var cache = [];
    for(var i = 0; i < 6; i++){
        cache[i] = new Image();
        cache[i].src = 'img/' + i + '.jpg';
    }
};
var x = setTimeout(setup, 1000);
window.onload = function(){
    clearTimeout(x);
    setup();
};

var body = document.body || document.querySelector('body'), element = null, stamp = 0, moved = false;
var beginListening = function(e){element = e.target;stamp = (new Date()).getTime();};
var moveListener = function(e){moved = true};
var routeListener = function(e){
    var el = e.target;
    if((element == el && (new Date()).getTime() - stamp < 200 && !moved) || element == null){
        if(!el.matches){
            if(matches.apply(el, ['[route]']) || matches.apply(el, ['[route] *'])){
                while(!matches.apply(el, ['[route]'])) el = el.parentNode;
                Route(el.getAttribute('route'));
                e.preventDefault();
            }
        }
        if(el.matches('[route] *') || el.matches('[route]')){
            while(!el.matches('[route]')) el = el.parentNode;
            Route(el.getAttribute('route'));
            e.preventDefault();
        }
    }
    moved = false;
};
body.addEventListener('click', routeListener, true);
body.addEventListener('touchstart', beginListening, true);
body.addEventListener('touchmove', moveListener, true);
body.addEventListener('touchend', routeListener, true);

var tileRoute = function(route){
    load('views/template.html')(function(html){
        view.innerHTML = template(html, {
            title: route.toUpperCase(),
            description: 'This is where ' + route + ' information will be.'
        });
        setTimeout(function(){
            view.classList.add('show-content');
        }, 200);
    });
};

var tilesLeave = function(){
    view.classList.remove('show-content');
};

var rsvpCode = function(route, params){
    load('views/rsvp.html')(function(html){
        var memory = {
            first: 'James',
            last: 'Hoekzema',
            checked: false
        };
        view.innerHTML = template(html, {
            memory: memory,
            validId: true
        });
        setTimeout(function(){
            view.classList.add('show-content');
        }, 200);
    });
};

Route([ '/rsvp','/venue','/bridesmaids',
        '/groomsmen','/engagement','/photos',
        '/message','/registry'], tileRoute, tilesLeave);

Route('/rsvp/:code', rsvpCode, tilesLeave);

Route('/', function(){
    setTimeout(showSquares, 450);
}, hideSquares);