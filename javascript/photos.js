var viewer = (function(){
    var current = 0;
    var count = 365;
    
    function loadImage(){
        console.log('loading image');
        var viewer = document.querySelector('#image-viewer');
        viewer.setAttribute('style', 'background-image: url("/photos/Hoekzema-' + (current+1) + '.jpg")');
        console.log('success');
    }

    Route('/photos', loadImage, tilesLeave);
    
    return {
        next: function(){
            current++;
            if(current == count) current = 0;
            loadImage();
        },
        prev: function(){
            current--;
            if(current == -1) current += count;
            loadImage();
        }
    };
})();