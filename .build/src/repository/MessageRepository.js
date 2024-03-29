"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const constantes_1 = require("../common/constantes");
class MessageRepository {
    // INYECTAR DEPENDENCIA
    constructor(connection) {
        this._connection = connection;
    }
    getMessage(request) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = { succest: false, message: "", body: {} };
            //DEFINIR SENTENCIA EN BASE AL REQUERIMIENTO
            let sqlQuery = `
                          SELECT m.estadoEnvio, COUNT(*) as cantidad
                          FROM cliente c
                          JOIN usuario u ON c.idCliente = u.idCliente
                          JOIN campania c2 ON c2.idUsuario = u.idUsuario
                          JOIN mensaje m ON m.idCampania = c2.idCampania
                          WHERE m.estado = 1
                            AND MONTH(m.fechaHoraEnvio) = ${request.mes}
                        `;
            if (request.nombreCliente != null) {
                sqlQuery += ` AND c.nombre like '%${request.nombreCliente}%'`;
            }
            sqlQuery += ' GROUP BY m.estadoEnvio';
            try {
                //EJECUTAR QUERY
                const connectionString = this._connection.dbContext();
                const result = yield this._connection.executeSQL(connectionString, sqlQuery);
                response.succest = true;
                response.message = constantes_1.MESSAGE_SUCCEST_CONNECTION;
                response.body = result;
            }
            catch (error) {
                response.message = constantes_1.MESSAGE_ERROR_CONNECTION;
                response.body = error;
            }
            return response;
        });
    }
    insertCampania(request) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = { succest: false, message: "", body: {} };
            //DEFINIR SENTENCIA EN BASE AL REQUERIMIENTO
            let sqlQuery = `
                        INSERT INTO campania (nombre, idUsuario, fechaHoraProgramacion, estado)
                        VALUES ('${request.nombre}', ${request.idUsuario}, '${request.fechaHoraProgramacion}', ${request.estado})
                        `;
            try {
                //EJECUTAR QUERY
                const connectionString = yield this._connection.dbContext();
                const result = yield this._connection.executeSQL(connectionString, sqlQuery);
                response.succest = true;
                response.message = constantes_1.MESSAGE_SUCCEST_INSERT;
                response.body = result;
            }
            catch (error) {
                response.message = constantes_1.MESSAGE_ERROR_CONNECTION;
                response.body = error;
            }
            return response;
        });
    }
    getUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            var response = { succest: false, message: "", body: {} };
            //DEFINIR SENTENCIA EN BASE AL REQUERIMIENTO
            let sqlQuery = `
                          SELECT u.idUsuario, u.usuario
                          FROM  usuario u
                        `;
            try {
                //EJECUTAR QUERY
                const connectionString = yield this._connection.dbContext();
                const result = yield this._connection.executeSQL(connectionString, sqlQuery);
                response.succest = true;
                response.message = constantes_1.MESSAGE_SUCCEST_USUARIOS;
                response.body = result;
            }
            catch (error) {
                response.message = constantes_1.MESSAGE_ERROR_CONNECTION;
                response.body = error;
            }
            return response;
        });
    }
}
exports.MessageRepository = MessageRepository;
