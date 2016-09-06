var viewer = (function(){
    var current = 0;
    var count = 365;
    
    function loadImage(){
        var viewer = document.querySelector('#image=viewer');
        viewer.setAttribute('style', 'background-image: url("/photos/Hoekzema-' + (current+1) + '")')
    }

    Route('/message', loadImage, tilesLeave);
    
    return {
        next: function(){
            current++;
            if(current == count) current = 0;
        },
        prev: function(){
            current--;
            if(current == -1) current += count;
        }
    }
})();