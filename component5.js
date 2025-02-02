AFRAME.registerComponent('collectible', {
        init: function () {
            this.el.addEventListener('click', () => {
                this.el.parentNode.removeChild(this.el);
                let scoreElement = document.querySelector('[text][value^="Score:"]');
                if (scoreElement) {
                    let score = parseInt(scoreElement.getAttribute('text').value.split(': ')[1]) || 0;
                    scoreElement.setAttribute('text', { value: 'Score: ' + (score + 1) });
                }
            });
    
            let timeLeft = 60;
            let timerElement = document.querySelector('#timer');
    
            function updateTimer() {
                if (timeLeft > 0) {
                    timeLeft--;
                    if (timerElement) {
                        timerElement.setAttribute('text', { value: 'Time: ' + timeLeft });
                    }
                } else {
                    endGame();
                }
            }
    
            setInterval(updateTimer, 1000);
    
            function endGame() { 
                let finalScore = parseInt(document.querySelector('[text_value="Score: "]').getAttribute('text').value.split(': ')[1]); 
                alert('Game Over! Your final score is: ' + finalScore); 
                location.reload();
            }
        }
    });
