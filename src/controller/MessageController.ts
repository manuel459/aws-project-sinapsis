import { IMessageServices } from "../interfaces/IMessageServices";
import { IRequest } from "../interfaces/IRequest";
import { IRequestInsert } from "../interfaces/IRequestInsert";

export class MessageController {
    //INSTANCIAR CAPA DE SERVICIO
    _messageServices :IMessageServices
    // APLICAR INYECCION DE DEPENDENCIA PARA LA CAPA DE SERVICIO
    constructor(messageServices :IMessageServices){
        this._messageServices = messageServices;
    }

    async getMessage(request :IRequest){
        var response = await this._messageServices.getMessage(request);
        return response;
    }

    async insertCampania(request :IRequestInsert){
        var response = await this._messageServices.insertCampania(request);
        return response;
    }

    async getUsuarios(){
        var response = await this._messageServices.getUsuarios();
        return response;
    }
}