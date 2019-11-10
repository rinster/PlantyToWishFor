import { Header } from './models/header';

import '../styles/scss/main.scss'; //IMPORT sass

let header = new Header();
let firstHeading = header.getFirstHeading();
console.log(firstHeading);

//Testing
console.log('Hello')