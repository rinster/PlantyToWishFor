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
  * - Button Like state
**/
const state = {};
window.state = state; //expose the state to the window

// =================== PLANT CONTROLLER ===============================
const controlPlants = async () => {
    
    state.plants = new Plants();
    
    try {
        await state.plants.getPlants();
        plantsView.renderResults(state.plants.results, false);
    } catch(err) {
        console.log("Something went wrong getting the plants");
    }
};

// =================== LIKES BUTTON CONTROLLER ===============================
const handleLikeButtonsOnLoad = () => {
    const buttons = [...document.querySelectorAll('.plant__grid__plantCard__plantLike')];
    console.log(buttons);
    state.buttonsDOM = buttons;
    buttons.forEach(button => {
        let id = button.dataset.itemid;
        //console.log('button id:', id);
         if(state.likes.isLiked(id)) {
            //console.log('button is liked already', button);
            button.innerHTML = `
            <svg>
                <use href = "assets/images/icons.svg#icon-heart"></>
            </svg >`;
        } else {
            button.innerHTML = `
                <svg>
                    <use href = "assets/images/icons.svg#icon-heart-outlined"></>
                </svg >`;
        }
    });

    console.log(state.likes);
}

// =================== LIKES LIST CONTROLLER ===============================
const controlLike = async (id) => {
    //Initialize state management for LIKES
    if(!state.likes) state.likes = new Likes(); //only initialize if it doesn't exist yet
    
    //Grab plant id
    const plantID = id; 
    
    //console.log('buttonsDOM:', state.buttonsDOM);

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
    
        //Add to UI List
        likesView.renderLikes(newLike);

        let button = getSingleButton(plantID);
        button.innerHTML = `
                <svg>
                    <use href = "assets/images/icons.svg#icon-heart"></>
                </svg >`;

    } else {
    // ELSE USER has already liked the plant

        let button = getSingleButton(plantID);
        button.innerHTML = `
                <svg>
                    <use href = "assets/images/icons.svg#icon-heart-outlined"></>
                </svg >`;

        //Remove from UI - wishlist
        likesView.deleteItem(plantID);

        // Remove from state
        state.likes.deleteLike(plantID)
    }
    
};

const getSingleButton = (id) => {
    return state.buttonsDOM.find(button => button.dataset.itemid === id);
}

// EVENT LISTENER - LIKE <3 clicked ================================
elements.plantGridList.addEventListener('click', e => {
    
    const id = e.target.closest('.plant__grid__plantCard__plantLike').dataset.itemid;
    
    controlLike(id);
});

// EVENT LISTENER - WISHLIST =======================================
elements.plantWishList.addEventListener('click', e => {
    
    const id = e.target.closest('.plantWishlist__list__item').dataset.likeid;

    if (e.target.matches('.btn__delete, .btn__delete *')) {

        //Handle toggle heart like
        let button = getSingleButton(id);
        button.innerHTML = `
                <svg>
                    <use href = "assets/images/icons.svg#icon-heart-outlined"></>
                </svg >`;
        
        //Delete from state
        state.likes.deleteLike(id);
        //Delete from UI List
        likesView.deleteItem(id);
        
    }
});

// EVENT LISTENER - LIKES ON LOAD ================================
document.addEventListener('DOMContentLoaded', ()=> {
    //Initialize state management for LIKES
    state.likes = new Likes();

    //Restore likes - Restore liked recipes on page load
    state.likes.readStorage();

    //Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLikes(like));


    controlPlants().then(() => {
        handleLikeButtonsOnLoad();
    });
});
