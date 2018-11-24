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
    extra1?: Array<Extra>;
    extra2?: Array<Extra>;
}

export interface Extra{
    name?: string;
    price?: number;
    type?: string;
}

export interface Carrito{
    
    id?:string;
    name?:string;
    price?:number;
    description?:string;
    img?: Observable<string>;
    available?: boolean;
    type?: string;
    extra1?: Extra;
    extra2?: Extra;
    
}

export interface Pedido{
    Pedido?: Array<Carrito>;
}

export interface Historial{
    id?:string;
    name?:string;
    price?:number;
    description?:string;
    img?: Observable<string>;
    available?: boolean;
    type?: string;
    extra1?: Extra;
    extra2?: Extra;
    npedido?:number;
}

export interface Pedidos{
    id?:string;
    name?:string;
    price?:number;
    description?:string;
    img?: Observable<string>;
    available?: boolean;
    type?: string;
    extra1?: Extra;
    extra2?: Extra;
    npedido?:number;
    npedidoadmin?:number;
}

