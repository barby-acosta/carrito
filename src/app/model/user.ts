import { Carrito } from './carrito';

export class User {
    _id: string;
    nombre: string;
    dni: string;
    carritos: Carrito[];
}