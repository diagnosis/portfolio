import {ProjectDetails} from "./ProjectDetails";

class Projects {
    constructor() {
        this.projects = [];
    }

    setProjects(projectsData) {
        this.projects = projectsData.map((item, index) => new ProjectDetails(
            `project${index + 1}`,
            item.title,
            item.client,
            item.description,
            item.responsibilities,
            item.technologies,
            item.outcomes,
            item.links || [],
            item.tags || []
        ));
    }

    render() {
        const projectList = document.getElementById('project-list');
        if (!projectList) return;

        projectList.innerHTML = '';
        this.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'col-md-4 mb-4';
            projectCard.innerHTML = `
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#${project.id}">
          <div class="card-body">
            <h5 class="card-title">${project.title}</h5>
            <p class="card-text">${project.client}</p>
            ${project.tags && project.tags.length > 0 ? `
              <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag project-tag-${tag.toLowerCase()}">${tag}</span>`).join(' ')}
              </div>
            ` : ''}
          </div>
        </div>
      `;
            projectList.appendChild(projectCard);

            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = project.id;
            modal.tabIndex = -1;
            modal.setAttribute('aria-labelledby', `${project.id}Label`);
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${project.id}Label">${project.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h6>Client</h6>
              <p>${project.client}</p>
              <h6>Description</h6>
              <p>${project.description}</p>
              <h6>Responsibilities</h6>
              <ul>
                ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
              </ul>
              <h6>Technologies</h6>
              <p>${project.technologies.join(', ')}</p>
              <h6>Outcomes</h6>
              <p>${project.outcomes}</p>
              ${project.links.length > 0 ? `
                <h6>Links</h6>
                <ul>
                  ${project.links.map(link => `<li><a href="${link.href}" target="_blank">${link.label}</a> (${link.type})</li>`).join('')}
                </ul>
              ` : ''}
              ${project.tags && project.tags.length > 0 ? `
                <h6>Tags</h6>
                <p>${project.tags.join(', ')}</p>
              ` : ''}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      `;
            document.body.appendChild(modal);
        });
    }
}

export default new Projects();