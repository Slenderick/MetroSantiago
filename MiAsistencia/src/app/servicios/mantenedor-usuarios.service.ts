import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CRUDUsuario } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class MantenedorUsuariosService {
  usuariosCollection: AngularFirestoreCollection<CRUDUsuario>;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastController: ToastController
  ) {
    this.usuariosCollection = this.firestore.collection<CRUDUsuario>('usuarios');
  }

  async crearUsuario(usuario: CRUDUsuario): Promise<void> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.contrasena);
      if (user) {
        usuario.id = user.uid; // Asigna el ID del usuario recién creado
        await this.firestore.collection('usuarios').doc(usuario.id).set(usuario);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  obtenerTodosUsuarios(): Observable<CRUDUsuario[]> {
    return this.firestore.collection<CRUDUsuario>('usuarios').valueChanges();
  }

  async actualizarUsuario(usuario: CRUDUsuario): Promise<void> {
    const id = usuario.id;
    if (!id) {
      console.error('ID de usuario no proporcionado para la actualización.');
      return Promise.reject('ID de usuario no proporcionado para la actualización.');
    }

    const docUsuario: DocumentReference<CRUDUsuario> = this.usuariosCollection.doc(id).ref;

    try {
      const usuarioActualizado = { ...usuario };
      await docUsuario.update(usuarioActualizado);
      this.showToast('Usuario actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  // Eliminar Usuario
  async eliminarUsuario(usuario: CRUDUsuario): Promise<void> {
    const id = usuario.id;

    // Elimina el usuario de Authentication
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.delete();
    }

    // Elimina el usuario de Firestore
    const docUsuario: AngularFirestoreDocument<CRUDUsuario> = this.firestore.doc<CRUDUsuario>(`usuarios/${id}`);

    try {
      await docUsuario.delete();
      this.showToast('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  async presentToast(message: string) {
    // ... (sin cambios)
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