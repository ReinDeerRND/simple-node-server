import request from "supertest";
import { HTTP_STATUS } from "../../../src/models/http-codes.model";
import { app } from "../../../src/app";

describe("/dinos", () => {
  beforeAll(async () => {
    await request(app).delete("/_test_/data");
  });

  it("should return status 200 and array od dinosaurs", async () => {
    await request(app).get("/dinos").expect(HTTP_STATUS.OK, []);
  });

  it(`it shouldn't be return any dino and should return 404`, async () => {
    await request(app).get("/dinos/1").expect(HTTP_STATUS.NOT_FOUND);
  });

  it(`it shouldn't created dino with incorrect data`, async () => {
    await request(app)
      .post("/dinos")
      .send({ length: 5 })
      .expect(HTTP_STATUS.BAD_REQUEST);

    await request(app).get("/dinos").expect(HTTP_STATUS.OK, []);
  });

  it(`it should created dino with correct data`, async () => {
    let newDino  = { name: 'Dinosaur', length: 5 }
    const createdResponse = await request(app)
      .post("/dinos")
      .send(newDino)
      .expect(HTTP_STATUS.CREATED);

    expect(createdResponse.body).toEqual({
        id: expect.any(Number),
        ...newDino
    })

    await request(app).get("/dinos/count").expect(HTTP_STATUS.OK, {
        count: 1});
  });
});
