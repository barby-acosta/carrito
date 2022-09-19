import { Producto } from './producto';
import { User } from './user';

export class Carrito {
    _id: string;
    estado: string;
    total: string;
    productos: Producto[];
    user: User;
}