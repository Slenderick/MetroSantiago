import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recopilador',
  templateUrl: './recopilador.page.html',
  styleUrls: ['./recopilador.page.scss'],
})
export class RecopiladorPage implements OnInit {

  url = 'https://api.xor.cl/red/metro-network';
  estacionData: any;
  selectedStation: any;
  lines: any; // Variable para almacenar las líneas
  linesLargo: any;
  stations: any;
  stationsLargo: any;
  nombreEstacion: string[] = [];
  




  constructor(private http: HttpClient, private router: Router) { }

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
    });

  }

  onEstacionChange() {
    // Puedes acceder a this.selectedEstacion para obtener el valor seleccionado y realizar acciones basadas en él.
    console.log("Estación seleccionada:", this.selectedStation);
    // Realiza otras acciones según sea necesario.
  }

  home() {
    this.router.navigate(['/home']);
  }



  ngOnInit() {
    this.getPosts();
  }

}
