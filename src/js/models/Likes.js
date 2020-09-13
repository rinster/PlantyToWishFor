import axios from 'axios';


export default class Likes {
    constructor() {
        this.likes = [];
    }

    async getPlantById(id) {
        try {
            const plantById = await axios(`/api/rarePlants/${id}`);
            this.results = plantById.data;
        } catch (error) {
            alert('Something went wrong getting plant by ID')
        }
    }

    addLike(id, photo, name, careLevel, price) {
        const like ={ 
            id,
            photo,
            name,
            careLevel,
            price
        }
        this.likes.push(like);
        this.persistData()
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        this.persistData()
    }

    //Check if item is liked
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    //Retrieve likes stored in local storage
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // Restore likes from the localStorage
        if(storage) this.likes = storage;
    }

}