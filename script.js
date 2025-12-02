document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-list');

    // Function to create a project card HTML structure
    function createProjectCard(project) {
        const article = document.createElement('article');
        article.setAttribute('aria-labelledby', `project-${project.title.replace(/\s+/g, '-').toLowerCase()}`);

        // Create Image
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.alt || `Screenshot of ${project.title}`;
        img.style.borderRadius = 'var(--radius-md)';
        img.style.marginBottom = 'var(--spacing-md)';

        // Create Heading
        const h3 = document.createElement('h3');
        h3.id = `project-${project.title.replace(/\s+/g, '-').toLowerCase()}`;
        h3.textContent = project.title;

        // Create Description
        const p = document.createElement('p');
        p.textContent = project.description;

        // Create Tags
        const tagsContainer = document.createElement('div');
        tagsContainer.style.display = 'flex';
        tagsContainer.style.gap = '0.5rem';
        tagsContainer.style.marginBottom = '1rem';
        tagsContainer.style.flexWrap = 'wrap';

        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            span.style.backgroundColor = 'var(--bg-primary)';
            span.style.padding = '0.25rem 0.5rem';
            span.style.borderRadius = '4px';
            span.style.fontSize = '0.8rem';
            span.style.color = 'var(--accent-color)';
            span.style.border = '1px solid var(--border-color)';
            tagsContainer.appendChild(span);
        });

        // Create Link
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = 'View Project';
        link.setAttribute('aria-label', `View details for ${project.title}`);

        // Append elements to article
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(tagsContainer);
        article.appendChild(p);
        article.appendChild(link);

        return article;
    }

    // Fetch data from JSON file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Clear loading message
            projectsContainer.innerHTML = '';

            // Iterate through data and append cards
            data.forEach(project => {
                const card = createProjectCard(project);
                projectsContainer.appendChild(card);
            });
        })
        .catch(error => {
            // Display user-friendly error message
            projectsContainer.innerHTML = `
                <div style="color: #ef4444; padding: 1rem; border: 1px solid #ef4444; border-radius: 8px;">
                    <h3>Error Loading Projects</h3>
                    <p>Sorry, we couldn't load the projects at this time. Please try again later.</p>
                </div>
            `;
        });
});
