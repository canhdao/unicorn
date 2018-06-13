var SIZE				=  200;
var GRAVITY 			= 3000;
var MOVEMENT_DRAG 		=  700;
var ROTATION_DRAG 		=  100;
var FART_MOVEMENT_POWER = 5000;
var FART_ROTATION_POWER =  500;


cc.Class({
    extends: cc.Component,

    properties: {
		scrGameplayNode: {
            default: null,
            type: cc.Node
        },
		
		trail: {
			default: null,
			type: cc.Node
		}
    },

    onLoad () {
		this.x			= 0;
		this.y			= 0;
		this.a			= 0;
		this.speedX		= 0;
		this.speedY		= 0;
		this.speedA		= 0;
		
		this.trailActive = false;
		this.trailElapsedTime = 0;
		
		this.scrGameplay = this.scrGameplayNode.getComponent("SCR_Gameplay");
	},

    start () {
		
    },
	
	fart () {
		this.speedX += this.scrGameplay.sin(this.a) * FART_MOVEMENT_POWER * 0.5;
		this.speedY += this.scrGameplay.cos(this.a) * FART_MOVEMENT_POWER;
		this.speedA = (0.5 + Math.random() * 0.5) * FART_ROTATION_POWER;
		
		this.trail.getComponent(cc.MotionStreak).reset();
		this.trail.x = this.node.x;
		this.trail.y = this.node.y;
		this.trailActive = true;
		this.trailElapsedTime = 0;
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
		
		if (this.trailActive && this.speedY < 0) {
			this.trailActive = false;
		}
		
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
		
		if (this.trailActive) {
			this.trail.x = this.node.x;
			this.trail.y = this.node.y;
			
			this.trailElapsedTime += dt;
			
			if (this.trailElapsedTime < 1.0) {
				var fadeTime = this.trailElapsedTime;
				this.trail.getComponent(cc.MotionStreak)._motionStreak._fadeDelta = 1.0 / fadeTime;
			}
		}
		
		// Game over
		if (this.node.y < -this.scrGameplay.SCREEN_H * 0.5) {
			cc.director.loadScene("SCN_Gameplay");
		}
	},
	
	moveTrail: function (deltaCamera) {
		for (var i = 0; i < this.trail.getComponent(cc.MotionStreak)._motionStreak._nuPoints; i++) {
			this.trail.getComponent(cc.MotionStreak)._motionStreak._pointVertexes[2 * i + 1] -= deltaCamera;
		}
	}
});
