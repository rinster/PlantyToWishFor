import { elements } from './base';

export const renderLikes = like => {

    const markup = `
        <div>${like.name}</div>
    `;
    //Insert markup
    elements.plantWishList.insertAdjacentHTML('beforeend', markup);

};