

export class ProjectList {
    constructor(projects = []) {
        this.projects = projects;
    }

    render() {
        const projectListContainer = document.getElementById('project-list');
        const modalContainer = document.body;

        projectListContainer.innerHTML = this.projects.map(project => project.renderCard()).join('');

        this.projects.forEach(project => {
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = project.renderModal();
            modalContainer.appendChild(modalDiv);
        });
    }
}

const projectsList = new ProjectList();
export default projectsList;

