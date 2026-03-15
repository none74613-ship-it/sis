// -------------------- Wishes --------------------
const wishes = [
    "❤️ Happy Birthday to my amazing sister, my forever friend and partner in crime! ❤️",
    "❤️ Wishing my sister a day full of love, laughter, and endless happiness! ❤️",
    "❤️ To the most wonderful sister, may your birthday be as bright as your smile! ❤️",
    "❤️ Happy Birthday, sis! Keep shining and chasing your dreams fearlessly. ❤️",
    "❤️ Wishing my sister a magical day filled with joy and surprises! ❤️",
    "❤️ Happy Birthday to my lifelong buddy and incredible sister! ❤️",
    "❤️ May your birthday be as sweet, special, and sparkling as you are! ❤️",
    "❤️ Cheers to another year of fun, laughter, and unforgettable memories! ❤️",
    "❤️ Happy Birthday, sister! You make life more colorful just by being you. ❤️",
    "❤️ To my sister, my heart, my smile—have the happiest birthday ever! ❤️",
    "❤️ Wishing you endless happiness, today and always, my dear sister! ❤️",
    "❤️ Happy Birthday to the one who knows me best and loves me anyway! ❤️",
    "❤️ May your birthday be full of love, laughter, and everything you wish for! ❤️",
    "❤️ To my sister, my superhero in disguise—have an amazing birthday! ❤️",
    "❤️ Happy Birthday! Thank you for being my sister, my guide, and my friend. ❤️",
    "❤️ Wishing you a day as beautiful, bright, and amazing as your soul! ❤️",
    "❤️ Happy Birthday, sis! May all your dreams take flight this year. ❤️",
    "❤️ To my sister, my joy, my laughter—celebrate big and shine brighter! ❤️",
    "❤️ Cheers to my incredible sister—happy birthday and endless blessings! ❤️"
];

const specialWishes = [
    "💖 I pray from my heart that ABD remains yours forever and that there is immense love between you two. May you and ABD prosper greatly. Ameen 💖",
    "In the end, I just want to say this is very very very very much, no matter how much I say, it will be less, thank you so so much, you have fulfilled the void of a sister that I used to feel in my life."
];

// -------------------- Elements --------------------
const giftBox = document.getElementById('giftBox');
const giftScreen = document.getElementById('giftScreen');
const mainContainer = document.getElementById('mainContainer');
const container = document.getElementById('wishesContainer');
const popSound = document.getElementById('popSound');
const blastSound = document.getElementById('blastSound');
const bgMusic = document.getElementById('bgMusic');

// -------------------- Gift Box Click --------------------
giftBox.addEventListener('click', () => {
    giftScreen.style.display = 'none';
    mainContainer.style.display = 'block';
    bgMusic.currentTime = 0;
    bgMusic.play();
    showWishesSequentially(0);
});

// -------------------- Show Wishes --------------------
function showWishesSequentially(index) {
    if (index >= wishes.length) {
        showSpecialWishes(0);
        return;
    }

    container.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'wish';
    p.textContent = wishes[index];
    container.appendChild(p);

    popSound.currentTime = 0;
    popSound.play();

    setTimeout(() => {
        showWishesSequentially(index + 1);
    }, 5000);
}

function showSpecialWishes(index) {
    if (index >= specialWishes.length) {
        triggerGrandCelebration();
        return;
    }

    container.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'wish';
    p.textContent = specialWishes[index];
    container.appendChild(p);

    popSound.currentTime = 0;
    popSound.play();

    setTimeout(() => {
        showSpecialWishes(index + 1);
    }, 7000);
}

// -------------------- Canvas Effects --------------------
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = Math.random() * 20 + 20;
        this.speed = Math.random() * 1 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.color = type === "balloon" ? `hsl(${Math.random() * 360},70%,60%)` :
            type === "heart" ? `hsl(${Math.random() * 360},90%,70%)` :
                `hsl(${Math.random() * 360},100%,50%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 5;
    }
    update() {
        if (this.type !== "confetti") {
            this.y -= this.speed;
            this.x += Math.sin(this.angle) * 0.5;
            if (this.y + this.size < 0) this.y = canvas.height + this.size;
        } else {
            this.y += this.speed;
            this.x += Math.sin(this.angle) * 1;
            this.rotation += this.rotationSpeed;
            if (this.y - this.size > canvas.height) this.y = -this.size;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.type === "balloon") {
            ctx.ellipse(this.x, this.y, this.size / 2, this.size, 0, 0, Math.PI * 2);
        } else if (this.type === "heart") {
            const h = this.size * 0.3;
            ctx.moveTo(this.x, this.y + h);
            ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + h);
            ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + h) / 2, this.x, this.y + (this.size + h) / 2, this.x, this.y + this.size);
            ctx.bezierCurveTo(this.x, this.y + (this.size + h) / 2, this.x + this.size / 2, this.y + (this.size + h) / 2, this.x + this.size / 2, this.y + h);
            ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + h);
        } else { // confetti
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 4);
            ctx.restore();
        }
        ctx.fill();
    }
}

// initial balloons/hearts
for (let i = 0; i < 50; i++) {
    const type = Math.random() > 0.5 ? "balloon" : "heart";
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, type));
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// -------------------- Grand Celebration --------------------
function triggerGrandCelebration() {
    blastSound.currentTime = 0;
    blastSound.play();

    const celebrationParticles = [];
    for (let i = 0; i < 300; i++) {
        celebrationParticles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, "confetti"));
    }

    let duration = 0;
    function animateCelebration() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        celebrationParticles.forEach(p => { p.update(); p.draw(); });
        duration += 16;
        if (duration < 5000) requestAnimationFrame(animateCelebration);
    }
    animateCelebration();
}