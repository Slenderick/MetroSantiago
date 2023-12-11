import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MantenedorUsuariosService } from '../servicios/mantenedor-usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { combineLatest } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.page.html',
  styleUrls: ['./crud-usuarios.page.scss'],
})
export class CRUDUsuariosPage implements OnInit { 

  nombre: number = 0;
  email: string = '';
  contrasena: string = '';
  rol: string = '';

  formRegistro: FormGroup;

constructor(
    private mantenedorUsuariosService: MantenedorUsuariosService,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
  ) { 

    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required],
    });


  }

  ngOnInit() {
  
  }

  esRegistroValido(): boolean {
    const form = this.formRegistro;
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        const control = form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
          // Puedes agregar mensajes de error aquí
        }
      });
      return false;
    }
    return true;
  }

registrarUsuario(): void {
  if (this.esRegistroValido()) {
    this.mantenedorUsuariosService.crearUsuario(this.formRegistro.value)
      .then(() => {
        this.mantenedorUsuariosService.presentToast("Usuario registrado exitosamente.");
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });
  }
}
}