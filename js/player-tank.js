class PlayerTank {
    constructor(scene) {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.speed = 5;
        this.scene = scene;
        this.sprite = null;

        this.leftButton = null;
        this.rightButton = null;
        this.upButton = null;
        this.downButton = null;
    }

    preload() {
        this.scene.load.image('PlayerTank', 'img/tank2.png');
    }

    setup() {
        this.setup_sprite();
        this.setup_controls();
    }

    setup_sprite() {
        this.sprite = this.scene.add.image(400, 400, 'PlayerTank');
        this.sprite.tint = 0xff00ff;
        this.sprite.setScale(3);
    }

    setup_controls() {
        let keyboard = this.scene.input.keyboard;

        this.leftButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.rightButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.upButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.downButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    }

    update(delta) {
        this.sprite.setDepth(1);

        let controlVector = new Phaser.Math.Vector2();

        if (this.leftButton.isDown) {
            controlVector.x -= 1;
        }

        if (this.rightButton.isDown) {
            controlVector.x += 1;
        }

        if (this.upButton.isDown) {
            controlVector.y -= 1;
        }

        if (this.downButton.isDown) {
            controlVector.y += 1;
        }

        let controlVectorLength = controlVector.length();
        if (controlVectorLength > 0) {
            controlVector.scale(this.speed / controlVectorLength);

            let targetAngle = controlVector.angle() * 180 / Math.PI;

            //TODO: -90 because the tank sprite is rotated down, need to fix art
            targetAngle -= 90;

            this.sprite.angle = targetAngle;
        }

        this.sprite.x += controlVector.x;
        this.sprite.y += controlVector.y;
    }
}