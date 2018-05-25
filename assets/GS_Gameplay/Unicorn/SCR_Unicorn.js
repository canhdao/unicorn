var SIZE				=  200;
var GRAVITY 			= 3000;
var MOVEMENT_DRAG 		=  700;
var ROTATION_DRAG 		=  100;
var FART_MOVEMENT_POWER = 5000;
var FART_ROTATION_POWER =  600;


cc.Class({
    extends: cc.Component,

    properties: {
		scrGameplayNode: {
            default: null,
            type: cc.Node
        },
    },

    onLoad () {
		this.x			= 0;
		this.y			= 0;
		this.a			= 0;
		this.speedX		= 0;
		this.speedY		= 0;
		this.speedA		= 0;
		
		this.scrGameplay = this.scrGameplayNode.getComponent("SCR_Gameplay");
	},

    start () {
		
    },
	
	fart () {
		this.speedX += this.scrGameplay.sin(this.a) * FART_MOVEMENT_POWER;
		this.speedY += this.scrGameplay.cos(this.a) * FART_MOVEMENT_POWER;
		this.speedA = (0.5 + Math.random() * 0.5) * FART_ROTATION_POWER;
	},

    update (dt) {
		// Apply movement drag
		var drag = MOVEMENT_DRAG * dt;
		
		if (this.speedX > drag) this.speedX -= drag;
		else if (this.speedX < -drag) this.speedX += drag;
		else this.speedX = 0;
		
		if (this.speedY > drag) this.speedY -= drag;
		else if (this.speedY < -drag) this.speedY += drag;
		else this.speedY = 0;
		
		// Apply gravity
		this.speedY -= GRAVITY * dt;
		
		// Apply rotational drag
		drag = ROTATION_DRAG * dt;
		
		if (this.speedA > drag) this.speedA -= drag;
		else if (this.speedA < -drag) this.speedA += drag;
		else this.speedA = 0;
		
		// Apply speed to actual properties
		this.x += this.speedX * dt;
		this.y += this.speedY * dt;
		this.a += this.speedA * dt;
		
		if (this.speedX < 0 && this.x < -this.scrGameplay.SCREEN_W * 0.5) {
			this.x = -this.scrGameplay.SCREEN_W * 0.5;
			this.speedX = -this.speedX;
		}
		else if (this.speedX > 0 && this.x > this.scrGameplay.SCREEN_W * 0.5) {
			this.x = this.scrGameplay.SCREEN_W * 0.5;
			this.speedX = -this.speedX;
		}
		
		// Apply properties to node's
		this.node.x 		= this.x;
		this.node.y			= this.y - this.scrGameplay.cameraY;
		this.node.rotation 	= this.a;
	},
});
