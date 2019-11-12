// CLASS IMPORT =======================================
import { Header } from './models/header';

// STYLING & ASSET IMPORT =============================
import '../styles/scss/main.scss'; 

import PMelano from '../assets/images/PMelano.jpg'; //image load test


let header = new Header();
let firstHeading = header.getFirstHeading();
console.log(firstHeading);


//Image import test
document.getElementById('PhiloMelano').setAttribute('src',PMelano)