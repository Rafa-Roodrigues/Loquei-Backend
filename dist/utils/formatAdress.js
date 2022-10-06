"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAdress = void 0;
function formatAdress(adress) {
    const trimAdress = adress.trim();
    const splitAdress = trimAdress.split(' ');
    const capitalizedFirstLetter = splitAdress.map((text) => {
        const firstCapitalLetter = text[0].toUpperCase();
        return text.replace(text[0], firstCapitalLetter);
    });
    const adressFormated = capitalizedFirstLetter.join(' ');
    return adressFormated;
}
exports.formatAdress = formatAdress;
