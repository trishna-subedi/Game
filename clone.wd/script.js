// ======= Responsive Navigation =======
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('open');
});

// ======= Smooth Scroll for Navigation =======
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('active');
            navToggle.classList.remove('open');
        }
    });
});

// ======= Game Data (Library & Featured) =======
const gamesData = [
    {
        title: "Cyberpunk 2077",
        genre: ["rpg", "action"],
        genreDisplay: "RPG • Action",
        platform: ["pc", "ps5", "xbox"],
        image: "img1.jpg",
        rating: 4.2,
        description: "A futuristic open-world RPG set in Night City.",
        reviews: [
            { user: "Alex", text: "Amazing visuals and story!", stars: 5 },
            { user: "Sam", text: "Bugs at launch, but much improved now.", stars: 4 }
        ]
    },
    {
        title: "Forza Horizon 5",
        genre: ["racing", "open world"],
        genreDisplay: "Racing • Open World",
        platform: ["pc", "xbox"],
        image: "img2.jpg",
        rating: 4.8,
        description: "The ultimate open-world racing experience in Mexico.",
        reviews: [
            { user: "Jamie", text: "Best racing game ever!", stars: 5 }
        ]
    },
    {
        title: "God of War",
        genre: ["action", "adventure"],
        genreDisplay: "Action • Adventure",
        platform: ["ps5"],
        image: "img3.jpg",
        rating: 4.9,
        description: "Epic Norse adventure with Kratos and Atreus.",
        reviews: [
            { user: "Chris", text: "Masterpiece in storytelling.", stars: 5 }
        ]
    },
    {
        title: "Minecraft",
        genre: ["sandbox", "survival"],
        genreDisplay: "Sandbox • Survival",
        platform: ["pc", "ps5", "xbox", "nintendo"],
        image: "img4.jpg",
        rating: 4.7,
        description: "Build, explore, and survive in a blocky world.",
        reviews: [
            { user: "Taylor", text: "Endless creativity!", stars: 5 }
        ]
    },
    {
        title: "Roblox",
        genre: ["sandbox", "multiplayer"],
        genreDisplay: "Sandbox • Multiplayer",
        platform: ["pc"],
        image: "img5.jpg",
        rating: 4.6,
        description: "A platform for user-created games and experiences.",
        reviews: [
            { user: "Jordan", text: "So many games to try!", stars: 4 }
        ]
    },
    {
        title: "Fortnite",
        genre: ["battle royale", "shooter"],
        genreDisplay: "Battle Royale • Shooter",
        platform: ["pc", "ps5", "xbox", "nintendo"],
        image: "img6.jpg",
        rating: 4.5,
        description: "The iconic battle royale shooter with building.",
        reviews: [
            { user: "Morgan", text: "Fun with friends!", stars: 5 }
        ]
    }
];

// ======= Render Game Library =======
const gamesResults = document.getElementById('gamesResults');
function renderGames(games) {
    gamesResults.innerHTML = '';
    if (games.length === 0) {
        gamesResults.innerHTML = '<p>No games found.</p>';
        return;
    }
    games.forEach(game => {
        gamesResults.innerHTML += `
            <div class="game-card">
                <div class="game-image">
                    <img src="${game.image}" alt="${game.title}" class="game-img">
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p class="genre">${game.genreDisplay}</p>
                    <div class="rating">
                        <span class="stars">${getStars(game.rating)}</span>
                        <span class="score">${game.rating}/5</span>
                    </div>
                    <button class="view-game" data-title="${game.title}">View Details</button>
                </div>
            </div>
        `;
    });
}

// ======= Helper: Generate Star Icons =======
function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '<i class="fa-solid fa-star"></i>';
    if (half) stars += '<i class="fa-solid fa-star-half-alt"></i>';
    for (let i = full + half; i < 5; i++) stars += '<i class="fa-regular fa-star"></i>';
    return stars;
}

// ======= Search and Filter =======
const searchInput = document.getElementById('gameSearch');
const searchBtn = document.getElementById('searchBtn');
const genreFilter = document.getElementById('genreFilter');
const platformFilter = document.getElementById('platformFilter');

