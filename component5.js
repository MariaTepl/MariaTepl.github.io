AFRAME.registerComponent('collectible', {
            init: function () {
                this.el.addEventListener('click', () => {
                    this.el.parentNode.removeChild(this.el);

                    // Обновление счета
                    let scoreElement = document.querySelector('#score');
                    let score = parseInt(scoreElement.getAttribute('value').split(': ')[1]) + 1;
                    scoreElement.setAttribute('value', 'Score: ' + score);
                });
                let timeLeft = 60; //
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
                    location.reload();
                }
            }
        });
