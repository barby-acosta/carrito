import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './model/producto';
import { Carrito } from './model/carrito';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private baseUrlProducts = 'http://localhost:8000/products';
  private baseUrlBaskets = 'http://localhost:8000/baskets';
  private baseUrlUsers = 'http://localhost:8000/users';

  constructor(private http: HttpClient) { }

  //PRODUCTOS
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrlProducts}`);
  }

  createProducto(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrlProducts}`, product);
  }

  updateProducto(id: string, product: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrlProducts}/${id}`, product);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrlProducts}/${id}`);
  }


  //CARRITOS
  getCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.baseUrlBaskets}`);
  }

  getCarrito(id: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrlBaskets}/${id}`);
  }

  createCarrito(userID: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrlBaskets}/create/${userID}`);
  }

  updateCarrito(carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.baseUrlBaskets}/${carrito._id}`, carrito);
  }

  addProducto(prod_id: string, carrito_id: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrlBaskets}/addProduct/${carrito_id}/${prod_id}`);
  }

  removeProducto(prod_id: string, carrito_id: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrlBaskets}/removeProduct/${carrito_id}/${prod_id}`);
  }

  finalizar(carritoID: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrlBaskets}/close/${carritoID}`);
  }

  deleteCarrito(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrlBaskets}/${id}`);
  }

  //USUARIOS
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrlUsers}`);
  }

  getUser(dni: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrlUsers}/${dni}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrlUsers}`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrlUsers}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrlUsers}/${id}`);
  }

}