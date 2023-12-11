import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EstacionesService } from '../servicios/estaciones.service';
import { Estacion } from '../app.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-estacion',
  templateUrl: './ver-estacion.page.html',
  styleUrls: ['./ver-estacion.page.scss'],
})
export class VerEstacionPage implements OnInit {
  listaEstaciones = [];
  estaciones: Estacion[] = [];
  valorSeleccionado: any;
  estacionImportada: any;
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
  estacionSeleccionada: Estacion | null = null;
  constructor(
    private estacionesService: EstacionesService,
    private toastController: ToastController,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.obtenerEstacion();
  }
  //Prueba
  //obtenerEstaciones() {
  //  this.estacionesService.getEstaciones().subscribe(estaciones => {
  //    this.estaciones = estaciones;
  //  });
  //}
  //deleteEstacion(id: string) {
  //  this.estacionesService.eliminarEstacion(id)
  //    .then(() => {
  //      console.log('Estación eliminada exitosamente');
  //      // Actualizar la lista de estaciones después de eliminar una
  //      this.obtenerEstaciones();
  //    })
  //    .catch(error => {
  //      console.error('Error al eliminar la estación:', error);
  //    });
  //}
  //Fin Prueba
  obtenerEstacion() {
    this.estacionesService.obtenerEstaciones().subscribe((estaciones) => {
      this.estaciones = estaciones;
    })
  }
  editarEstacion(estacion: Estacion) {
    this.estacionSeleccionada = { ...estacion };
  }
  async actualizarEstacion(): Promise<void> {
    if (this.estacionSeleccionada) {
      try {
        await this.estacionesService.actualizarEstacion(this.estacionSeleccionada);
        this.estacionSeleccionada = null;
        this.router.navigate(['/metro'])
        this.showToast('Estacion actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar Estacion:', error);
        this.showToast('Error al actualizar Estacion');
      }
    }
  }
  eliminarEstacion(estacion: Estacion) {
    if (estacion && estacion.nombre) {
      try {
        this.estacionesService.eliminarEstacion(estacion);
        this.showToast('Estacion eliminado correctamente');
        this.router.navigate(['/metro'])
      } catch (error) {
        console.error('Error al eliminar Estacion:', error);
        this.showToast('Error al eliminar Estacion');
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
