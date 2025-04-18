
import ProjectDetails from './ProjectDetails';
class ProjectList {
    constructor(projects) {
        this.projects = projects; // Array of ProjectDetails
    }

    // Render all cards and modals
    render() {
        const projectListContainer = document.getElementById('project-list');
        const modalContainer = document.body; // Append modals to body

        // Render cards
        projectListContainer.innerHTML = this.projects.map(project => project.renderCard()).join('');

        // Render modals
        this.projects.forEach(project => {
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = project.renderModal();
            modalContainer.appendChild(modalDiv);
        });
    }
}

// Initialize projects
const projects = [
    new ProjectDetails(
        'project1',
        'Companion App Test Automation',
        'Wizards of the Coast',
        'Automated testing for the Magic: The Gathering Companion App, enhancing gameplay support.',
        [
            'Integrated automated tests into CI pipelines (GitLab).',
            'Built automation for Android, iOS, and hybrid mobile apps.',
            'Used Sauce Labs and AWS Device Farm for multi-device testing.',
            'Developed BDD frameworks using Cucumber with TDD methodology.',
            'Created scalable test environments with AWS and Mac Stadium.',
            'Participated in Agile ceremonies and drove QA improvements.',
            'Led offshore and onsite teams in testing and documentation efforts.',
            'Provided support for regression, demos, and release readiness.',
            'Maintained automation suite and collaborated with cross-functional teams.',
            'Communicated daily status updates and managed test risks.'
        ],
        ['Kotlin', 'Java', 'Cucumber', 'Appium', 'JUnit', 'GitLab', 'AWS Device Farm', 'Sauce Labs', 'Mac Stadium', 'Jenkins'],
        'Achieved 95% test automation coverage, reduced regression testing time by 60%, and supported seamless event management for thousands of players.',
        [
            { href: 'https://apps.apple.com/us/app/magic-the-gathering-companion/id1455183046', type: 'ios', label: 'iOS App' },
            { href: 'https://play.google.com/store/apps/details?id=com.wizards.winter_orb&src=comp-app', type: 'android', label: 'Android App' }
        ]
    ),
    new ProjectDetails(
        'project2',
        'Health Connect Automation',
        'Providence Health Services',
        'Developed automation for a patient-facing healthcare app to streamline medical services.',
        [
            'Developed automation framework for Android, iOS, and Web using Java/JUnit.',
            'Built test plans and matrices for automation strategy.',
            'Integrated Bitrise CI for Android deployment testing.',
            'Automated deep linking and parallel app testing.',
            'Participated in Agile ceremonies and feature grooming.',
            'Contributed to Bug Bash sessions for quality analysis.',
            'Conducted demos highlighting automation impact.',
            'Collaborated with teams to ensure requirement alignment.'
        ],
        ['Java', 'JUnit', 'JavaScript', 'Appium', 'Selenium', 'Bitrise', 'Android Studio', 'Xcode'],
        'Automated 80% of functional tests, improved release cycle efficiency by 25%, and enhanced user experience for patient-facing features.',
        [
            { href: 'https://apps.apple.com/us/app/swedish-health-connect/id1131387262', type: 'ios', label: 'iOS App' },
            { href: 'https://play.google.com/store/apps/details?id=providence.nassau.mobile.swedishhealth', type: 'android', label: 'Android App' }
        ]
    ),
    new ProjectDetails(
        'project3',
        'ADP Migration Testing',
        'Sempra Energy',
        'Automated testing for HR and payroll system migration to ADP’s cloud platform.',
        [
            'Created test plans and test strategy documents.',
            'Automated tests using WebDriver and Cucumber.',
            'Triggered test builds via Jenkins/Bamboo.',
            'Ran automation on multiple browsers/devices via Sauce Labs.',
            'Participated in Agile ceremonies and sprint grooming.',
            'Reviewed framework code for optimization.'
        ],
        ['Java', 'Selenium WebDriver', 'Cucumber', 'Jenkins', 'Bamboo', 'Sauce Labs'],
        'Ensured 100% data integrity during migration, reduced manual testing effort by 40%, and supported a smooth transition for 5,000+ employees.',
        [] // No public link for internal project
    ),
    new ProjectDetails(
        'project4',
        'PMS Mobile App Testing',
        'Hilton',
        'Built automation for a staff-facing app to manage hotel operations and guest services.',
        [
            'Designed and executed functional requirement walkthroughs.',
            'Developed test strategy and test matrix from business specs.',
            'Built automation framework using Cucumber and Appium.',
            'Managed test builds with Jenkins/Bamboo.',
            'Mentored new QA hires and led daily team syncs.',
            'Communicated with offshore teams and stakeholders.'
        ],
        ['Java', 'Cucumber', 'Appium', 'Jenkins', 'Bamboo', 'Android Studio'],
        'Automated 70% of staff workflows, improved check-in process efficiency by 20%, and enhanced staff productivity across multiple hotels.',
        [] // No public link for internal project
    ),
    new ProjectDetails(
        'project5',
        'Japan Migration & UK Chip and PIN',
        'American Express',
        'Automated testing for system modernization and EMV-compliant card processing.',
        [
            'Built Selenium test automation suite in CI (Jenkins).',
            'Participated in backlog grooming and sprint planning.',
            'Created and maintained test metrics and reporting.',
            'Worked with offshore team for development/testing alignment.',
            'Presented user stories in daily SCRUM/demo meetings.',
            'Assisted in test case design and execution in Rally.'
        ],
        ['Java', 'Selenium', 'Spring Framework', 'Jenkins', 'Rally'],
        'Achieved 90% test automation for critical workflows, ensured compliance with regional standards, and supported successful launches in Japan and UK markets.',
        [] // No public link for internal project
    )
];

export  default new ProjectList(projects);
