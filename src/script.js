import './styles.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import projectsList from './components/Projects';
import ToggleTheme from './components/ToggleTheme';
import { fetchProjects } from './cms/sanityClient.js';
import {ProjectDetails}  from './components/ProjectDetails';

class App {
    constructor() {
        this.toggleTheme = new ToggleTheme();
        this.renderProjects();
    }

    async renderProjects() {
        const projectsData = await fetchProjects();
        projectsList.projects = projectsData.map((item, index) => new ProjectDetails(
            `project${index + 1}`,
            item.title,
            item.client,
            item.description,
            item.responsibilities,
            item.technologies,
            item.outcomes,
            item.links || []
        ));
        projectsList.render();
    }
}
// Remove focus from toggler and manage body overflow
document.addEventListener('DOMContentLoaded', function () {
    const offcanvasElement = document.getElementById('navbarOffcanvas');
    const toggler = document.querySelector('.navbar-toggler');
    const body = document.body;

    offcanvasElement.addEventListener('show.bs.offcanvas', function () {
        body.classList.add('offcanvas-active');
    });

    offcanvasElement.addEventListener('hidden.bs.offcanvas', function () {
        body.classList.remove('offcanvas-active');
        if (toggler) {
            toggler.blur();
        }
    });
});

new App();