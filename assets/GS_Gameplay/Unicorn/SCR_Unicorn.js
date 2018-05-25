var GRAVITY = 3000;
var DRAG = 300;
var UNICORN_FART_POWER = 5000;

cc.Class({
    extends: cc.Component,

    properties: {
		x: 0,
		y: 0,
		angle: 0,
		speedX: 0,
		speedY: 0,
    },

    onLoad () {
		
	},

    start () {

    },
	
	fart () {
		this.speedY += UNICORN_FART_POWER;
	},

    update (dt) {
		var drag = DRAG * dt;
		
		if (this.speedX > drag) this.speedX -= drag;
		else if (this.speedX < -drag) this.speedX += drag;
		else this.speedX = 0;
		
		if (this.speedY > drag) this.speedY -= drag;
		else if (this.speedY < -drag) this.speedY += drag;
		else this.speedY = 0;
		
		
		
		this.speedY -= GRAVITY * dt;
		this.y += this.speedY * dt;
		
		this.node.x = this.x;
		this.node.y = this.y;
	},
});
