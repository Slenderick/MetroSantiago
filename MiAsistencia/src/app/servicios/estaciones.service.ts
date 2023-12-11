import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc, getDocs, where, query } from '@angular/fire/firestore';
import { Estacion } from '../app.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {
  estacionesCollection: AngularFirestoreCollection<Estacion>;
  constructor(
    private firestore: Firestore,
    private angularFireStore: AngularFirestore,
    private toastController: ToastController
  ) {
    this.estacionesCollection = this.angularFireStore.collection<Estacion>('estaciones');
  }

  async AddEstacion(estacion: Estacion) {
    const estacionRef = collection(this.firestore, 'estaciones');
    const docRef = await addDoc(estacionRef, estacion);
    // Obtener el ID del documento recién creado
    const nuevoID = docRef.id;

    // Crear una referencia al documento recién creado
    const nuevoDocRef = doc(this.firestore, 'estaciones', nuevoID);
    await setDoc(nuevoDocRef, { ...estacion, idEstacion: nuevoID });
    return docRef
  }
  obtenerEstaciones(): Observable<Estacion[]> {
    return this.angularFireStore.collection<Estacion>('estaciones').valueChanges();
  }
  obtenerNoCombinaciones(combinacion: string): Observable<Estacion[]> {
    const estacionCollection = collection(this.firestore, 'estaciones');
    const estacionQuery = query(estacionCollection, where('combinacion', '==', combinacion));
    return new Observable<Estacion[]>(observer => {
      getDocs(estacionQuery)
        .then(snapshot => {
          const estaciones: Estacion[] = snapshot.docs.map(doc => {
            const data = doc.data() as Estacion;
            const id = doc.id;
            return { ...data, id }
          });
          observer.next(estaciones)
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  async actualizarEstacion(estacion: Estacion): Promise<void> {
    const id = estacion.idEstacion;
    const docEstacion: DocumentReference<Estacion> = this.estacionesCollection.doc(id).ref;
    try {
      const estacionActualizada = { ...estacion };
      await docEstacion.update(estacionActualizada);
      this.showToast('Estacion actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar estación', error);
      throw error;
    }
  }

  async actualizarCombinacion(estacion: Estacion): Promise<void> {
    const id = estacion.idEstacion;
    const docEstacion: DocumentReference<Estacion> = this.estacionesCollection.doc(id).ref;
    try {
      const estacionActualizada = { ...estacion, combinacion: 'Si' };
      await docEstacion.update(estacionActualizada);
      this.showToast('Estacion actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar estación', error);
      throw error;
    }
  }
  async borrarCombinacion(estacion: Estacion): Promise<void> {
    const id = estacion.idEstacion;
    const docEstacion: DocumentReference<Estacion> = this.estacionesCollection.doc(id).ref;
    try {
      const estacionActualizada = { linea_2: '', linea_3: '', combinacion: 'No' };
      await docEstacion.update(estacionActualizada);
      this.showToast('Combinacion Borrada correctamente');
    } catch (error) {
      console.error('Error al actualizar estación', error);
      throw error;
    }
  }

  //  async actualizarEstacion(estacion: Estacion): Promise<void> {
  //    const id = estacion.nombre;
  //    const docEstacion: DocumentReference<Estacion> = this.estacionesCollection.doc(id).ref;
  //
  //    try {
  //      const estacionActualizada = { ...estacion };
  //      await docEstacion.update(estacionActualizada);
  //      this.showToast('Estacion actualizada correctamente');
  //    } catch (error) {
  //      console.error('Error al actualizar estación', error);
  //      throw error
  //    }
  //
  //
  //  }

  async eliminarEstacion(estacion: Estacion): Promise<void> {
    const id = estacion.idEstacion;

    try {
      await this.estacionesCollection.doc(id).delete();
      this.showToast('Estacion eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar Estacion:', error);
      throw error;
    }
  }

  //  async eliminarEstacion(estacion: Estacion): Promise<void> {
  //    const id = estacion.nombre;
  //    // Elimina el usuario de Firestore
  //    const docEstacion: AngularFirestoreDocument<Estacion> = this.angularFireStore.doc<Estacion>(`estaciones/${id}`);
  //
  //    try {
  //      await docEstacion.delete();
  //      this.showToast('Estacion eliminada correctamente');
  //    } catch (error) {
  //      console.error('Error al eliminar Estacion:', error);
  //      throw error;
  //    }
  //  }
  async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}
