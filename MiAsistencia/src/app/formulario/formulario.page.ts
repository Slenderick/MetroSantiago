import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Animation, AnimationController } from '@ionic/angular';
import { RegistroAsistenciaService } from '../servicios/registro-asistencia.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  formulario: FormGroup;
  /** Api*/
  url = 'https://api.xor.cl/red/metro-network';
  estacionData: any;
  selectedTurn: any;
  selectedStation: any;
  seccion: any;
  lines: any; // Variable para almacenar las líneas
  linesLargo: any;
  stations: any;
  stationsLargo: any;
  nombreEstacion: string[] = [];
  lineaSeleccionada: string[] = []; // Variable para almacenar la línea seleccionada
  estacionesDisponibles: string[] = []; // Variable para almacenar las estaciones de la línea seleccionada
  /* */
  seccionOpciones: string[] = [
    'AM',
    'PM'
  ];
  contador: any = 0;


  constructor(
    private http: HttpClient,
    private animationCtrl: AnimationController,
    private RegistroAsistenciaService: RegistroAsistenciaService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.formulario = new FormGroup({
      linea : new FormControl(''),
      estacion: new FormControl(''),
      fecha: new FormControl(new Date()),
      contador: new FormControl(''),
      aglomeracion: new FormControl(''),
      flujo: new FormControl(''),
      jornada: new FormControl('')
    })
  }
  async animarContenido() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.lista'))
      .addElement(document.querySelectorAll('.boton'))
      .duration(1500)
      .keyframes([
        { offset: 0, opacity: 0.2, transform: 'translateX(-100%)' },
        { offset: 0.5, opacity: 1, transform: 'translateX(0%)' },
      ]);
    await animation.play()
  }

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

  home() {
    this.router.navigate(['/home']);
  }

  getPosts() { //llamamos a la funcion getPost de nuestro servicio
    this.http.get(this.url).subscribe((data: any) => {
      this.estacionData = data;
      this.lines = data.lines;
      this.nombreEstacion = [];
      for (let i = 0; i < this.lines.length; i++) {
        this.linesLargo = this.lines[i]
        for (let x = 0; x < this.linesLargo.stations.length; x++) {
          this.stationsLargo = this.linesLargo.stations[x]
          this.nombreEstacion.push(this.stationsLargo.name)
        }
      }
      this.nombreEstacion = this.nombreEstacion.filter((value, index, self) => self.indexOf(value) === index);
      this.lines = data.lines.map((line: any) => line.name);
    });

  }
  ngOnInit() {
    this.getPosts();
    this.animarContenido();
    this.animarTitulo();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // El usuario está autenticado. Puedes obtener su correo electrónico.
        const correoUsuario = user.email;
        // Ahora puedes utilizar correoUsuario en tu formulario.
        this.formulario.patchValue({ correo: correoUsuario });
      } else {
        // El usuario no está autenticado o ha cerrado sesión. Puedes manejar esto según tus necesidades.
      }
    });
  }

  onLineChange() {
    this.estacionesDisponibles = this.estacionData.lines
      .find((line: any) => line.name === this.lineaSeleccionada)
      .stations.map((station: any) => station.name);
  }

  onEstacionChange() {
    // Puedes acceder a this.selectedEstacion para obtener el valor seleccionado y realizar acciones basadas en él.
    console.log("Estación seleccionada:", this.selectedStation);
    // Realiza otras acciones según sea necesario.
  }


  onChangeTurno() {
    const TurnoControl = this.formulario.get('seccion');
    if (TurnoControl) {
      const selectedTurn = TurnoControl.value;


    }
  }

  incrementar() {
    this.contador++;
    // Actualiza el valor del contador en el formulario
  }

  restar() {
    if (this.contador > 0) {
      this.contador--;
    }
  }

  async onSubmit() {
    // Agrega el valor del contador al objeto this.formulario.value
    this.formulario.value.contador = this.contador;

    if (this.contador <= 10) {
      this.formulario.value.aglomeracion = "Aglomeración Baja";
    } else if (this.contador <= 50) {
      this.formulario.value.aglomeracion = "Aglomeración Media";
    } else {
      this.formulario.value.aglomeracion = "Aglomeración Alta";
    }

    if (this.contador <= 30) {
      this.formulario.value.flujo = "Flujo Bajo";
    }  else {
      this.formulario.value.flujo = "Flujo Alto";
    }

    console.log(this.formulario.value);
    const response = await this.RegistroAsistenciaService.AddRecopilador(this.formulario.value);
    console.log(response)
    
    this.contador = 0;

  }

}
