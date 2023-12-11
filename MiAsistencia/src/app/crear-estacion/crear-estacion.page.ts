import { Component, OnInit } from '@angular/core';
import { EstacionesService } from '../servicios/estaciones.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-crear-estacion',
  templateUrl: './crear-estacion.page.html',
  styleUrls: ['./crear-estacion.page.scss'],
})
export class CrearEstacionPage implements OnInit {
  formularioEstacion: FormGroup;
  selectedTurn: any;
  lineasOpciones: string[] = [
    'Linea 1',
    'Linea 2',
    'Linea 3',
    'Linea 4',
    'Linea 4a',
    'Linea 5',
    'Linea 6',
    'Linea 7',
    'Linea 8',
  ];
  constructor(private estacioneService: EstacionesService, private router: Router) {
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
  home() {
    this.router.navigate(['/metro']);
  }
  onChangeLinea() {
    const TurnoControl = this.formularioEstacion.get('linea');
    if (TurnoControl) {
      const selectedTurn = TurnoControl.value;
    }
  }
  async onSubmit() {
    const response = await this.estacioneService.AddEstacion(this.formularioEstacion.value);
    this.router.navigate(['/metro']);
  }
}
