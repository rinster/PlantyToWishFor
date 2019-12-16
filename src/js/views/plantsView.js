import { elements }  from './base'

//This function will only print one plant
// The rendering will happen here
const renderPlants = rarePlant => {
    
    const markup = `
        <div class="plant__grid__plantCard u-margin-bottom-medium" data-itemid="${rarePlant.id}">
            <h3 class="heading-tertiary u-margin-bottom-small">${rarePlant.common_name}</h3>
            <img src="${rarePlant.url_photo}" alt="${rarePlant.common_name}">
            <button class="plant__grid__plantCard__plantLike">
                <svg>
                    <use href="assets/images/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
            <p>Care Level: ${rarePlant.care_level}</p>
            <p>Market Price: $${rarePlant.price}</p>
        </div>
        
    `;
    //Insert the markup 
    elements.plantGridList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = plants => {
    //Firsl loop through all the plants and call renderPLants function    
    plants.forEach(renderPlants);
}; 