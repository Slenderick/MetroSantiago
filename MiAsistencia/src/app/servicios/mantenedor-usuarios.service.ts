import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CRUDUsuario } from '../app.model';
import { ToastController } from '@ionic/angular';
import { doc, getDoc } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
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

  // Crear Usuario

  async crearUsuario(usuario: CRUDUsuario): Promise<void> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.contrasena);
      if (user) {
        this.firestore.collection('usuarios').doc(user.uid).set(usuario)
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;

    }
  }

  // Obtener todos los usuarios con nombres como identificadores
  obtenerTodosUsuarios(): Observable<CRUDUsuario[]> {
    return this.firestore.collection<CRUDUsuario>('usuarios').valueChanges();
  }

  // Actualizar Usuario usando el nombre del documento de Firebase
  async actualizarUsuario(usuario: CRUDUsuario): Promise<void> {
    const nombre = usuario.nombre;
    if (!nombre) {
      console.error('Nombre de usuario no proporcionado para la actualización.');
      return Promise.reject('Nombre de usuario no proporcionado para la actualización.');
    }

    // Obtén la referencia al documento específico
    const docUsuario: DocumentReference<CRUDUsuario> = this.usuariosCollection.doc(nombre).ref;

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

  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del mensaje
      position: 'top' // Puedes ajustar la posición según tus preferencias
    });
    toast.present();
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