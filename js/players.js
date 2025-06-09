/* filepath: c:\Users\umart\OneDrive\Documents\FOOTBALLBUDDYWEB\footballbuddy.xyz\js\players.js */
document.addEventListener('DOMContentLoaded', function() {
    const players = [
        { name: 'Lionel Messi', position: 'forward', image: 'https://via.placeholder.com/200x250', profile: 'messi.html' },
        { name: 'Cristiano Ronaldo', position: 'forward', image: 'https://via.placeholder.com/200x250', profile: 'ronaldo.html' },
        { name: 'Neymar Jr.', position: 'forward', image: 'https://via.placeholder.com/200x250', profile: 'neymar.html' },
        { name: 'Virgil van Dijk', position: 'defender', image: 'https://via.placeholder.com/200x250', profile: 'vandijk.html' },
        { name: 'Kevin De Bruyne', position: 'midfielder', image: 'https://via.placeholder.com/200x250', profile: 'debruyne.html' }
    ];

    const searchInput = document.getElementById('search-input');
    const positionFilter = document.getElementById('position-filter');
    const playerGrid = document.getElementById('player-grid');

    function displayPlayers(filteredPlayers) {
        playerGrid.innerHTML = '';
        filteredPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');
            playerCard.innerHTML = `
                <img src="${player.image}" alt="${player.name}">
                <h3>${player.name}</h3>
                <p>${player.position}</p>
                <a href="pages/${player.profile}">View Profile</a>
            `;
            playerGrid.appendChild(playerCard);
        });
    }

    function filterPlayers() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedPosition = positionFilter.value;

        const filteredPlayers = players.filter(player => {
            const nameMatch = player.name.toLowerCase().includes(searchTerm);
            const positionMatch = selectedPosition === '' || player.position === selectedPosition;
            return nameMatch && positionMatch;
        });

        displayPlayers(filteredPlayers);
    }

    searchInput.addEventListener('keyup', filterPlayers);
    positionFilter.addEventListener('change', filterPlayers);

    displayPlayers(players);
});