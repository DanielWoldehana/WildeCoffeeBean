// Jest globals are available without import in ES modules
import request from "supertest";
import { createTestApp } from "./app.js";
import { setupTestDB, teardownTestDB, clearDatabase } from "./setup.js";
import { createTestLocation } from "./helpers.js";

const app = createTestApp();

describe("Location API", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe("GET /api/location", () => {
    it("should return the first active location", async () => {
      const loc1 = await createTestLocation({ name: "Location 1", active: true });
      const loc2 = await createTestLocation({ name: "Location 2", active: true });
      const loc3 = await createTestLocation({ name: "Inactive Location", active: false });

      expect(loc1._id).toBeDefined();
      expect(loc2._id).toBeDefined();
      expect(loc3._id).toBeDefined();

      // Verify data exists in database
      const { Location } = await import("../models/index.js");
      const activeCount = await Location.countDocuments({ active: true });
      expect(activeCount).toBeGreaterThanOrEqual(2);

      const response = await request(app).get("/api/location");
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("name");
      expect(response.body.data.active).toBe(true);
    });

    it("should return 404 when no active location exists", async () => {
      await createTestLocation({ name: "Inactive", active: false });

      const response = await request(app).get("/api/location");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });

    it("should return location with hours", async () => {
      const location = await createTestLocation({
        hours: [
          { day: "Monday", opens: "06:00", closes: "19:00", closed: false },
          { day: "Tuesday", opens: "06:00", closes: "19:00", closed: false },
        ],
      });

      const response = await request(app).get("/api/location");
      expect(response.status).toBe(200);
      expect(response.body.data.hours).toHaveLength(2);
    });
  });

  describe("POST /api/location/distance", () => {
    it("should calculate distance between user and store", async () => {
      await createTestLocation({
        name: "Test Store",
        active: true,
        coordinates: {
          lat: 39.0834,
          lng: -77.1533,
        },
      });

      const userCoords = {
        lat: 39.0850,
        lng: -77.1500,
      };

      const response = await request(app)
        .post("/api/location/distance")
        .send(userCoords);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("distance");
      expect(response.body.data.distance).toHaveProperty("miles");
      expect(response.body.data.distance).toHaveProperty("km");
      expect(typeof response.body.data.distance.miles).toBe("number");
      expect(typeof response.body.data.distance.km).toBe("number");
    });

    it("should return 404 when no location exists", async () => {
      const userCoords = {
        lat: 39.0850,
        lng: -77.1500,
      };

      const response = await request(app)
        .post("/api/location/distance")
        .send(userCoords);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid coordinates", async () => {
      await createTestLocation();

      const invalidCoords = {
        lat: "invalid",
        lng: -77.1500,
      };

      const response = await request(app)
        .post("/api/location/distance")
        .send(invalidCoords);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for missing coordinates", async () => {
      await createTestLocation();

      const response = await request(app)
        .post("/api/location/distance")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});

