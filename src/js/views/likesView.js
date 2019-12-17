import { elements } from './base';

export const renderLikes = like => {

    const markup = `
        <div class="plantWishlist__list__item" >
            <img src="${like.photo}" alt="${like.name}"/>
            <p>${like.name}</p>
            <button class="btn--delete">
                <svg>
                    <use href="assets/images/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </div>
    `;
    //Insert markup
    elements.plantWishList.insertAdjacentHTML('beforeend', markup);

};