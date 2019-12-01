// CLASS IMPORT =======================================
import { Header } from './models/header';
import Plants from './models/Plants';
import { elements }  from './views/base'

// STYLING & ASSET IMPORT =============================
import '../styles/scss/main.scss'; 

// IMAGE ASSET IMPORT ================================
import Logo from '../assets/images/plant_logo.png';

// FONT AWESOME IMPORT ===============================
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


let header = new Header();
let firstHeading = header.getFirstHeading();
console.log(firstHeading);


//Image import 
document.getElementById('logo').setAttribute('src', Logo);

// =================== EXPOSE STATE ==================================
// SIMPLE STATE MANAGEMENT - like REDUX
/**  GLOBAL STATE OF THE APP
  * - Search Object data
  * - Current recipe object data
  * - Shopping list object data
  * - Liked recipes data
**/
const state = {};
window.state = state; //expose the state to the window

// =================== PLANT CONTROLLER ===============================
const controlPlants = async () => {
    
    state.plants = new Plants();
    
    try {
        await state.plants.getPlants();
        console.log(state.plants.results);
    } catch(err) {
        console.log("Something went wrong getting the plants");
    }
}


// EVENT LISTENERS ====================================================
window.addEventListener('load', controlPlants); //On page load, get plants from API