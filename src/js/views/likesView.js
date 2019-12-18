import { elements } from './base';


export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    elements.plantLikeBtn.setAttribute('href', `assets/images/icons.svg#${iconString}`)
};

export const renderLikes = like => {

    const markup = `
        <div class="plantWishlist__list__item" data-likeid="${like.id}">
            <img src="${like.photo}" alt="${like.name}"/>
            <p>${like.name}</p>
            <button class="btn__delete">
                <svg>
                    <use href="assets/images/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </div>
    `;
    //Insert markup
    elements.plantWishList.insertAdjacentHTML('beforeend', markup);

};

export const deleteItem = id => {
    //console.log('item deleting', id)
    const item = document.querySelector(`[data-likeid="${id}"]`);
    if(item) item.parentElement.removeChild(item);
};