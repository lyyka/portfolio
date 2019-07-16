class Confetti{

    constructor(party, options){
        this.party = party;
        // canvas
        this.canvas = party.canvas;

        // color and shape
        this.color = options.color;
        this.shape = options.shape;

        // rotation speed
        // this.rotation_speed = options.rotation;

        // speed
        this.speed = options.speed;

        // wind_force, determine if it will go left or right
        this.wind_force = options.wind_force;
        const wind_force_multiplier = Math.floor((Math.random() * 2) + 1)
        if (wind_force_multiplier == 2) {
            this.wind_force *= -1;
        }

        // interval for moving the confetti
        this.interval = null;
        this.isDone = false;
    }

    position(x, y){
        this.x = x;
        this.y = y;
    }

    move(){
        // increase according to speed
        this.y += this.speed / 1000;
        this.angle += this.speed / 1000;

        // point it to one direction
        this.x += this.wind_force / 800;

        // shoot it again
        this.draw();
    }

    setUp(){
        this.width = Math.floor(Math.random() * 25 + 1);
        this.height = Math.floor(Math.random() * 40 + 1);

        if(this.shape == "rectangle" || this.shape == "triangle"){
            this.angle = Math.floor((Math.random() * 90) + 1);
            const angle_multiplier = Math.floor((Math.random() * 2) + 1)
            if (angle_multiplier == 2) {
                this.angle *= -1;
            }

            this.x_width = Math.abs(Math.cos(this.angle) * this.width);
        }

        this.interval = setInterval(this.party.redraw, 1);
    }

    draw(){
        if ((this.y >= this.party.dom_canvas.height ||
            this.x + this.x_width <= 0 ||
            this.x >= this.party.dom_canvas.width) && !this.isDone) {

            this.isDone = true;
            this.party.countDone();

        }
        else{
            // save untraslated state
            this.canvas.save();
            
            // begin path
            this.canvas.beginPath();

            // translate for rotation
            var rotate = false;
            if (this.shape == "rectangle") {
                this.canvas.translate(this.x + this.width / 2, this.y + this.height / 2);
                rotate = true;
            }
            else if(this.shape == "triangle"){
                this.canvas.translate(this.x, this.y);
                rotate = true;
            }

            // rotate
            if(rotate){
                this.canvas.rotate(this.angle * Math.PI / 180);
            }

            // set color
            this.canvas.fillStyle = this.color;
            this.canvas.strokeStyle = this.color;
            
            // draw
            if(this.shape == "rectangle"){
                this.canvas.rect(-this.width / 2, -this.height / 2, this.width, this.height);
            }
            else if(this.shape == "circle"){
                this.canvas.arc(this.x, this.y, this.width / 2, 0, 2* Math.PI);
            }
            else if(this.shape == "triangle"){
                const center_point_x = this.x;
                const center_point_y = this.y;

                const triangle_side = this.width;

                const triangle_height = triangle_side * Math.sqrt(3) / 2;
                const R = triangle_height * (2/3);
                const r = triangle_height / 3;

                const top_point = {
                    x: 0,
                    y: -R
                }

                const bottom_left_point = {
                    x: -(triangle_side / 2),
                    y: r
                }

                const bottom_right_point = {
                    x: (triangle_side / 2),
                    y: r
                }

                this.canvas.moveTo(top_point.x, top_point.y);
                this.canvas.lineTo(bottom_left_point.x, bottom_left_point.y);
                this.canvas.lineTo(bottom_right_point.x, bottom_right_point.y);
            }

            // close path
            this.canvas.closePath();
            this.canvas.fill();
            
            // draw actually
            this.canvas.stroke();
            
            // restore untraslated state for further drawing
            this.canvas.restore();
        }
    }

}

class ConfettiParty{

    constructor(canvas_id, options){
        this.confetties = [];
        this.dom_canvas = document.getElementById(canvas_id);
        this.dom_canvas.width = document.body.clientWidth; //document.width is obsolete
        this.dom_canvas.height = document.body.clientHeight; //document.height is obsolete
        this.canvas = this.dom_canvas.getContext("2d");

        this.redraw = this.redraw.bind(this);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    start(){
        this.dom_canvas.style.display = "block";
        this.dom_canvas.style.zIndex = "100";

        const colors = [
            "red",
            "lightgreen",
            "lightblue",
            "yellow"
        ];

        const shapes = [
            "rectangle",
            "circle",
            "triangle"
        ];

        const conf_number = 700;
        var x = 0;
        var y = -300;

        for (var i = 1; i < conf_number + 1; i++) {
            // get random color
            const rand_color = colors[this.getRandomInt(0, colors.length - 1)];

            // get random shape
            const rand_shape = shapes[this.getRandomInt(0, shapes.length - 1)];

            // construct confetti
            var conf = new Confetti(this, {
                color: rand_color,
                shape: rand_shape,
                // shape: "triangle",
                speed: this.getRandomInt(1000, 5000),
                // speed: 200,
                // rotation: this.getRandomInt(1000, 5000),
                wind_force: this.getRandomInt(100, 500)
                // wind_force: 0
            });

            // position the confetti
            conf.position(x, y);

            // shoot!!!
            conf.setUp();

            this.confetties.push(conf);

            x += 30;
            if(x > document.body.clientWidth){
                x = 10;
            }
        }
    }

    countDone(){
        if(this.done == null){
            this.done = 0;
        }

        this.done++;

        if(this.done == this.confetties.length){
            this.dom_canvas.style.display = "none";
            this.dom_canvas.style.zIndex = "-1";
        }
    }

    redraw(){
        this.canvas.beginPath();
        this.canvas.clearRect(0, 0, this.dom_canvas.width, this.dom_canvas.height);
        this.canvas.stroke();
        for (var i = 0; i < this.confetties.length; i++) {
            const conf = this.confetties[i];

            // move!!!
            conf.move();
        }
    }

}

const confetti_party = new ConfettiParty("confetti-holder");