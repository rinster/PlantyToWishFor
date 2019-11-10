import { Header } from './models/header';

import '../styles/scss/main.scss'; //IMPORT sass

import PMelano from '../assets/images/PMelano.jpg'; //image load test

let header = new Header();
let firstHeading = header.getFirstHeading();
console.log(firstHeading);

//Image import test
document.getElementById('PhiloMelano').setAttribute('src',PMelano)