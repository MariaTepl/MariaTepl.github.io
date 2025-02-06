AFRAME.registerComponent('collectible', {
    init: function () {
        this.el.addEventListener('click', () => {
            this.el.parentNode.removeChild(this.el);
            let scoreElement = document.querySelector('#score');
            document.querySelector('#collectSound').components.sound.playSound();
            let score = parseInt(scoreElement.getAttribute('value').split(': ')[1]) + 1;
            scoreElement.setAttribute('value', 'Score: ' + score);
        });
    }
});

AFRAME.registerComponent('proximity-check', {
    schema: {
        playerId: { type: 'string', default: 'player' },
        range: { type: 'number', default: 1 }
    },
    init: function () {
        this.player = document.getElementById(this.data.playerId);
    },
    tick: function () {
        if (!this.player) return;

        const objectPosition = this.el.object3D.position;
        const playerPosition = this.player.object3D.position;
        const distance = objectPosition.distanceTo(playerPosition);

        if (distance <= this.data.range) {
            this.collect();
        }
    },
    collect: function () {
        this.el.setAttribute('visible', false);
        updateScore();
        respawnCollectible(this.el);

        const collectSound = document.getElementById('collectSound');
        collectSound.components.sound.playSound();

        const explosion = document.getElementById('explosion');
        explosion.setAttribute('position', this.el.getAttribute('position'));
        explosion.setAttribute('particle-system', 'preset: explosion; color: white; enabled: true');
        setTimeout(() => {
            explosion.setAttribute('particle-system', 'enabled: false');
        }, 1000);
    }
});

let score = 0;

function updateScore() {
    score += 1;
    document.querySelector('#score').setAttribute('value', 'Score: ' + score);
}

function respawnCollectible(collectible) {
    const x = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    collectible.setAttribute('position', { x: x, y: 1, z: z });
    collectible.setAttribute('visible', true);
}

function randomizeObjectPositions() {
    const objects = document.querySelectorAll('.collidable');
    objects.forEach(obj => {
        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        obj.setAttribute('position', { x: x, y: 1, z: z });
    });
}

window.addEventListener('load', randomizeObjectPositions);

let timeLeft = 60;
let timerElement = document.querySelector('#timer');

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.setAttribute('value', 'Time: ' + timeLeft);
    } else {
        endGame();
    }
}

setInterval(updateTimer, 1000);

function endGame() {
    let finalScore = parseInt(document.querySelector('#score').getAttribute('value').split(': ')[1]);
    let gameOverText = document.querySelector('#gameOverText');
    gameOverText.setAttribute('value', 'Game Over! Your final score is: ' + finalScore);
    // location.reload();
}

document.querySelectorAll('.collidable').forEach(el => {
    el.setAttribute('proximity-check', '');
});
