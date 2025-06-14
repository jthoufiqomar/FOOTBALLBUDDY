// Supabase client initialization for FootballBuddy
// Replace with your own Supabase project URL and anon key
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fetch and display latest blog posts
document.addEventListener('DOMContentLoaded', async () => {
    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('id, title, content, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
    if (error) {
        console.error('Error fetching blog posts:', error);
        return;
    }
    const blogSection = document.getElementById('blog-section');
    if (blogSection && posts) {
        blogSection.innerHTML = posts.map(post => `
            <div class="blog-post card">
                <h3>${post.title}</h3>
                <div class="date">${new Date(post.created_at).toLocaleString()}</div>
                <p>${post.content}</p>
            </div>
        `).join('');
    }
});
