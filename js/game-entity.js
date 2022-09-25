class GameEntity {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this._game = game;
        this._sprite = null;

        game.entities.push(this);
    }

    destroy() {
        let entities =  this._game.entities;
        const index = entities.indexOf(this);

        // if index is valid (i.e. != -1) remove the element
        if (index > -1) {
          entities.splice(index, 1);
        }

        this.on_destroy();
    }

    on_destroy() {
        if (this._sprite != null) {
            this._sprite.destroy();
        }
    }
}