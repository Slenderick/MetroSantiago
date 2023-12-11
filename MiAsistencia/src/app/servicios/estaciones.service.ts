import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Estacion } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {

  constructor(private firestore: Firestore) { }

  AddEstacion(estacion: Estacion) {
    const estacionRef = collection(this.firestore, 'estaciones');
    return addDoc(estacionRef, estacion)
  }
}
