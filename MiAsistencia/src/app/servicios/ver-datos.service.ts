import { Injectable  } from '@angular/core';
import { Recopilador } from '../app.model';
import { Firestore , collection , collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerDatosService {

  constructor(private firestore : Firestore) { }

  obtenerDatos(): Observable<Recopilador[]> {
    let recopiladorRef = collection(this.firestore, 'recopilador');
    return collectionData(recopiladorRef, { idField: 'id'}) as Observable<Recopilador[]>;
  }
}
