import { Component, OnInit } from '@angular/core';
import { VerDatosService } from '../servicios/ver-datos.service';


@Component({
  selector: 'app-recopilador',
  templateUrl: './recopilador.page.html', 
  styleUrls: ['./recopilador.page.scss'],
})
export class RecopiladorPage implements OnInit {

  datosRecopilador: any[] = [];


  constructor(private verDatosService : VerDatosService) { }

  obtenerDatos() {
    this.verDatosService.obtenerDatos().subscribe(data => {
      this.datosRecopilador = data; 
      console.log(data)// Almacena los datos en la propiedad datosAsistencia
    });
  }


  ngOnInit() {
    this.obtenerDatos();
  }

}
