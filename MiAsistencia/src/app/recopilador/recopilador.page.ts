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


  constructor(private http : HttpClient , private router: Router) { }

  getPosts() { //llamamos a la funcion getPost de nuestro servicio
    this.http.get(`${this.url}`).subscribe((data) => {
      this.estacionData = data;

    });

  }

  home(){
    this.router.navigate(['/home']);
  }
  


  ngOnInit() {
   
  }

}
