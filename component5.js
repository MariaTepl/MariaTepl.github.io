AFRAME.registerComponent('game', {
    schema: {
        timerDuration: { type: 'int', default: 60 }
    },

    init() {
        this.score = 0;
        this.timer = this.data.timerDuration;
        this.gameOver = false;

        // Start the timer
        this.startTimer();

        // Set up collision detection
        const objects = document.querySelectorAll('.object');
        objects.forEach(obj => {
            obj.addEventListener('collide', (event) => {
                if (event.detail.body.el.id === 'rightHand') {
                    this.collectObject(obj);
                }
            });
        });
    },

    collectObject(object) {
        if (this.gameOver) return;

        // Increase score and remove object
        this.score++;
        object.parentNode.removeChild(object);
        
        // Update score display
        document.getElementById('scoreText').setAttribute('value', `Score: ${this.score}`);
        
        // Check for end of game condition (optional)
    },

    startTimer() {
        const timerInterval = setInterval(() => {
            if (this.gameOver) {
                clearInterval(timerInterval);
                return;
            }

            this.timer--;
            document.getElementById('timerText').setAttribute('value', `Time: ${this.timer}`);

            if (this.timer <= 0) {
                this.endGame();
                clearInterval(timerInterval);
            }
        }, 1000);
    },

    endGame() {
        this.gameOver = true;
        
        // Display game over message
        document.getElementById('finalScore').innerText = `Final Score: ${this.score}`;
        document.getElementById('gameOverMessage').style.display = 'block';
    }
});

// Restart game function
function restartGame() {
    location.reload(); // Reload the page to restart the game
}
