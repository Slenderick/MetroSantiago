import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  dato: string | null = null;
  usuario: string | null = null;
  constructor(private activatedRoute: ActivatedRoute, private animationCtrl: AnimationController, private router: Router, private usuarioServicio: UsuariosService) { }
  async animarTitulo() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.titulo'))
      .duration(2500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: 1, transform: 'translateX(0%)' },
        { offset: 0.5, opacity: 0.2, transform: 'translateX(100%)' },
        { offset: 0.5001, opacity: 0, transform: 'translateX(-100%)' },
        { offset: 0.52, opacity: 0.2, transform: 'translateX(-100%)' }
      ]);
    await animation.play()
  }
  verSalidas() {
    this.router.navigate(['/salidas'])
  }
  verEntradas() {
    this.router.navigate(['/entradas'])
  }
  home() {
    this.router.navigate(['/home'])
  }
  ngOnInit() {
    this.animarTitulo()
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.dato = navigation.extras.state['email'];
    }
    if (this.dato) {
      const posicion = this.dato?.indexOf('@');
      this.usuario = this.dato?.substring(0, posicion);
    }
  }

}
