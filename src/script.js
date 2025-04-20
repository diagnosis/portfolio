import './styles.css';
import projectsList from './components/Projects';
import ToggleTheme from './components/ToggleTheme';
import { fetchProjects, fetchSkills } from './cms/sanityClient.js';
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
            this.setupAnalyticsEvents();
        });
    }

    async renderProjects() {
        try {
            const projectsData = await fetchProjects();
            console.log('Fetched projects:', projectsData); // Debug: Confirm data
            if (!projectsData || projectsData.length === 0) {
                console.error('No projects fetched from Sanity');
                return;
            }
            console.log('Calling setProjects with data:', projectsData); // Debug: Confirm method call
            projectsList.setProjects(projectsData);
            console.log('Rendering projectsList'); // Debug: Confirm render
            projectsList.render();
        } catch (error) {
            console.error('Error in renderProjects:', error);
        }
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
        const { Offcanvas } = await import('bootstrap');
        const sectionLinks = document.querySelectorAll('.section-link');
        sectionLinks.forEach(link => {
            link.addEventListener('click', () => {
                const offcanvasElement = document.getElementById('navbarOffcanvas');
                if (offcanvasElement) {
                    const offcanvas = Offcanvas.getInstance(offcanvasElement) || new Offcanvas(offcanvasElement);
                    offcanvas.hide();
                    setTimeout(() => {
                        const targetId = link.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 300);
                }
            });
        });
    }


}

new App();