import './styles.css';
import projectsList from './components/Projects';
import ToggleTheme from './components/ToggleTheme';
import { fetchProjects, fetchSkills } from './cms/sanityClient.js';
import { ContactForm } from './components/ContactForm.js';
import skillsList from './components/Skills.js';

class App {
    constructor() {
        // Initialize GA only after consent
        if (localStorage.getItem('cookieConsent')) {
            this.initializeGoogleAnalytics();
        } else {
            window.addEventListener('cookieConsentGiven', () => {
                this.initializeGoogleAnalytics();
            });
        }
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

    initializeGoogleAnalytics() {
        // Dynamically load the gtag.js script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-VG3XX3VH93'; // Replace with your Measurement ID
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-VG3XX3VH93'); // Replace with your Measurement ID
    }

    async renderProjects() {
        try {
            const projectsData = await fetchProjects();
            console.log('Fetched projects:', projectsData);
            if (!projectsData || projectsData.length === 0) {
                console.error('No projects fetched from Sanity');
                return;
            }
            console.log('Calling setProjects with data:', projectsData);
            projectsList.setProjects(projectsData);
            console.log('Rendering projectsList');
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

    setupAnalyticsEvents() {
        // Ensure gtag is available before tracking events
        if (!window.gtag) return;

        // Track floating contact button clicks
        const floatingContactBtn = document.querySelector('.floating-contact-btn');
        if (floatingContactBtn) {
            floatingContactBtn.addEventListener('click', () => {
                window.gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Floating Contact Button',
                    'value': 1
                });
            });
        }

        // Track LuxSUV modal views
        const luxSuvModal = document.querySelector('#project1');
        if (luxSuvModal) {
            luxSuvModal.addEventListener('shown.bs.modal', () => {
                window.gtag('event', 'view', {
                    'event_category': 'Project',
                    'event_label': 'LuxSUV Modal',
                    'value': 1
                });
            });
        }

        // Track Contact form submissions
        const contactForm = document.querySelector('form[name="contact"]');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                window.gtag('event', 'submit', {
                    'event_category': 'Form',
                    'event_label': 'Contact Form Submission',
                    'value': 1
                });
            });
        }

        // Track Feedback form submissions
        const feedbackForm = document.querySelector('form[name="feedback"]');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', () => {
                window.gtag('event', 'submit', {
                    'event_category': 'Form',
                    'event_label': 'Feedback Form Submission',
                    'value': 1
                });
            });
        }

        // Track social link clicks
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                const platform = link.href.includes('linkedin') ? 'LinkedIn' :
                    link.href.includes('github') ? 'GitHub' :
                        link.href.includes('instagram') ? 'Instagram' : 'Unknown';
                window.gtag('event', 'click', {
                    'event_category': 'Social',
                    'event_label': `${platform} Link Click`,
                    'value': 1
                });
            });
        });
    }
}

new App();