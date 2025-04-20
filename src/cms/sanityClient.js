const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_DATASET = 'production';
const SANITY_PROJECT_QUERY = '*[_type == "project"]{title, client, description, responsibilities, technologies, outcomes, links, tags, displayOrder} | order(displayOrder asc)';
const SANITY_SKILLS_QUERY = '*[_type == "skill"]{category, name, experience, level} | order(category asc)';

export async function fetchProjects() {
    try {
        const response = await fetch(
            `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}?query=${encodeURIComponent(SANITY_PROJECT_QUERY)}`,
            {
                headers: {
                    Authorization: `Bearer ${SANITY_TOKEN}`
                }
            }
        );
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching projects from Sanity:', error);
        return [];
    }
}

export async function fetchSkills() {
    try {
        const response = await fetch(
            `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}?query=${encodeURIComponent(SANITY_SKILLS_QUERY)}`,
            {
                headers: {
                    Authorization: `Bearer ${SANITY_TOKEN}`
                }
            }
        );
        if (!response.ok) throw new Error('Failed to fetch skills');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching skills from Sanity:', error);
        return [];
    }
}