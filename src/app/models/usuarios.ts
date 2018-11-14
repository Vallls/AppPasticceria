import { Observable } from 'rxjs';

export interface Usuario {
    id?: string;
    name?: string;
    lastname?: string;
    email?: string;
    password?: string;
    passwordc?: string;
    admin: boolean;
    carrito?: Array<Menu>;
}

export interface Menu{
    id?:string;
    name?:string;
    price?:number;
    description?:string;
    img?: Observable<string>;
    available?: boolean;
    type?: string;
}

