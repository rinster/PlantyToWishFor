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
   
    // IF USER has NOT Liked the plant yet
    if(!state.likes.isLiked(plantID)) {
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

        // TO DO: Toggle heart button on
        //likesView.toggleLikeBtn(true);
    
        //Add to UI
        likesView.renderLikes(newLike);

    } else {
    // ELSE USER has already liked the plant

        //Remove from UI
        likesView.deleteItem(plantID);

        // TO DO: Toggle heart button off
        //likesView.toggleLikeBtn(false)

        // Remove from state
        state.likes.deleteLike(plantID)
    }
    
};

// EVENT LISTENER - LIKE <3 clicked ================================
elements.plantGridList.addEventListener('click', e => {
    
    const id = e.target.closest('.plant__grid__plantCard').dataset.itemid;
    
    controlLike(id);
});

// EVENT LISTENER - WISHLIST =======================================
elements.plantWishList.addEventListener('click', e => {
    
    const id = e.target.closest('.plantWishlist__list__item').dataset.likeid;

    if (e.target.matches('.btn__delete, .btn__delete *')) {
        
        //Delete from UI
        likesView.deleteItem(id);
        //Delete from state
        state.likes.deleteLike(id);
    }
});

// EVENT LISTENER - LIKES ON LOAD ================================
window.addEventListener('load', ()=> {
    //Initialize state management for LIKES
    state.likes = new Likes();

    //Restore likes - Restore liked recipes on page load
    state.likes.readStorage();

    //Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLikes(like));

});
