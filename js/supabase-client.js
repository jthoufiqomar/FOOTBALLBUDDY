// Supabase client initialization for FootballBuddy
// Replace with your own Supabase project URL and anon key
const SUPABASE_URL = 'https://torbsvlkobcevnzoofly.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcmJzdmxrb2JjZXZuem9vZmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDE0MDYsImV4cCI6MjA2NTQ3NzQwNn0.Te4Ehl-AFL2ZbY9nzqWpJOnsZFJYFpQ5YCGGm_yFsdU';

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

// Sign up
async function signUp(email, password) {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error('Sign up error:', error.message);
        alert('Sign up failed: ' + error.message);
        return null;
    }
    alert('Sign up successful! Please check your email to confirm.');
    return user;
}

// Sign in
async function signIn(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error('Sign in error:', error.message);
        alert('Sign in failed: ' + error.message);
        return null;
    }
    alert('Sign in successful!');
    return user;
}
