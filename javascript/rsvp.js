function RSVP(route){
    load('views/rsvp.html')(function(html){
        view.innerHTML = template(html, {
            title: route.toUpperCase(),
            description: 'This is where ' + route + ' information will be.'
        });

        var indicator = document.getElementById('recorded');
        var first = document.getElementById('first_name');
        var last = document.getElementById('last_name');

        document.getElementById('rsvp-choice').addEventListener('click', function(e){
            var isComing;
            if(e.target.id === 'rsvp-choice-yes'){
                isComing = true;
            }else if(e.target.id === 'rsvp-choice-no') {
                isComing = false;
            }else{
                return false;
            }

            if(!first.value || !last.value){
                indicator.innerHTML = 'Please enter your name.';
                indicator.classList.remove('hide');
                setTimeout(function(){
                    try{
                        indicator.classList.add('hide');
                    }catch(e){
                        console.log('already left page');
                    }
                }, 4000);
                return false;
            }

            var query = 'first=' + encodeURI(first.value) + '&last=' + encodeURI(last.value) + '&coming=' + isComing;

            load('https://script.google.com/macros/s/AKfycbyYFSd0WMsCpo-1RTA-xSVWzmsPcTsyWBuFkZPIB00Q_gV2ANM/exec?' + query)(function(result){
                if(result === 'success'){
                    indicator.innerHTML = 'Your RSVP has been received.';
                }else{
                    indicator.innerHTML = 'Something went wrong. Please refresh the page and try again.';
                }
                indicator.classList.remove('hide');
                setTimeout(function(){
                    try{
                        indicator.classList.add('hide');
                    }catch(e){
                        console.log('already left page');
                    }
                }, 4000);
            });
        });

        setTimeout(function(){
            view.classList.add('show-content');
        }, 200);
    });
}

Route('/rsvp', RSVP, tilesLeave);