var RAD_TO_DEG = 57.29577951308231;
var DEG_TO_RAD = 0.0174532925199433;

cc.Class({
    extends: cc.Component,

    properties: {
        sprUnicorn: {
            default: null,
            type: cc.Sprite
        },
		sprBackground1: {
            default: null,
            type: cc.Sprite
        },
		sprBackground2: {
            default: null,
            type: cc.Sprite
        },
    },

    // use this for initialization
    onLoad: function () {
		this.SCREEN_H = 1920;
		this.SCREEN_W = cc.director.getOpenGLView().getViewPortRect().width * this.SCREEN_H / cc.director.getOpenGLView().getViewPortRect().height;
		
		this.CAMERA_SPEED = 30;
		
		this.cameraY = 0;
		
		
		
		var instance = this;
        cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			swallowTouches: true,
			onTouchesBegan: function (touches, event) {
				instance.sprUnicorn.getComponent("SCR_Unicorn").fart();
				return true;
			},
			onTouchesMoved: function (touches, event) {
				return true;
			},
			onTouchesEnded: function (touches, event) {
				return true;
			}
		}, instance.node);
    },

    // called every frame
    update: function (dt) {
		if (this.sprUnicorn.getComponent("SCR_Unicorn").y > this.cameraY) {
			var delta = this.sprUnicorn.getComponent("SCR_Unicorn").y - this.cameraY;
			this.cameraY += delta * this.CAMERA_SPEED * dt;
		}
		
		this.sprBackground1.node.y = -(this.cameraY % this.SCREEN_H);
		this.sprBackground2.node.y = this.sprBackground1.node.y + this.SCREEN_H;
    },
	
	
	
	// My own helper
	distanceBetweenTwoPoint: function (x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	},
	angleBetweenTwoPoint: function (x1, y1, x2, y2) {
		var angle = 0;
		if (y2 == y1) {
			if (x2 > x1)
				angle = 90;
			else if (x2 < x1)
				angle = 270;
		}
		else {
			angle = Math.atan((x2 - x1) / (y2 - y1)) * RAD_TO_DEG;
			if (y2 < y1) {
				angle += 180;
			}
			if (angle < 0) angle += 360;
		}

		return angle;
	},
	sin: function (angle) {
		return Math.sin(angle * DEG_TO_RAD);
	},
	cos: function (angle) {
		return Math.cos(angle * DEG_TO_RAD);
	},
});
