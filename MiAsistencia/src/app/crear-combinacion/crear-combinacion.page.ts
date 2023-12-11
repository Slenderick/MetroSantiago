import { Component, OnInit } from '@angular/core';
import { EstacionesService } from '../servicios/estaciones.service';
import { ToastController } from '@ionic/angular';
import { Estacion } from '../app.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-combinacion',
  templateUrl: './crear-combinacion.page.html',
  styleUrls: ['./crear-combinacion.page.scss'],
})
export class CrearCombinacionPage implements OnInit {
  listaEstaciones = []
  estaciones: Estacion[] = [];
  estacionfiltrada: Estacion[] | null = [];
  valorSeleccionado: any;
  estacionImportada: any;
  estacionSeleccionada: Estacion | null = null;
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
  constructor(
    private estacionesService: EstacionesService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.obtenerEstacion();
  }
  obtenerEstacion() {
    this.estacionesService.obtenerNoCombinaciones("No").subscribe((estaciones) => {
      if (estaciones) {
        this.estacionfiltrada = estaciones;
      }

    })
  }
  editarEstacion(estacion: Estacion) {
    this.estacionSeleccionada = { ...estacion };
  }
  volver() {
    this.router.navigate(['/metro'])
  }
  async actualizarEstacion(): Promise<void> {
    if (this.estacionSeleccionada) {
      try {
        await this.estacionesService.actualizarCombinacion(this.estacionSeleccionada);
        this.estacionSeleccionada = null;
        this.router.navigate(['/metro'])
        this.showToast('Estacion actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar Estacion:', error);
        this.showToast('Error al actualizar Estacion');
      }
    }
  }
  async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  onChangeLinea() {

  }
}
