import { SkillDetails } from './SkillDetails.js';

class Skills {
    constructor() {
        this.skills = [];
        this.categories = [
            { name: 'Programming Languages', icon: 'fas fa-code', modalId: 'programmingLanguagesModal', categoryValue: 'programmingLanguages' },
            { name: 'Web Services', icon: 'fas fa-globe', modalId: 'webServicesModal', categoryValue: 'webServices' },
            { name: 'Frameworks', icon: 'fas fa-cogs', modalId: 'frameworksModal', categoryValue: 'frameworks' },
            { name: 'Tools', icon: 'fas fa-wrench', modalId: 'toolsModal', categoryValue: 'tools' },
            { name: 'Database', icon: 'fas fa-database', modalId: 'databaseModal', categoryValue: 'databases' },
            { name: 'Cloud', icon: 'fas fa-cloud', modalId: 'cloudModal', categoryValue: 'cloud' },
            { name: 'Other', icon: 'fas fa-ellipsis-h', modalId: 'otherModal', categoryValue: 'other' }
        ];
    }

    setSkills(skillsData) {
        this.skills = skillsData.map(skill => new SkillDetails(skill.category, skill.name, skill.experience, skill.level));
    }

    render() {
        const skillsContainer = document.getElementById('skills-list');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        this.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
        <div class="skill-category-card" data-bs-toggle="modal" data-bs-target="#${category.modalId}">
          <div class="card-body">
            <h5 class="card-title"><i class="${category.icon} me-2 skill-icon"></i>${category.name}</h5>
          </div>
        </div>
      `;
            skillsContainer.appendChild(card);

            // Create modal for the category
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = category.modalId;
            modal.tabIndex = -1;
            modal.setAttribute('aria-labelledby', `${category.modalId}Label`);
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${category.modalId}Label">${category.name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ul id="${category.modalId}-skills"></ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      `;
            document.body.appendChild(modal);

            // Render skills for this category in the modal
            const categorySkills = this.skills.filter(skill =>
                skill.category.toLowerCase() === category.categoryValue.toLowerCase()
            );
            const skillsList = document.getElementById(`${category.modalId}-skills`);
            if (categorySkills.length === 0) {
                skillsList.innerHTML = '<li>No skills available for this category.</li>';
            } else {
                categorySkills.forEach(skill => {
                    skillsList.innerHTML += skill.render();
                });
            }
        });
    }
}

export default new Skills();