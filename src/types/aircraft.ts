export interface Aircraft {
    id: string;
    name: string;
    model: string;
    manufacturer: string;
    year: number;
    serialNumber: string;
    registrationCode: string;
    registration: string;
    status: 'ACTIVE' | 'INACTIVE' | string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface AircraftResponse {
    data: Aircraft[];
    pagination: Pagination;
}