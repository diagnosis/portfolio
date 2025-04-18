import './styles.css';
import projectsList from './components/Projects';
import ToggleTheme from './components/ToggleTheme';
import { fetchProjects, fetchSkills } from './cms/sanityClient.js';
import { ProjectDetails } from './components/ProjectDetails.js';
import { ContactForm } from './components/ContactForm.js';
import skillsList from './components/Skills.js';

class App {
    constructor() {
        this.toggleTheme = new ToggleTheme();
        this.contactForm = new ContactForm();
        this.renderProjects();
        this.renderSkills();
        this.contactForm.initialize();
        document.addEventListener('DOMContentLoaded', () => {
            this.setupOffcanvasClose();
        });
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

    async renderSkills() {
        const skillsData = await fetchSkills();
        console.log('Fetched skills:', skillsData);
        if (!skillsData || skillsData.length === 0) {
            console.error('No skills fetched from Sanity');
            return;
        }
        skillsList.setSkills(skillsData);
        skillsList.render();
    }


    async setupOffcanvasClose() {
        // Dynamically import Bootstrap Offcanvas
        const { Offcanvas } = await import('bootstrap');
        const sectionLinks = document.querySelectorAll('.section-link');
        sectionLinks.forEach(link => {
            link.addEventListener('click', () => {
                const offcanvasElement = document.getElementById('navbarOffcanvas');
                if (offcanvasElement) {
                    const offcanvas = Offcanvas.getInstance(offcanvasElement) || new Offcanvas(offcanvasElement);
                    offcanvas.hide();
                    // Ensure the page scrolls to the section after closing
                    setTimeout(() => {
                        const targetId = link.getAttribute('href').substring(1); // e.g., "home"
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 300); // Delay to allow offcanvas animation to complete
                }
            });
        });
    }
}

new App();