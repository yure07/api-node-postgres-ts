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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_neondb_1 = __importDefault(require("./database-neondb"));
const server = (0, fastify_1.default)();
const host = '0.0.0.0';
const port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 3333;
const data = new database_neondb_1.default();
server.get('/cars', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const search = request.query.search;
    const cars = yield data.get(search);
    return reply.status(200).send(cars);
}));
server.post('/cars', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, year, price } = request.body;
    yield data.post({
        name,
        year,
        price
    });
    return reply.status(201).send(request.body);
}));
server.put('/cars/:id', (request, reply) => {
    const idCar = request.params.id;
    const { name, year, price } = request.body;
    data.put(idCar, {
        name,
        year,
        price
    });
    return reply.status(201).send(request.body);
});
server.delete('/cars/:id', (request, reply) => {
    const idCar = request.params.id;
    data.delete(idCar);
    return reply.status(200).send();
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield server.listen({ port, host });
        }
        catch (err) {
            server.log.error(err);
            process.exit(1);
        }
    });
}
startServer();
