import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc, getDocs, where, query } from '@angular/fire/firestore';
import { Recopilador } from '../app.model';


@Injectable({
  providedIn: 'root'
})
export class RegistroAsistenciaService {

  constructor(private firestore: Firestore) { }

  async AddRecopilador(recopilador: Recopilador) {
    const recopiladorRef = collection(this.firestore, 'recopilador');
    const docRef = await addDoc(recopiladorRef, recopilador);
    const nuevoID = docRef.id;
    const nuevoDocRef = doc(this.firestore, 'recopilador', nuevoID);
    await setDoc(nuevoDocRef, { ...recopilador, idRecopilador: nuevoID });
    return docRef
  }

}
