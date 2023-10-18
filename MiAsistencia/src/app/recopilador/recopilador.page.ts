import { Component, OnInit } from '@angular/core';
import { VerDatosService } from '../servicios/ver-datos.service';
import { Recopilador } from '../app.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-recopilador',
  templateUrl: './recopilador.page.html', 
  styleUrls: ['./recopilador.page.scss'],
})
export class RecopiladorPage implements OnInit {

  datosRecopilador: Recopilador[] = [];
  datosAprobados: any[] = [];
  mostrarMensajeAceptado = false;


  constructor(private verDatosService : VerDatosService, private firestore:AngularFirestore) { }

  obtenerDatos() {
    this.verDatosService.obtenerDatos().subscribe(datos => {
      this.datosRecopilador = datos.map( e => {
        return{
          linea : e.payload.doc.id,
          ... e.payload.doc.data() as {}

        } as Recopilador;
      })          
      console.log(datos)// Almacena los datos en la propiedad datosAsistencia
    });
  }

  aprobarDato(recopilado: Recopilador) {
    // Agregar el dato a la matriz de datos aprobados
    recopilado.aprobado = true;
    this.mostrarMensajeAceptado = true;
    this.datosAprobados.push({ ...recopilado, aprobado: true });
  }

  guardarDatosAprobados() {
    // Guarda los datos aprobados en una nueva colección en Firebase Firestore
    this.firestore.collection('datos_aprobados').add({ datos: this.datosAprobados })
      .then(() => {
        console.log('Datos aprobados guardados en Firebase Firestore.');
      })
      .catch((error) => {
        console.error('Error al guardar los datos aprobados: ', error);
      });
  }

  


  ngOnInit() {
    this.obtenerDatos();
  }

}
