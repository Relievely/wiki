import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect, beforeAll} from '@jest/globals';
import {ResponseObject, WikiItem} from "../interfaces";
import {databaseInit} from "./jestPresets";


beforeAll( () => databaseInit());

describe("Wiki routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return all wiki items", async () => {
        await requestWithSuperTest
            .get("/wiki")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<WikiItem>).body).toBeDefined();
            });
    });
});