/* filepath: c:\Users\umart\OneDrive\Documents\FOOTBALLBUDDYWEB\footballbuddy.xyz\js\script.js */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website functionality
    init();

    function init() {
        setupEventListeners();
        loadLatestNews();
        startUpdatingScores();
        attachLinkAlerts();
    }

    function setupEventListeners() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                loadPage(page);
            });
        });
    }

    function loadPage(page) {
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => console.error('Error loading page:', error));
    }

    function loadLatestNews() {
        // Placeholder for loading latest news articles
        console.log('Loading latest news...');
    }

    function attachLinkAlerts() {
        const links = document.querySelectorAll('a');

        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                alert('This feature is under development!');
            });
        });
    }

    function startUpdatingScores() {
        setInterval(updateScores, 5000); // Update scores every 5 seconds
    }

    function updateScores() {
        const score1 = document.getElementById('score-1');
        const score2 = document.getElementById('score-2');
        const score3 = document.getElementById('score-3');

        score1.textContent = getRandomScore();
        score2.textContent = getRandomScore();
        score3.textContent = getRandomScore();
    }

    function getRandomScore() {
        const home = Math.floor(Math.random() * 5);
        const away = Math.floor(Math.random() * 5);
        return `${home} - ${away}`;
    }
});