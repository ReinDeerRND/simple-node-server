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
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const http_codes_model_1 = require("../../../src/models/http-codes.model");
const server_1 = require("../../../src/server");
describe("/dinos", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.app).delete("/_test_/data");
    }));
    it("should return status 200 and array od dinosaurs", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.app).get("/dinos").expect(http_codes_model_1.HTTP_STATUS.OK, []);
    }));
    it(`it shouldn't be return any dino and should return 404`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.app).get("/dinos/1").expect(http_codes_model_1.HTTP_STATUS.NOT_FOUND);
    }));
    it(`it shouldn't created dino with incorrect data`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.app)
            .post("/dinos")
            .send({ length: 5 })
            .expect(http_codes_model_1.HTTP_STATUS.BAD_REQUEST);
        yield (0, supertest_1.default)(server_1.app).get("/dinos").expect(http_codes_model_1.HTTP_STATUS.OK, []);
    }));
    it(`it should created dino with correct data`, () => __awaiter(void 0, void 0, void 0, function* () {
        let newDino = { name: 'Dinosaur', length: 5 };
        const createdResponse = yield (0, supertest_1.default)(server_1.app)
            .post("/dinos")
            .send(newDino)
            .expect(http_codes_model_1.HTTP_STATUS.CREATED);
        expect(createdResponse.body).toEqual(Object.assign({ id: expect.any(Number) }, newDino));
        yield (0, supertest_1.default)(server_1.app).get("/dinos/count").expect(http_codes_model_1.HTTP_STATUS.OK, {
            count: 1
        });
    }));
});
