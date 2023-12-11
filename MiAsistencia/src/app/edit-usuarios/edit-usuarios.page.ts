import { Component, OnInit } from '@angular/core';
import { MantenedorUsuariosService } from '../servicios/mantenedor-usuarios.service';
import { CRUDUsuario } from '../app.model';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.mantenedorUsuariosService.obtenerTodosUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  editarUsuario(usuario: CRUDUsuario) {
    this.usuarioSeleccionado = { ...usuario };
  }

  async actualizarUsuario(): Promise<void> {
    if (this.usuarioSeleccionado) {
      try {
        await this.mantenedorUsuariosService.actualizarUsuario(this.usuarioSeleccionado);
        this.usuarioSeleccionado = null;
        this.showToast('Usuario actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        this.showToast('Error al actualizar usuario');
      }
    }
  }

  eliminarUsuario(usuario: CRUDUsuario) {
    if (usuario && usuario.nombre) {
      try {
        this.mantenedorUsuariosService.eliminarUsuario(usuario);
        this.showToast('Usuario eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        this.showToast('Error al eliminar usuario');
      }
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