AFRAME.registerComponent('collectible', {
    init: function () {
                this.el.addEventListener('click', () => {
                    this.el.parentNode.removeChild(this.el);
                    let scoreElement = document.querySelector('#score');
                    document.querySelector('#collectSound').components.sound.playSound();
                    let score = parseInt(scoreElement.getAttribute('value').split(': ')[1]) + 1;
                    scoreElement.setAttribute('value', 'Score: ' + score);
                });
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
        
        function randomizeObjectPositions() {
            const objects = document.querySelectorAll('.collidable');
            objects.forEach(obj => {
                const x = (Math.random() - 0.5) * 20;
                const z = (Math.random() - 0.5) * 20;
                obj.setAttribute('position', { x: x, y: 1, z: z });
            });
        }
            }
        });
