import { Component, OnInit } from '@angular/core';
import { VerDatosService } from '../servicios/ver-datos.service';
import { Recopilador } from '../app.model';

@Component({
  selector: 'app-recopilador',
  templateUrl: './recopilador.page.html', 
  styleUrls: ['./recopilador.page.scss'],
})
export class RecopiladorPage implements OnInit {

  datosRecopilador: Recopilador[] = [];


  constructor(private verDatosService : VerDatosService) { }

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

  


  ngOnInit() {
    this.obtenerDatos();
  }

}
