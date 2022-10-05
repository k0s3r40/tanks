class PlayerTank extends GameEntity {
    constructor(game) {
        super(game);

        this.speed = 250;
        this.shootTimer = 0;

        this._leftButton = null;
        this._rightButton = null;
        this._upButton = null;
        this._downButton = null;
        this._shootButton = null;
    }

    preload() {
        this._game.load.image('PlayerTank', 'img/tank2.png');
        this._game.load.image('Bullet','img/bullet.png');
    }

    setup() {
        this.setup_sprite();
        this.setup_controls();
    }

    setup_sprite() {
        this._sprite = this._game.add.image(this.x, this.y, 'PlayerTank');
        this._sprite.tint = 0xff00ff;
        this._sprite.setScale(3);
    }

    setup_controls() {
        let keyboard = this._game.input.keyboard;

        this._leftButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this._rightButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this._upButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this._downButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this._shootButton = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update(delta) {
        this._sprite.setDepth(1);

        this.update_movement(delta);

        this.update_shooting(delta);

        this.update_sprite();
    }

    update_sprite() {
        this._sprite.x = this.x;
        this._sprite.y = this.y;

        //-90 because the tank sprite is rotated down
        this._sprite.angle = this.angle - 90;
    }

    update_movement(delta) {
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
            // normalize control vector and scale by speed
            controlVector.scale(this.speed / controlVectorLength * delta);

            let targetAngle = controlVector.angle() * 180 / Math.PI;
            this.angle = targetAngle;

            // alternative:
            // let targetAngle = Math.atan2(controlVector.y, controlVector.x) * 180 / Math.PI;
        }

        this.x += controlVector.x;
        this.y += controlVector.y;
    }

    update_shooting(delta) {
        if (this.shootTimer > 0) {
            this.shootTimer -= delta;
        }
        else if(this._shootButton.isDown){
            this.shootTimer = 0.5;
            this.spawn_bullet();
        }
    }

    spawn_bullet(){
        let bullet = new Bullet(this._game, this);
    }
}