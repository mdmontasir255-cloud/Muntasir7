// Confetti Animation
class ConfettiGenerator {
    constructor() {
        this.confettiPieces = [];
        this.container = document.getElementById('confetti-container');
        this.colors = ['#667eea', '#764ba2', '#ff6b9d', '#ffa500', '#ff1493', '#00ff00', '#00ced1', '#ffd700'];
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        const xPos = Math.random() * window.innerWidth;
        confetti.style.left = xPos + 'px';
        confetti.style.top = '-10px';
        
        const randomSize = Math.random() * 8 + 5;
        confetti.style.width = randomSize + 'px';
        confetti.style.height = randomSize + 'px';
        
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        
        this.container.appendChild(confetti);
        
        const duration = Math.random() * 2000 + 2000;
        const xMove = (Math.random() - 0.5) * 300;
        
        let time = 0;
        const startTime = Date.now();
        
        const animate = () => {
            time = Date.now() - startTime;
            const progress = time / duration;
            
            if (progress > 1) {
                confetti.remove();
                return;
            }
            
            const y = progress * window.innerHeight;
            const x = xPos + xMove * progress;
            const rotation = progress * 360 * 3;
            
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            confetti.style.opacity = Math.max(0, 1 - progress) * (Math.random() * 0.5 + 0.5);
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    start() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 30);
        }
    }

    loop() {
        this.start();
        setInterval(() => {
            this.start();
        }, 5000);
    }
}

// Initialize confetti when page loads
document.addEventListener('DOMContentLoaded', function() {
    const confettiGenerator = new ConfettiGenerator();
    confettiGenerator.loop();
    
    // Add click event to create confetti
    document.body.addEventListener('click', function(e) {
        // Create burst of confetti from click position
        const burst = new ConfettiGenerator();
        for (let i = 0; i < 20; i++) {
            burst.createConfetti();
        }
    });

    // Add scroll effect
    window.addEventListener('scroll', function() {
        const card = document.querySelector('.card');
        const scrollPosition = window.scrollY;
        card.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Stagger wish items animation
    const wishes = document.querySelectorAll('.wish-item');
    wishes.forEach((wish, index) => {
        wish.style.animationDelay = (index * 0.1) + 's';
    });
});

// Play sound effect (optional - uses Web Audio API)
function playCelebrationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        // Create a simple celebration "beep" sound
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Trigger celebration on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        playCelebrationSound();
    }, 500);
});

// Keyboard event - press SPACE to create confetti
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        const burst = new ConfettiGenerator();
        for (let i = 0; i < 30; i++) {
            burst.createConfetti();
        }
        playCelebrationSound();
    }
});
