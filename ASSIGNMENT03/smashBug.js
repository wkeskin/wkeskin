// Define BugSmasher class
class BugSmasher {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.score = 0;
    this.bugX = 0;
    this.bugY = 0;
    this.bugSize = 40; 
    this.bugSpeed = 1000; // milliseconds
    this.intervalId = null;
    this.ladybugImage = new Image();
    this.ladybugImage.src = 'https://th.bing.com/th/id/R.d3bf302935c29f4932668d86686a6000?rik=hFeRiQGA7UZVQw&riu=http%3a%2f%2fclipart-library.com%2fnew_gallery%2f37-379443_download-ladybug-png-picture-ladybug-clip-art.png&ehk=AucWzIAyVLbfIUIGuSFfnU3GVp%2f%2fmafW8SBFcvU3QTg%3d&risl=&pid=ImgRaw&r=0';
    this.canvas.addEventListener('click', this.handleClick.bind(this));
    this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
    this.resetScore = this.resetScore.bind(this);
    this.resetSpeed = this.resetSpeed.bind(this);
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.checkBugCollision(x, y);
  }

  handleTouch(event) {
    event.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;
    this.checkBugCollision(x, y);
  }

  checkBugCollision(x, y) {
    if (x >= this.bugX && x <= this.bugX + this.bugSize && y >= this.bugY && y <= this.bugY + this.bugSize) {
      this.score++;
      this.decreaseSpeed();
      this.drawBug();
    }
  }

  decreaseSpeed() {
    this.bugSpeed -= 50;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.moveBug.bind(this), this.bugSpeed);
  }

  resetScore() {
    this.score = 0;
    this.drawBug();
  }

  resetSpeed() {
    this.bugSpeed = 1000;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.moveBug.bind(this), this.bugSpeed);
    this.drawBug();
  }

  drawBug() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bugX = Math.floor(Math.random() * (this.canvas.width - this.bugSize));
    this.bugY = Math.floor(Math.random() * (this.canvas.height - this.bugSize));
    this.ctx.drawImage(this.ladybugImage, this.bugX, this.bugY, this.bugSize, this.bugSize);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Score: ' + this.score, 10, 20);
    //styling the score font
    this.ctx.font = 'bold medium Arial';
  }

  moveBug() {
    this.drawBug();
  }

  startGame() {
    this.intervalId = setInterval(this.moveBug.bind(this), this.bugSpeed);
  }
}

// Instantiate BugSmasher object and start the game
const bugSmasher = new BugSmasher('gameCanvas');
bugSmasher.startGame();

// Add event listeners to buttons (enabling the buttons function)
document.getElementById('resetScore').addEventListener('click', bugSmasher.resetScore);
document.getElementById('resetSpeed').addEventListener('click', bugSmasher.resetSpeed);
