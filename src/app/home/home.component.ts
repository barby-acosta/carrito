import { CarritoService } from "../carrito.service";
import { Component, OnInit } from "@angular/core";
import { Producto } from '../model/producto';
import { Carrito } from '../model/carrito';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  dni: string;
  idCarrito: string;
  productos: Producto[] = [];
  productosreporte: Producto[] = [];
  carrito: Carrito = new Carrito();

  flagLogin: boolean;
  flagError: boolean;
  flagCarrito: boolean;

  constructor(private _formBuilder: FormBuilder, private service: CarritoService) { }
  ngOnInit() {
    this.flagLogin = true;
    this.flagError = false;
    this.flagCarrito = false;
  }

  login() {
    this.service.getUser(this.dni)
      .subscribe(
        data => {
          if (data) {
            this.user = data;
            this.flagLogin = false;
            this.flagError = false;
            data.carritos.forEach(element => {
              if (element.estado==='PENDIENTE') {
                this.idCarrito=element._id;
                this.consultarCarrito();
                this.listarProductos();
              }
            });
          } else {
            this.flagLogin = true;
            this.flagError = true;
          }
        },
        error => {
          console.log(error);
          this.flagError = true;
        });
  }

  listarProductos() {
    this.service.getProductos()
      .subscribe(
        data => {
          this.productos = data;
        },
        error => {
          console.log(error);
        });
  }

  crearCarrito() {
    this.service.createCarrito(this.user._id)
      .subscribe(
        data => {
          this.listarProductos();
          this.idCarrito = data._id;
          this.consultarCarrito();
          this.flagCarrito = true;
        },
        error => {
          this.flagCarrito = false;
          console.log(error);
        });
  }

  consultarCarrito() {
    this.service.getCarrito(this.idCarrito)
      .subscribe(
        data => {
          this.carrito = data;
          this.flagCarrito = true;
        },
        error => {
          console.log(error);
          this.flagCarrito = false;
        });
  }

  eliminarCarrito() {
    this.service.deleteCarrito(this.idCarrito)
      .subscribe(
        data => {
          this.flagCarrito = false;
        },
        error => {
          console.log(error);
        });
  }

  comprar() {
    this.service.finalizar(this.idCarrito)
      .subscribe(
        data => {
          this.flagCarrito = false;
          window.alert("Compra realizada con éxito");
        },
        error => {
          console.log(error);
        });
  }

  agregarProducto(id: string) {
    this.service.addProducto(id, this.idCarrito)
      .subscribe(
        data => {
          this.consultarCarrito();
        },
        error => {
          console.log(error);
        });
  }

  eliminarProducto(id: string) {
    this.service.removeProducto(id, this.idCarrito)
      .subscribe(
        data => {
          this.consultarCarrito();
        },
        error => {
          console.log(error);
        });
  }

}
