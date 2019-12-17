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
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // TO DO: Persist this data
    }
}