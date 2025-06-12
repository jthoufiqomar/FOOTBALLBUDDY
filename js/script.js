/* filepath: c:\Users\umart\OneDrive\Documents\FOOTBALLBUDDYWEB\footballbuddy.xyz\js\script.js */
document.addEventListener('DOMContentLoaded', function() {
    // Blog storage and rendering (API version)
    async function fetchBlogs() {
        const blogList = document.getElementById('blog-list');
        blogList.innerHTML = '<p>Loading blogs...</p>';
        try {
            const res = await fetch('https://footballbuddy-backend.onrender.com/api/posts');
            const blogs = await res.json();
            blogList.innerHTML = blogs.length === 0 ? '<p>No blogs yet. Be the first to post!</p>' : '';
            blogs.forEach(blog => {
                const blogDiv = document.createElement('div');
                blogDiv.className = 'blog-post';
                blogDiv.innerHTML = `<h3>${blog.title}</h3><p class="date">${blog.date}</p><p>${blog.content}</p>`;
                blogList.appendChild(blogDiv);
            });
        } catch (err) {
            blogList.innerHTML = '<p>Failed to load blogs. Please try again later.</p>';
        }
    }

    // YouTube video update
    window.updateYouTubeLink = function() {
        const urlInput = document.getElementById('youtube-url').value;
        const frame = document.getElementById('youtube-frame');
        let videoId = '';
        try {
            const url = new URL(urlInput);
            if (url.hostname === 'youtu.be') {
                videoId = url.pathname.slice(1);
            } else if (url.hostname.includes('youtube.com')) {
                videoId = url.searchParams.get('v');
            }
        } catch (e) {
            const match = urlInput.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
            if (match) videoId = match[1];
        }
        if (videoId) {
            frame.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            alert('Please enter a valid YouTube URL.');
        }
    }

    // On blog page, fetch blogs on load
    if (document.getElementById('blog-list')) {
        fetchBlogs();
    }
});

async function addBlogPost() {
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    if (!title || !content) {
        alert('Please enter both a title and content.');
        return;
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTc0OTYzNTUzMywiZXhwIjoxNzQ5NzIxOTMzfQ.9D1Jtb9WTqq4SJt1BS83LOOsZA77YuxRrJDdNg370jg';
    try {
        const res = await fetch('https://footballbuddy-backend.onrender.com/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ title, content })
        });
        if (!res.ok) throw new Error('Failed to post blog');
        document.getElementById('blog-title').value = '';
        document.getElementById('blog-content').value = '';
        fetchBlogs();
    } catch (err) {
        alert('Failed to post blog. Please try again later.');
    }
}
window.addBlogPost = addBlogPost;