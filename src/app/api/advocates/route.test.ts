import { describe, it, expect, vi, afterEach } from 'vitest';
import { GET } from '@/app/api/advocates/route';
import * as dbModule from '@/db';

function createMockRequest(params: Record<string, string>) {
  return {
    nextUrl: {
      searchParams: {
        get: (key: string) => params[key] || null,
      },
    },
  } as any;
}

function createMockQuery(returnValue: any[]) {
  return {
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    $dynamic: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    then: vi.fn((cb) => Promise.resolve(cb(returnValue))),
    catch: vi.fn(),
    finally: vi.fn(),
    [Symbol.asyncIterator]: async function* () { yield* returnValue; },
  };
}

function createDbMock(mockQuery: any, count: number) {
  return {
    select: vi.fn(() => ({ from: vi.fn(() => mockQuery) })),
    $count: vi.fn(() => Promise.resolve(count)),
  };
}

describe('GET /api/advocates', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return advocates and totalCount', async () => {
    const mockAdvocates = [
      { id: 1, firstName: 'John', lastName: 'Johnston', city: 'NY', degree: 'MD', specialties: [], yearsOfExperience: 5, phoneNumber: 1234567890, createdAt: new Date() },
    ];
    const mockQuery = createMockQuery(mockAdvocates);
    const dbMock = createDbMock(mockQuery, 1);
    vi.spyOn(dbModule, 'default', 'get').mockReturnValue(dbMock as any);

    const req = createMockRequest({ search: '', page: '1', pageSize: '5' });
    const response = await GET(req);
    const json = await response.json();
    // Patch: createdAt is stringified in JSON, so match accordingly
    expect(json.advocates[0]).toMatchObject({
      ...mockAdvocates[0],
      createdAt: expect.any(String),
    });
    expect(json.totalCount).toBe(1);
  });

  it('should filter advocates by search term', async () => {
    const mockAdvocates = [
      { id: 1, firstName: 'Frank', lastName: 'Franklin', city: 'Houston', degree: 'MD', specialties: [], yearsOfExperience: 5, phoneNumber: 1234567890, createdAt: new Date() },
      { id: 2, firstName: 'Fred', lastName: 'Frederickson', city: 'Colorado Springs', degree: 'PhD', specialties: [], yearsOfExperience: 3, phoneNumber: 9876543210, createdAt: new Date() },
    ];
    const filtered = [mockAdvocates[1]];
    const mockQuery = createMockQuery(filtered);
    const dbMock = createDbMock(mockQuery, 1);
    vi.spyOn(dbModule, 'default', 'get').mockReturnValue(dbMock as any);

    const req = createMockRequest({ search: 'Frank', page: '1', pageSize: '5' });
    const response = await GET(req);
    const json = await response.json();
    expect(json.advocates[0]).toMatchObject({
      ...filtered[0],
      createdAt: expect.any(String),
    });
    expect(json.totalCount).toBe(1);
    expect(mockQuery.where).toHaveBeenCalled();
  });

  it('should paginate advocates', async () => {
    const mockAdvocates = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      city: 'City',
      degree: 'Degree',
      specialties: [],
      yearsOfExperience: i,
      phoneNumber: 1000000000 + i,
      createdAt: new Date(),
    }));
    const paginated = mockAdvocates.slice(5, 10); // page 2, pageSize 5
    const mockQuery = createMockQuery(paginated);
    const dbMock = createDbMock(mockQuery, 10);
    vi.spyOn(dbModule, 'default', 'get').mockReturnValue(dbMock as any);

    const req = createMockRequest({ search: '', page: '2', pageSize: '5' });
    const response = await GET(req);
    const json = await response.json();
    expect(json.advocates).toHaveLength(5);
    expect(json.advocates[0]).toMatchObject({
      ...paginated[0],
      createdAt: expect.any(String),
    });
    expect(json.totalCount).toBe(10);
    expect(mockQuery.limit).toHaveBeenCalledWith(5);
    expect(mockQuery.offset).toHaveBeenCalledWith(5);
  });
});
