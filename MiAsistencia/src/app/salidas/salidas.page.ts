import { Component, OnInit } from '@angular/core';
import { VerAsistenciaService } from '../servicios/ver-asistencia.service';
import { Recopilador } from '../app.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.page.html',
  styleUrls: ['./salidas.page.scss'],
})
export class SalidasPage implements OnInit {
  salidasFiltradas: Recopilador[] | null = [];
  salidasSeleccionada: Recopilador | null = null;
  salidas: Recopilador[] = [];
  tipoIngreso: string[] = [
    'Entrada',
    'Salida'
  ];
  constructor(
    private salidasService: VerAsistenciaService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.obtenerEntradas();
  }
  volver() {
    this.router.navigate(['/metro']);
  }
  obtenerEntradas() {
    this.salidasService.obtenerAsistenciasFiltradas("Salida").subscribe((salidas) => {
      if (salidas) {
        this.salidasFiltradas = salidas;
      }

    })
  }
  eliminarSalida(recopilador: Recopilador) {
    if (recopilador && recopilador.estacion) {
      try {
        this.salidasService.eliminarEstacion(recopilador);
        this.router.navigate(['/metro'])
        this.showToast('Recopilador eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar Recopilador:', error);
        this.showToast('Error al eliminar Recopilador');
      }
    }
  }
  editarEstacion(recopilador: Recopilador) {
    this.salidasSeleccionada = { ...recopilador };
  }
  async actualizarSalida(): Promise<void> {
    if (this.salidasSeleccionada) {
      try {
        await this.salidasService.actualizarRecopilador(this.salidasSeleccionada);
        this.salidasSeleccionada = null;
        this.router.navigate(['/datos'])
        this.showToast('Recopilador actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar Recopilador:', error);
        this.showToast('Error al actualizar Recopilador');
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
