const mainContainer = document.querySelector('.posts-container');
let postCount = 0; // To track how many posts are currently loaded
const postsPerLoad = 10; // How many posts to load per fetch
let isLoading = false; // To prevent multiple fetch calls at once

// Function to fetch and display posts
function loadPosts() {
  if (isLoading) return; 
  isLoading = true; 

  fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${postCount}&_limit=${postsPerLoad}`
  )
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const article = document.createElement('article');

        const title = document.createElement('h2');
        title.textContent = post.title;

        const body = document.createElement('p');
        body.textContent = post.body;

        article.appendChild(title);
        article.appendChild(body);
        document.querySelector('.posts-container').appendChild(article);
      });

      postCount += postsPerLoad; // Increment the post count
      isLoading = false; // Reset loading state
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
}

// Function to check if the user has scrolled near the bottom of the page
function handleScroll() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const bottomThreshold = document.body.offsetHeight - 50;
  if (scrollPosition >= bottomThreshold) {
    loadPosts(); 
  }
}

window.addEventListener('scroll', handleScroll);
loadPosts();
