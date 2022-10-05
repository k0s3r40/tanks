class Bullet extends GameEntity {
    constructor(game, tank) {
        super(game);
        this.speed = 350;
        this.x = tank.x;
        this.y = tank.y;
        this.angle = tank.angle
        this.lifetime = 5;

        this._sprite = game.add.image(this.x, this.y, 'Bullet');
        this._sprite.angle = this.angle;

        let angleRad = this.angle / 180 * Math.PI;
        this.directionX = Math.cos(angleRad);
        this.directionY = Math.sin(angleRad);
    }

    update(delta) {
        this.x += this.directionX * this.speed * delta;
        this.y += this.directionY * this.speed * delta;

        this._sprite.x = this.x;
        this._sprite.y = this.y;

        this.lifetime -= delta;
        if (this.lifetime <= 0) {
            this.destroy();
        }
    }
}