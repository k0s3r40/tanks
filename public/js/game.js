
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Game extends Phaser.Scene {
    constructor(map) {
        super({key: "Game"});
        this.speed = 5;
        this.env = [];
        this.entities = [];
        this.min_x = -100;
        this.min_y = -100;
        this.map = map
        this.player_tank = new PlayerTank(this);
    }

    preload() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].preload();
        }
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

    update(time,delta) {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(delta/1000);
        }
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
    scene: [new Game(map)]
}


var game = new Phaser.Game(config)
