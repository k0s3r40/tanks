class PlayerTank {
    constructor(scene) {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.speed = 250;
        this._scene = scene;
        this._sprite = null;

        this._leftButton = null;
        this._rightButton = null;
        this._upButton = null;
        this._downButton = null;
        this.isShooting = false;
    }

    preload() {
        this._scene.load.image('PlayerTank', 'img/tank2.png');
        this._scene.load.image('Bullet','img/bullet.png');
    }

    setup() {
        this.setup_sprite();
        this.setup_controls();
    }

    setup_sprite() {
        this._sprite = this._scene.add.image(this.x, this.y, 'PlayerTank');
        this._sprite.tint = 0xff00ff;
        this._sprite.setScale(3);
    }

    setup_controls() {
        let keyboard = this._scene.input.keyboard;

        this._leftButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this._rightButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this._upButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this._downButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this._shootButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update(time,delta) {
        this._sprite.setDepth(1);

        this.update_movement(time,delta);

        this.update_shooting(time,delta);

        this.update_sprite();
    }

    update_sprite() {
        this._sprite.x = this.x;
        this._sprite.y = this.y;

        //-90 because the tank sprite is rotated down
        this._sprite.angle = this.angle - 90;
    }

    update_movement(time,delta) {
      let controlVector = new Phaser.Math.Vector2();

        if (this._leftButton.isDown) {
            controlVector.x -= 1;
        }

        if (this._rightButton.isDown) {
            controlVector.x += 1;
        }

        if (this._upButton.isDown) {
            controlVector.y -= 1;
        }

        if (this._downButton.isDown) {
            controlVector.y += 1;
        }

        let controlVectorLength = controlVector.length();
        if (controlVectorLength > 0) {
            controlVector.scale(this.speed / controlVectorLength * delta / 1000);
            let targetAngle = controlVector.angle() * 180 / Math.PI;
            this.angle = targetAngle;
        }

        this.x += controlVector.x;
        this.y += controlVector.y;
    }

    update_shooting(time,delta) {
        if(this._shootButton.isDown){
            this.isShooting = true;
            this.shootTimer = 7;
            this.spawn_bullet();
        }
    }
     spawn_bullet(){
     let bullet = this._scene.add.image(this.x, this.y, 'Bullet');
     }
}