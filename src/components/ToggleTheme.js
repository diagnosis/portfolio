class ToggleTheme {
    constructor() {
        this._body = document.body;
        this._currentTheme = this._body.getAttribute('data-theme');
        this._moonIcon = document.querySelector('.theme-toggle i');
        // Bind the toggleTheme method to the class instance
        document.querySelector('.theme-toggle').addEventListener('click', this.toggleTheme.bind(this));
    }

    toggleTheme() {
        if (this._currentTheme === 'dark') {
            this._body.removeAttribute('data-theme');
            this._moonIcon.classList.remove('fa-sun');
            this._moonIcon.classList.add('fa-moon');
            this._currentTheme = null; // Update current theme
        } else {
            this._body.setAttribute('data-theme', 'dark');
            this._moonIcon.classList.remove('fa-moon');
            this._moonIcon.classList.add('fa-sun');
            this._currentTheme = 'dark'; // Update current theme
        }
    }
}

export default ToggleTheme;