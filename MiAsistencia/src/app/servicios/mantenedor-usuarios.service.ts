import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CRUDUsuario } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class MantenedorUsuariosService {

  constructor(private firestore: AngularFirestore , private afAuth: AngularFireAuth) { }

  // Crear Usuario

  async crearUsuario(usuario : CRUDUsuario): Promise<void>{
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

  // Obtener Usuarios
  obtenerUsuarios(): Observable<CRUDUsuario[]> {
    return this.firestore.collection<CRUDUsuario>('usuarios').valueChanges();
  }

  // Actualizar Usuario
  actualizarUsuario(id: string, usuario: CRUDUsuario): Promise<void> {
    if (!id) {
      console.error('ID de usuario no proporcionado para la actualización.');
      return Promise.reject('ID de usuario no proporcionado para la actualización.');
    }

    return this.firestore.collection('usuarios').doc(id).update(usuario).then(() => {
      console.log('Usuario actualizado correctamente');
    });
  }

  // Eliminar Usuario
  eliminarUsuario(id: string): Promise<void> {
    return this.firestore.collection('usuarios').doc(id).delete().then(() => {
      console.log('Usuario eliminado correctamente');
    });
  }
}
