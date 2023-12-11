import { Component, OnInit } from '@angular/core';
import { EstacionesService } from '../servicios/estaciones.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-crear-estacion',
  templateUrl: './crear-estacion.page.html',
  styleUrls: ['./crear-estacion.page.scss'],
})
export class CrearEstacionPage implements OnInit {
  formularioEstacion: FormGroup;
  constructor(private estacioneService: EstacionesService) {
    this.formularioEstacion = new FormGroup({
      nombre: new FormControl(''),
      entradas: new FormControl(''),
      linea_1: new FormControl(''),
      linea_2: new FormControl(''),
      linea_3: new FormControl(''),
      combinacion: new FormControl('')
    })
  }

  ngOnInit() {
  }

  async onSubmit() {
    const response = await this.estacioneService.AddEstacion(this.formularioEstacion.value);
  }
}
