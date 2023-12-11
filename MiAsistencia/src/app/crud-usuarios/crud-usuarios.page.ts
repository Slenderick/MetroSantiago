import { Component, OnInit } from '@angular/core';
import { MantenedorUsuariosService } from '../servicios/mantenedor-usuarios.service';
import { CRUDUsuario } from '../app.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.page.html',
  styleUrls: ['./crud-usuarios.page.scss'],
})
export class CRUDUsuariosPage implements OnInit {
  usuarios: CRUDUsuario[] = [];
  nuevoUsuario: CRUDUsuario = { nombre: '', email: '', contrasena: '', rol: 'Recopilador' };
  usuarioSeleccionado: CRUDUsuario | undefined;

  constructor(
    private mantenedorUsuariosService: MantenedorUsuariosService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.mantenedorUsuariosService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  async crearUsuario() {
    await this.mantenedorUsuariosService.crearUsuario(this.nuevoUsuario);
    this.mostrarMensaje('Usuario creado correctamente');
    this.limpiarFormulario();
    this.obtenerUsuarios();
  }

//  async actualizarUsuario() {
//    if (this.usuarioSeleccionado && this.usuarioSeleccionado.id) {
//      await this.mantenedorUsuariosService.actualizarUsuario(this.usuarioSeleccionado.id, this.usuarioSeleccionado);
//      console.log('Usuario actualizado correctamente en la base de datos');
//    } else {
//      console.error('ID de usuario o usuario seleccionado no válido.');
 //   }
 // }
//
 // async eliminarUsuario() {
 //   if (this.usuarioSeleccionado && this.usuarioSeleccionado.id) {
 //     await this.mantenedorUsuariosService.eliminarUsuario(this.usuarioSeleccionado.id);
//      console.log('Usuario eliminado correctamente de la base de datos');
 //   } else {
//      console.error('ID de usuario o usuario seleccionado no válido.');
//    }//
//  }//
//
  editarUsuario(usuario: CRUDUsuario) {
    this.usuarioSeleccionado = { ...usuario };
  }

 // async crearOActualizarUsuario() {
 //   if (this.usuarioSeleccionado) {
 //     await this.actualizarUsuario();
  //  } else {
  //    await this.crearUsuario();
 //   }
 // }

  private async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  private limpiarFormulario() {
    this.nuevoUsuario = { nombre: '', email: '', contrasena: '', rol: 'Recopilador' };
    this.usuarioSeleccionado = undefined;
  }
}