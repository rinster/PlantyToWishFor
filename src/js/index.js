import Plants from './models/Plants';
import Likes from './models/Likes';
import * as plantsView from './views/plantsView';
import * as likesView from './views/likesView';

// STYLING & ASSET IMPORT =============================
import '../styles/scss/main.scss'; 
import Logo from '../assets/images/plant_logo.png';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import { elements } from './views/base';

//Image import 
document.getElementById('logo').setAttribute('src', Logo);

// =================== STATE MANAGEMENT ===============================
// SIMPLE STATE MANAGEMENT 
/**  GLOBAL STATE OF THE APP
  * - Rare Plant Data
  * - Liked Plants data
**/
const state = {};
window.state = state; //expose the state to the window

// =================== PLANT CONTROLLER ===============================
const controlPlants = async () => {
    
    state.plants = new Plants();
    
    try {
        await state.plants.getPlants();
        
        plantsView.renderResults(state.plants.results);
    } catch(err) {
        console.log("Something went wrong getting the plants");
    }
};


// EVENT LISTENER - GENERAL ====================================================
window.addEventListener('load', controlPlants); //On page load, get plants from API


// =================== LIKES CONTROLLER ===============================
const controlLike = async (id) => {
    //Initialize state management for LIKES
    if(!state.likes) state.likes = new Likes(); //only initialize if it doesn't exist yet
    
    //Grab plant id
    const plantID = id; 
   
    //Get plant data by ID
    try {
        await state.likes.getPlantById(plantID);
    } catch (error) {
        alert("something went wrong")
    };

    //Add like 
    const newLike = state.likes.addLike(
        plantID,
        state.likes.results.url_photo,
        state.likes.results.common_name,
        state.likes.results.care_level,
        state.likes.results.price
    );
    
    //Render UI
    likesView.renderLikes(newLike);


};

// EVENT LISTENER - LIKE <3 clicked ================================
elements.plantGridList.addEventListener('click', e => {
    const id = e.target.closest('.plant__grid__plantCard').dataset.itemid;
    //console.log('plantID grabbed:',id)
    controlLike(id);
});

// EVENT LISTENER - WISHLIST =======================================
elements.plantWishList.addEventListener('click', e => {
    const id = e.target.closest('.plantWishlist__list__item').dataset.likeid;

    if (e.target.matches('.btn__delete, .btn__delete *')) {
        //console.log('Delete clicked')
        
        //Delete from UI
        likesView.deleteItem(id);
        //Delete from state
        state.likes.deleteLike(id);
    }
});

// EVENT LISTENER - LIKES ON LOAD ================================
window.addEventListener('load', ()=> {
    //Initialize state management for LIKES
    //state.likes = new Likes();

    //TO DO: Render the existing likes

});
