document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const openFormButton = document.getElementById("openForm");
    const modal = document.getElementById("newBlogModal");
    const closeModalButton = document.getElementById("closeModal");
    const blogForm = document.getElementById("blogForm");
    const blogPostsContainer = document.getElementById("blogPosts");
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const initialPost1 = document.getElementById('initialPost1');
    const initialPost2 = document.getElementById('initialPost2');

    const posts = [initialPost1, initialPost2];
    let currentIndex = 0;

    // Event listener to open the form modal
    openFormButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Event listener to close the form modal
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    blogForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(blogForm);
        const category = formData.get("category");
        const title = formData.get("title");
        const date = formData.get("date");
        const content = formData.get("content");
        const image = formData.get("image");

        const reader = new FileReader();
        reader.onload = function (e) {
            const newPost = document.createElement("section");
            newPost.classList.add("post-title");

            const contentDiv = document.createElement("div");
            contentDiv.classList.add("content2");
            contentDiv.innerHTML = `
                <h3>${category}</h3>
                <h2 style="color: ${getRandomColor()};">${title}</h2>
                <p>${date}</p>
                <p id="post-id">${content}</p>
                <a href="#">Continue reading</a>
            `;

            const thumbnailDiv = document.createElement("div");
            thumbnailDiv.classList.add("thumbnail");

            const imgElement = document.createElement("img");
            imgElement.src = e.target.result;
            imgElement.alt = "Thumbnail";

            thumbnailDiv.appendChild(imgElement);

            newPost.appendChild(contentDiv);
            newPost.appendChild(thumbnailDiv);

            posts.unshift(newPost);

            updatePostsVisibility();

            modal.style.display = "none";
            blogForm.reset();
        };
        reader.readAsDataURL(image);
    });

    // Event listener to close the modal on button click
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Event listener for left arrow click
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updatePostsVisibility();
        }
    });

    // Event listener for right arrow click
    rightArrow.addEventListener('click', () => {
        if (currentIndex < posts.length - 2) {
            currentIndex++;
            updatePostsVisibility();
        }
    });

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to update the visibility of posts
    function updatePostsVisibility() {
        blogPostsContainer.querySelectorAll('.post-title, .featured-post').forEach(post => post.remove());

        for (let i = currentIndex; i < Math.min(currentIndex + 2, posts.length); i++) {
            blogPostsContainer.appendChild(posts[i]);
        }

        updateArrows();
    }

    
    function updateArrows() {
        leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
        rightArrow.style.display = currentIndex >= posts.length - 2 ? 'none' : 'block';
    }

  
    updatePostsVisibility();

    // Subscription logic
    let subscribeBtn = document.getElementById("subscribe");
    let subscribe = false;

    subscribeBtn.addEventListener('click', () => {
        if (subscribe) {
            subscribeBtn.innerHTML = "Subscribe";
            subscribe = false;
        } else {
            subscribeBtn.innerText = "Subscribed";
            subscribe = true;
        }
    });
});
