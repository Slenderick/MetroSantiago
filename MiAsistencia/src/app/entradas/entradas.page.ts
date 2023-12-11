import { Component, OnInit } from '@angular/core';
import { VerAsistenciaService } from '../servicios/ver-asistencia.service';
import { Recopilador } from '../app.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.page.html',
  styleUrls: ['./entradas.page.scss'],
})
export class EntradasPage implements OnInit {
  entradasFiltradas: Recopilador[] | null = [];
  entradaSeleccionada: Recopilador | null = null;
  entradas: Recopilador[] = [];
  tipoIngreso: string[] = [
    'Entrada',
    'Salida'
  ];
  constructor(
    private entradasService: VerAsistenciaService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.obtenerEntradas();
  }
  obtenerEntradas() {
    this.entradasService.obtenerAsistenciasFiltradas("Entrada").subscribe((entradas) => {
      if (entradas) {
        this.entradasFiltradas = entradas;
      }

    })
  }
  eliminarEntrada(recopilador: Recopilador) {
    if (recopilador && recopilador.estacion) {
      try {
        this.entradasService.eliminarEstacion(recopilador);
        this.router.navigate(['/metro'])
        this.showToast('Recopilador eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar Recopilador:', error);
        this.showToast('Error al eliminar Recopilador');
      }
    }
  }
  editarEstacion(recopilador: Recopilador) {
    this.entradaSeleccionada = { ...recopilador };
  }
  async actualizarEntrada(): Promise<void> {
    if (this.entradaSeleccionada) {
      try {
        await this.entradasService.actualizarRecopilador(this.entradaSeleccionada);
        this.entradaSeleccionada = null;
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
