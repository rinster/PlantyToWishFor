import axios from 'axios';

export default class Plants {
    constructor() {
    }

    async getPlants() {
        try {
            const res = await axios(`/api/rarePlants`);
            this.results = res.data;
            //console.log('results', this.results)
        } catch (error) {
            console.log(error);
            alert('Something is wrong with the GET Plants API')
        } 
    }

}