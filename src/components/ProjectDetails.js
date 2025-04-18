class ProjectDetails {
    constructor(id, title, client, description, responsibilities, technologies, outcomes, links) {
        this.id = id; // Unique identifier for modal (e.g., "project1")
        this.title = title;
        this.client = client;
        this.description = description;
        this.responsibilities = responsibilities; // Array of strings
        this.technologies = technologies; // Array of strings
        this.outcomes = outcomes;
        this.links = links; // Array of { href, type: 'web'|'ios'|'android', label }
    }

    // Render project card HTML
    renderCard() {
        return `
      <div class="col-md-4 mb-4">
        <div class="card project-card" data-bs-toggle="modal" data-bs-target="#${this.id}Modal">
          <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-client"><strong>Client:</strong> ${this.client}</p>
            <p class="card-text">${this.description}</p>
          </div>
        </div>
      </div>
    `;
    }

    // Render modal HTML
    renderModal() {
        const responsibilitiesList = this.responsibilities.map(resp => `<li>${resp}</li>`).join('');
        const linksHtml = this.links.length > 0
            ? `<p><strong>Links:</strong> ${this.links.map(link => `
          <a href="${link.href}" class="project-link" target="_blank">
            <i class="${link.type === 'web' ? 'fas fa-globe' : link.type === 'ios' ? 'fab fa-apple' : 'fab fa-android'}"></i>
            ${link.label}
          </a>`).join(' ')}</p>`
            : '';

        return `
      <div class="modal fade" id="${this.id}Modal" tabindex="-1" aria-labelledby="${this.id}ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${this.id}ModalLabel">${this.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>Client:</strong> ${this.client}</p>
              <p><strong>Description:</strong> ${this.description}</p>
              <p><strong>Responsibilities:</strong></p>
              <ul>${responsibilitiesList}</ul>
              <p><strong>Technologies:</strong> ${this.technologies.join(', ')}</p>
              <p><strong>Outcomes:</strong> ${this.outcomes}</p>
              ${linksHtml}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    }
}

export default ProjectDetails;