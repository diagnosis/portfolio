export class SkillDetails {
    constructor(category, name, experience, level) {
        this.category = category;
        this.name = name;
        this.experience = experience;
        this.level = level;
    }

    render() {
        return `
      <li>
        <strong>${this.name}:</strong> ${this.level}
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: ${this.experience}%;" aria-valuenow="${this.experience}" aria-valuemin="0" aria-valuemax="100">${this.experience}%</div>
        </div>
      </li>
    `;
    }
}