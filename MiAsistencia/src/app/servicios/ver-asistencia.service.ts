import { Injectable } from '@angular/core';
import { Recopilador } from '../app.model';
import { Firestore, collection, addDoc, setDoc, doc, getDocs, where, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class VerAsistenciaService {
  recopiladorCollection: AngularFirestoreCollection<Recopilador>;
  constructor(
    private firestore: Firestore,
    private angularFireStore: AngularFirestore,
    private toastController: ToastController) {
    this.recopiladorCollection = this.angularFireStore.collection<Recopilador>('recopilador');
  }


  obtenerAsistenciasFiltradas(tipoIngreso: string): Observable<Recopilador[]> {
    const estacionCollection = collection(this.firestore, 'recopilador');
    const estacionQuery = query(estacionCollection, where('tipoIngreso', '==', tipoIngreso));
    return new Observable<Recopilador[]>(observer => {
      getDocs(estacionQuery)
        .then(snapshot => {
          const recopilador: Recopilador[] = snapshot.docs.map(doc => {
            const data = doc.data() as Recopilador;
            const id = doc.id;
            return { ...data, id }
          });
          observer.next(recopilador)
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  async actualizarRecopilador(recopilador: Recopilador): Promise<void> {
    const id = recopilador.idRecopilador;
    const docRecopilador: DocumentReference<Recopilador> = this.recopiladorCollection.doc(id).ref;
    try {
      const recopiladorActualizado = { ...recopilador };
      await docRecopilador.update(recopiladorActualizado);
      this.showToast('Recopilador actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar Recopilador', error);
      throw error;
    }
  }

  async eliminarEstacion(recopilador: Recopilador): Promise<void> {
    const id = recopilador.idRecopilador;

    try {
      await this.recopiladorCollection.doc(id).delete();
      this.showToast('Estacion eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar Estacion:', error);
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
