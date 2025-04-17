import './styles.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ToggleTheme from './components/ToggleTheme'

class App{
    constructor(){
        this.toogleTheme = new ToggleTheme()
    }
}

new App()

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