var messenger = (function(){
    var ref = new Firebase("https://jh-vk.firebaseio.com/");
    var messages = [];
    var listeners = [];
    ref.on('child_added', function(msg){
        var data = msg.val();
        data.id = msg.key();
        messages.push(data);
        for(var i = 0; i < listeners.length; i++){
            listeners[i](data);
        }
    });
    return {
        write: function(msg, sender, response){
            ref.push({
                message: msg,
                sender: sender,
                time: Firebase.ServerValue.TIMESTAMP
            }, function(error, data){
                if(typeof response === "function"){
                    response(error, data);
                }
            });
        },
        messages: function(){return messages;},
        addListener: function(listener){
            if(typeof listener === "function" && listeners.indexOf(listener) == -1){
                listeners.push(listener);
            }
        },
        removeListener: function(listener){
            listeners.splice(listeners.indexOf(listener), 1);
        }
    };
})();

function parseMsg(msg){
    return msg
        .replace(/:\)|=\)/g, "<img class='emoji' src='/emoticons/smile.png'>")
        .replace(/:\(|=\(/g, "<img class='emoji' src='/emoticons/sad.png'>")
        .replace(/:D|=D/g, "<img class='emoji' src='/emoticons/happy.png'>")
        .replace(/<3/g, "<img class='emoji' src='/emoticons/heart.png'>");
}

function activeMessage(msg){
    var messages = document.querySelector('#messages');
    if(messages){
        var node = document.createElement('div');
        node.classList.add('message');
        node.id = msg.id;
        node.innerHTML = "<div class='sender'>" + msg.sender + "</div>" +
                         "<div class='msg'>" + parseMsg(msg.message) + "</div>" +
                         "<div class='time'>" + new Date(msg.time).toLocaleString() + "</div>";
        messages.insertBefore(node, messages.firstChild);
    }
}

function loadMessages(){
    load('views/message.html')(function(html){
        messenger.addListener(activeMessage);
        view.innerHTML = template(html, {
            title: 'Messages',
            messages: messenger.messages(),
            parseMsg: parseMsg
        });
        document.querySelector('#post-msg').addEventListener('click',function(){
            messenger.write(
                document.querySelector('#msg-content').value,
                document.querySelector('#msg-name').value,
                function(){
                    document.querySelector('#msg-content').value = "";
                    document.querySelector('#msg-name').value = "";
                }
            );
        });
        setTimeout(function(){
            view.classList.add('show-content');
        }, 200);
    });
}

function unloadMessages(){
    messenger.removeListener(activeMessage);
    tilesLeave();
}

Route('/message', loadMessages, unloadMessages);