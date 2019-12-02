import { elements }  from './base'

//This function will only print one plant
// The rendering will happen here
const renderPlants = rarePlant => {
    
    const markup = `
        <div class="plant__grid__plantCard u-margin-bottom-medium">
            <h3 class="heading-tertiary u-margin-bottom-small">${rarePlant.common_name}</h3>
            <img src="${rarePlant.url_photo}" alt="${rarePlant.common_name}">
            <p>Care Level: ${rarePlant.care_level}</p>
            <p></p>
        </div>
        
    `;
    //Insert the markup 
    elements.plantList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = plants => {
    //Firsl loop through all the plants and call renderPLants function    
    plants.forEach(renderPlants);
}; 