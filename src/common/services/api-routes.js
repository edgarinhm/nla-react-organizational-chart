export const DivisionUrl = {
    get: () => '/division'
}

export const PositionsUrl = {
    get: () => '/positions',
    post: () => '/positions',
}

export const PositionsByIdUrl = {
    get: (positionId) => `/positions/${positionId}`,
    delete: (positionId) => `/positions/${positionId}`,
}


export const EmployeesUrl = {
    get: () => `/employees`,
    post: () => '/employees',
}


export const PositionEmployeesUrl = {
    get: (positionId) => `/positions/${positionId}/employees`,
}

export const EmployeesByIdUrl = {
    get: (employeeId) => `/employees/${employeeId}`,
    delete: (employeeId) => `/employees/${employeeId}`,
}