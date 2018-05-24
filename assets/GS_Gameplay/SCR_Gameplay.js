cc.Class({
    extends: cc.Component,

    properties: {
        sprUnicorn: {
            default: null,
            type: cc.Sprite
        },
    },

    // use this for initialization
    onLoad: function () {
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

    },
});
