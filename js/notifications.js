class Notify{

    constructor(){
        this.messages = [];
    }

    success(msg, icon = null){
        if(this.recurring(msg)){
            // create main notification
            const notif = document.createElement('div');
            notif.classList.add('notification');
            notif.classList.add('success');
            notif.classList.add('px-3');
            notif.classList.add('py-3');
            notif.classList.add('mx-3');
            notif.classList.add('my-3');
            notif.classList.add('rounded');
            notif.classList.add('shadow-sm');
            notif.classList.add('text-center');
            notif.classList.add('w-100');
            // create span for text
            const text_span = document.createElement('span');
            // create text
            const text = document.createTextNode(msg);
            // add text to span
            text_span.appendChild(text);
            if(icon != null){
                text_span.innerHTML += icon;
            }
            // add span to notification
            notif.appendChild(text_span);
            // add notification to list
            document.getElementById('notifications-wrap').appendChild(notif);
            // set auto destroy
            this.setTimer(notif, msg);
            // add notification msg to array
            this.messages.push(msg);
        }
    }

    warning(msg){
        this.setTimer(null, null);
    }

    danger(msg){
        this.setTimer(null, null);
    }

    setTimer(notif, msg){
        const msgs = this.messages;
        window.setTimeout(function(){
            let index = msgs.indexOf(msg);
            msgs.splice(index, 1);
            document.getElementById('notifications-wrap').removeChild(notif);
        }, 3000);
    }

    recurring(msg){
        return !(this.messages[this.messages.length - 1] == msg) || this.messages.length == 0;
    }
}

const notify = new Notify();
