import { Component, OnInit } from '@angular/core';
import { MantenedorUsuariosService } from '../servicios/mantenedor-usuarios.service';
import { CRUDUsuario } from '../app.model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.page.html',
  styleUrls: ['./edit-usuarios.page.scss'],
})
export class EditUsuariosPage implements OnInit {
  usuarios: CRUDUsuario[] = [];
  usuarioSeleccionado: CRUDUsuario | null = null;

  constructor(
    private mantenedorUsuariosService: MantenedorUsuariosService,
    private toastController: ToastController,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.mantenedorUsuariosService.obtenerTodosUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  editarUsuario(usuario: CRUDUsuario) {
    this.usuarioSeleccionado = { ...usuario }; // Asegúrate de tener esta lógica de copia
  }

  // Actualizar Usuario usando el nombre del documento de Firebase
  async actualizarUsuario(usuario: CRUDUsuario): Promise<void> {
    const nombre = usuario.nombre; // Utiliza el nombre del documento como identificador
    if (!nombre) {
      console.error('Nombre de usuario no proporcionado para la actualización.');
      return Promise.reject('Nombre de usuario no proporcionado para la actualización.');
    }

    // Utiliza AngularFirestoreDocument con el tipo de tu modelo (CRUDUsuario)
    const docUsuario: AngularFirestoreDocument<CRUDUsuario> = this.firestore.doc(`usuarios/${nombre}`);

    try {
      const usuarioActualizado = { ...usuario };
      // No es necesario eliminar propiedades antes de actualizar

      // Utiliza el método update para actualizar solo las propiedades proporcionadas
      await docUsuario.update(usuarioActualizado);
      this.showToast('Usuario actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  // Eliminar Usuario usando el nombre del documento de Firebase
  async eliminarUsuario(nombre: string): Promise<void> {
    const docUsuario: AngularFirestoreDocument<CRUDUsuario> = this.firestore.doc(`usuarios/${nombre}`);

    try {
      await docUsuario.delete();
      this.showToast('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}