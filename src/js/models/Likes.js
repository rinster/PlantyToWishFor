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

    addLike(id, name, careLevel, price) {
        const like ={ 
            id,
            name,
            careLevel,
            price
        }
        this.likes.push(like);
        return like;
    }
}