function filterGames() {
    const search = searchInput.value.trim().toLowerCase();
    const genre = genreFilter.value.trim().toLowerCase();
    const platform = platformFilter.value.trim().toLowerCase();

    const filtered = gamesData.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(search);
        const matchesGenre = !genre || game.genre.map(g => g.toLowerCase()).includes(genre);
        const matchesPlatform = !platform || game.platform.map(p => p.toLowerCase()).includes(platform);
        return matchesSearch && matchesGenre && matchesPlatform;
    });

    renderGames(filtered);
}

searchInput.addEventListener('input', filterGames);
searchBtn.addEventListener('click', filterGames);
genreFilter.addEventListener('change', filterGames);
platformFilter.addEventListener('change', filterGames);

// Initial render
renderGames(gamesData);

// ======= Modal for Game Details & Reviews =======
const modal = document.createElement('div');
modal.className = 'modal';
modal.style.display = 'none';
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body"></div>
    </div>
`;
document.body.appendChild(modal);

function showModal(gameTitle) {
    const game = gamesData.find(g => g.title === gameTitle);
    if (!game) return;
    modal.querySelector('.modal-body').innerHTML = `
        <h2>${game.title}</h2>
        <img src="${game.image}" alt="${game.title}" style="max-width:100%;border-radius:8px;margin:1rem 0;">
        <p><strong>Genre:</strong> ${game.genreDisplay}</p>
        <p><strong>Platforms:</strong> ${game.platform.join(', ')}</p>
        <p><strong>Rating:</strong> ${getStars(game.rating)} <span style="margin-left:8px;">${game.rating}/5</span></p>
        <p style="margin:1rem 0;">${game.description}</p>
        <h4>User Reviews</h4>
        <div class="reviews-list">
            ${game.reviews.length === 0 ? '<p>No reviews yet.</p>' : game.reviews.map(r => `
                <div class="review">
                    <strong>${r.user}</strong> 
                    <span class="stars">${getStars(r.stars)}</span>
                    <p>${r.text}</p>
                </div>
            `).join('')}
        </div>
        <form class="review-form" data-title="${game.title}">
            <h5>Add a Review</h5>
            <input type="text" name="user" placeholder="Your Name" required style="margin-bottom:6px;">
            <textarea name="text" placeholder="Your review..." required style="margin-bottom:6px;"></textarea>
            <select name="stars" required>
                <option value="">Rating</option>
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
            </select>
            <button type="submit" style="margin-top:8px;">Submit</button>
        </form>
    `;
    modal.style.display = 'flex';
}
modal.querySelector('.modal-close').onclick = () => { modal.style.display = 'none'; };
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

// Delegate for all "View Details" buttons (featured & library)
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-game')) {
        const title = e.target.getAttribute('data-title') || e.target.closest('.game-info').querySelector('h3').innerText;
        showModal(title);
    }
});

// ======= Handle Review Submission =======
modal.addEventListener('submit', function(e) {
    if (e.target.classList.contains('review-form')) {
        e.preventDefault();
        const form = e.target;
        const title = form.getAttribute('data-title');
        const user = form.user.value.trim() || "Anonymous";
        const text = form.text.value.trim();
        const stars = parseInt(form.stars.value, 10);
        if (!text || !stars) return;

        const game = gamesData.find(g => g.title === title);
        if (game) {
            game.reviews.push({ user, text, stars });
            showModal(title); // Refresh modal content
        }
    }
});

// ======= CTA Button Scroll to Games Section =======
document.querySelector('.cta-button').addEventListener('click', () => {
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
});

// ======= Modal Styles (Optional Enhancement) =======
const modalStyle = document.createElement('style');
modalStyle.innerHTML = `
.modal {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 2000;
}
.modal-content {
    background: #181818; color: #fff; padding: 2rem; border-radius: 12px; max-width: 400px; width: 90%; position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6); max-height: 90vh; overflow-y: auto;
}
.modal-close {
    position: absolute; top: 10px; right: 20px; font-size: 2rem; cursor: pointer; color: #00ff88;
}
.review {
    background: #232323; margin: 0.5rem 0; padding: 0.5rem; border-radius: 6px;
}
.review-form input, .review-form textarea, .review-form select {
    width: 100%; border-radius: 4px; border: none; padding: 6px; margin-bottom: 4px; background: #222; color: #fff;
}
.review-form button {
    background: #00ff88; color: #181818; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;
}
.review-form button:hover {
    background: #00cc66;
}
`;
document.head.appendChild(modalStyle);
