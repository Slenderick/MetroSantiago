import { Injectable } from '@angular/core';
import { Firestore, collection , addDoc} from '@angular/fire/firestore';
import { Recopilador } from '../app.model';


@Injectable({
  providedIn: 'root'
})
export class RegistroAsistenciaService {

  constructor(private firestore: Firestore) { }

   AddRecopilador(recopilador: Recopilador){
    const recopiladorRef = collection(this.firestore,'recopilador');
    return addDoc(recopiladorRef, recopilador)
   }

}
