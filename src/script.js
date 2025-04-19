import './styles.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import projectsList from './components/Projects';
import ToggleTheme from './components/ToggleTheme';
import { fetchProjects } from './cms/sanityClient.js';
import { ProjectDetails } from './components/ProjectDetails.js';
import { ContactForm } from './components/ContactForm.js';

class App {
    constructor() {
        this.toggleTheme = new ToggleTheme();
        this.contactForm = new ContactForm();
        this.renderProjects();
        this.contactForm.initialize();
    }

    async renderProjects() {
        const projectsData = await fetchProjects();
        console.log('Fetched projects:', projectsData);
        if (!projectsData || projectsData.length === 0) {
            console.error('No projects fetched from Sanity');
            return;
        }
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

new App();