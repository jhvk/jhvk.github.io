function RSVP(route){
    load('views/rsvp.html')(function(html){
        view.innerHTML = template(html, {
            title: route.toUpperCase(),
            description: 'This is where ' + route + ' information will be.'
        });

        var indicator = document.getElementById('recorded');
        var first = document.getElementById('first_name');
        var last = document.getElementById('last_name');
        var choices = document.getElementById('rsvp-choice');

        choices.addEventListener('click', function(e){
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

            choices.classList.add('hide');

            var longRequest = setTimeout(function(){
                choices.classList.remove('hide');
                indicator.innerHTML = "If you are on an Apple device, your RSVP has been received. Apple doesn't play " +
                        "nice with Google, so the site won't receive confirmation that you've been added to the sheet.";
                indicator.classList.remove('hide');
                setTimeout(function(){
                    try{
                        indicator.classList.add('hide');
                    }catch(e){
                        console.log('already left page');
                    }
                }, 4000);
            }, 6000);

            load('https://script.google.com/macros/s/AKfycbyYFSd0WMsCpo-1RTA-xSVWzmsPcTsyWBuFkZPIB00Q_gV2ANM/exec?' + query)(function(result){
                clearTimeout(longRequest);
                choices.classList.remove('hide');
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