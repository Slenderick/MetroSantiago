import { Timestamp } from "firebase/firestore";

export interface User {
    rut: number;
    dvrut: string;
    email: string;
    contrasena: string;
}

export interface Asistencia {
    correo: string;
    asignatura: string;
    seccion: string;
}

export interface Recopilador {
    linea: string;
    estacion: string;
    fecha: Date;
    contador: string;
    aglomeracion: string;
    flujo: string;
    tipoIngreso: string;
    aprobado: boolean;
    mostrarAceptado: boolean;
}

export interface CRUDUsuario {
    nombre: string;
    email: string;
    contrasena: string;
    rol: string;
}

export interface Estacion {
    nombre: string;
    entradas: number;
    linea_1: string;
    linea_2: string;
    linea_3: string;
    combinacion: string;
}