import type { Request, Response } from 'express';
import { getLeagues, getLeagueById } from '../src/controllers/api/leagueController';
import { AppDataSource } from '../src/data-source';
import { League } from '../src/models/api/League';

// Mock AppDataSource and its getRepository method
// This is crucial to prevent actual database calls during tests
jest.mock('@src/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    })),
  },
}));

// Cast the mocked AppDataSource to its expected type for better type inference in tests
const mockGetRepository = AppDataSource.getRepository as jest.Mock;
const mockLeagueRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('League Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Set up mock repository to be returned by getRepository
    mockGetRepository.mockReturnValue(mockLeagueRepository);

    // Mock Express Response object
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Allows chaining like res.status(500).json()
    };

    // Mock Express Request object (can be empty for getLeagues, or have params for getLeagueById)
    mockRequest = {};

    // Spy on console.error to prevent it from cluttering test output and to assert its calls
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore console.error after all tests are done
    consoleErrorSpy.mockRestore();
  });

  describe('getLeagues', () => {
    test('should return all leagues with status 200', async () => {
      const mockLeagues = [
        { id: 1, name: 'Premier League' },
        { id: 2, name: 'La Liga' },
      ];
      mockLeagueRepository.find.mockResolvedValue(mockLeagues);

      await getLeagues(mockRequest as Request, mockResponse as Response);

      expect(mockLeagueRepository.find).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLeagues);
      expect(mockResponse.status).not.toHaveBeenCalled(); // Default status is 200
    });

    test('should return an empty array if no leagues are found', async () => {
      mockLeagueRepository.find.mockResolvedValue([]);

      await getLeagues(mockRequest as Request, mockResponse as Response);

      expect(mockLeagueRepository.find).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    test('should handle errors and return status 500', async () => {
      const errorMessage = 'Database connection failed';
      mockLeagueRepository.find.mockRejectedValue(new Error(errorMessage));

      await getLeagues(mockRequest as Request, mockResponse as Response);

      expect(mockLeagueRepository.find).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'Failed to fetch leagues',
        details: errorMessage,
      });
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching leagues:', expect.any(Error));
    });
  });

  describe('getLeagueById', () => {
    test('should return a league by ID with status 200', async () => {
      const mockLeague = { id: 1, name: 'Premier League' };
      mockRequest.params = { id: '1' };
      mockLeagueRepository.findOne.mockResolvedValue(mockLeague);

      await getLeagueById(mockRequest as Request, mockResponse as Response);

      expect(mockLeagueRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockLeagueRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        // relations: { teams: true } // If uncommented in controller, add here
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockLeague);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    test('should return 404 if league is not found', async () => {
      mockRequest.params = { id: '99' };
      mockLeagueRepository.findOne.mockResolvedValue(undefined); // Or null

      await getLeagueById(mockRequest as Request, mockResponse as Response);

      expect(mockLeagueRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockLeagueRepository.findOne).toHaveBeenCalledWith({
        where: { id: 99 },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'League not found',
      });
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should handle errors and return status 500', async () => {
      const errorMessage = 'Database query failed';
      mockRequest.params = { id: '1' };
      mockLeagueRepository.findOne.mockRejectedValue(new Error(errorMessage));

      await getLeagueById(mockRequest as Request, mockResponse as Response);

      expect(mockLeagueRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'Failed to fetch league',
        details: errorMessage,
      });
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching league:', expect.any(Error));
    });
  });
});