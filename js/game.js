let map = [[8, 2, 3, 21, 12, 10, 14, 22, 5, 9, 9, 21, 16, 15, 16, 6, 15, 25, 3, 0], [24, 0, 16, 14, 14, 4, 23, 5, 16, 23, 22, 11, 5, 25, 19, 10, 9, 1, 15, 1], [13, 15, 0, 22, 8, 16, 20, 17, 21, 0, 21, 24, 13, 11, 20, 5, 0, 16, 18, 20], [8, 18, 24, 16, 3, 18, 13, 9, 12, 5, 6, 15, 1, 6, 25, 25, 3, 17, 13, 1], [1, 22, 4, 16, 8, 8, 6, 17, 15, 8, 23, 23, 18, 22, 21, 19, 18, 15, 13, 0], [17, 22, 9, 23, 10, 13, 12, 2, 5, 1, 19, 24, 21, 17, 23, 9, 15, 25, 6, 17], [8, 2, 21, 22, 5, 21, 15, 9, 6, 15, 10, 25, 16, 15, 8, 9, 4, 1, 22, 20], [13, 3, 3, 2, 8, 16, 18, 5, 13, 21, 13, 15, 22, 25, 13, 6, 15, 1, 5, 25], [19, 22, 16, 22, 20, 4, 19, 16, 24, 11, 11, 9, 19, 17, 19, 24, 13, 0, 1, 6], [14, 3, 17, 15, 2, 8, 6, 4, 2, 1, 9, 17, 14, 25, 2, 7, 8, 18, 10, 22], [3, 6, 2, 3, 0, 16, 23, 18, 10, 8, 24, 17, 3, 7, 1, 2, 18, 2, 10, 18], [13, 24, 12, 16, 9, 17, 21, 3, 10, 10, 19, 18, 5, 0, 11, 9, 17, 22, 5, 2], [7, 11, 1, 17, 8, 14, 25, 13, 6, 25, 22, 18, 9, 10, 20, 16, 9, 24, 20, 0], [2, 4, 21, 23, 0, 6, 20, 4, 7, 5, 24, 17, 21, 20, 24, 4, 5, 0, 23, 10], [20, 9, 1, 17, 1, 23, 9, 22, 9, 15, 3, 1, 13, 16, 14, 11, 8, 24, 10, 16], [6, 16, 2, 4, 19, 19, 7, 2, 15, 22, 2, 21, 7, 8, 23, 15, 20, 7, 13, 7], [7, 9, 16, 3, 9, 22, 11, 19, 1, 7, 1, 23, 4, 13, 8, 14, 19, 14, 23, 25], [16, 18, 14, 17, 6, 18, 10, 20, 12, 8, 22, 23, 15, 20, 13, 25, 16, 7, 24, 15], [5, 14, 14, 7, 13, 16, 24, 18, 9, 21, 22, 15, 22, 11, 11, 3, 22, 14, 22, 8], [9, 16, 18, 23, 19, 23, 5, 24, 2, 22, 10, 6, 7, 3, 20, 13, 22, 11, 8, 12]]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Game extends Phaser.Scene {
    constructor() {
        super({key: "Game"});
        this.speed = 5;
        this.env = [];
        this.min_x = -100;
        this.min_y = -100;
        this.player_tank = new PlayerTank(this);
    }

    preload() {
        this.player_tank.preload();
        this.load.spritesheet('Tiles', 'img/tiles.png', {frameWidth: 73, frameHeight: 73})
    }

    create() {
        this.player_tank.setup();
        this.init_map()

        this.cameras.main.startFollow(this.player_tank)
    }

    init_map() {
        var arrayLength = this.env.length;
        console.log(arrayLength)
        for (var i = 0; i < arrayLength; i++) {
            this.env[i].destroy();
        }
        this.env = [];

        let min_x = this.min_x;
        let x_counter = 0;
        for (let x = 0; x < 20 * 73; x += 73) {
            let min_y = this.min_y;
            let y_counter = 0;
            for (let y = 0; y < 20 * 73; y += 73) {
                let data = this.add.sprite(min_x, min_y, 'Tiles', map[x_counter][y_counter]);
                this.env.push(data)
                min_y += 73
                y_counter += 1;
            }
            min_x += 73
            x_counter++;

        }

    }

    compute_directions(is_forward = true) {
        let abs_angle = Math.abs(this.player_tank.sprite.angle)
        if (this.player_tank.sprite.angle > 0) {
            console.log('west')
            if (is_forward) {
                this.min_x += 10;
            } else {
                this.min_x -= 10;
            }


        }
        if (this.player_tank.sprite.angle < 0) {
            console.log('east')
            if (is_forward) {
                this.min_x -= 10;
            } else {
                this.min_x += 10;
            }
        }

        if (abs_angle > 90) {
            console.log('north')
            if (is_forward) {
                this.min_y += 10;
            } else {
                this.min_y -= 10;
            }
        }

        if (abs_angle < 90) {
            console.log('south')
            if (is_forward) {
                this.min_y -= 10;
            } else {
                this.min_y += 10;
            }
        }
    }

    update(delta) {
        this.player_tank.update(delta);
    }
}

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 800,
    transparent: true,
    backgroundColor: "#4488AA",
    antialias: false,
    physics: {
        default: 'arcade',
        arcade: {
            grabity: {y: 200},
            debug: true
        }
    },
    scene: [new Game()]
}


var game = new Phaser.Game(config)
