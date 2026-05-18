# Testing Guide

## Backend Testing

### Testing for Models
Models are untested as they are proven to be sufficiently sound by validation of TypeORM

### Testing for Controllers
The following template should be used as a basis for testing controllers in the backend

``` typescript
    import type { Request, Response } from "express";
    import { AppDataSource } from "../../../src/data-source";

    jest.mock('../../../src/data-source', () => ({
        AppDataSource: {
            getRepository: jest.fn(() => ({
                find: jest.fn(), 
                findOne: jest.fn(),
                // Include all functions that are called on the repository in the controller
            })),
        },
    }));

    let consoleErrorSpy: jest.SpyInstance;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    const mockGetRepository = AppDataSource.getRepository as jest.Mock;
    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        // Again, include all functions that are called on the repository in the controller
    };

    beforeEach(() => {
        jest.clearAllMocks();

        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        mockRequest = {
            params: {},
            body: {},
            query: {}
        };

        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }

        mockGetRepository.mockReturnValue(mockRepository);
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });
```

### Testing for Routes 
All route testing is technically an integration test - below is an example of testing the leagueRoutes
``` typescript
// __tests__/yourRoute.test.ts

import request from "supertest";
import app from "../src/app"; // Adjust path as needed

// Mock the relevant controller(s)
jest.mock("../src/controllers/api/yourController", () => ({
    yourGetFunction: jest.fn((req, res) =>
        res.json([{ id: 1, name: "Sample" }]),
    ),
    yourGetByIdFunction: jest.fn((req, res) => {
        if (req.params.id === "1") {
            return res.json({ id: 1, name: "Sample" });
        } else {
            return res.status(404).json({ success: false, error: "Not found" });
        }
    }),
}));

describe("Your Routes", () => {
    it("GET /api/your-resource should return resources", async () => {
        const res = await request(app).get("/api/your-resource");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ id: 1, name: "Sample" }]);
    });

    it("GET /api/your-resource/:id should return a resource if found", async () => {
        const res = await request(app).get("/api/your-resource/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: 1, name: "Sample" });
    });

    it("GET /api/your-resource/:id should return 404 if not found", async () => {
        const res = await request(app).get("/api/your-resource/999");
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ success: false, error: "Not found" });
    });
});

```