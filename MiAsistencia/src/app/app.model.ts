import { Timestamp } from "firebase/firestore";

export interface User{
    rut: number;
    dvrut: string;
    email: string;
    contrasena: string;
}

export interface Asistencia {
    correo: string;
    fecha: Timestamp;
    asignatura: string;
    seccion: string;
}

export interface Recopilador {
    linea : string;
    estacion: string;
    fecha: Date;
    contador: string;
    aglomeracion: string;
    flujo: string;
    jornada: string;
}