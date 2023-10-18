import { Injectable  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class VerDatosService {

  constructor(private firestore : AngularFirestore) { }

  obtenerDatos(){
    return this.firestore
    .collection('recopilador')
    .snapshotChanges();
  }

  
}
