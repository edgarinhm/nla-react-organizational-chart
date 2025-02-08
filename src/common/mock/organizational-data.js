export const OrganizationalData = {
    name: "COO",
    attributes: {
      employees: "Not assigned",
      department: "OPERATIONS",
    },
    children: [
      {
        name: "BUSINESS OPERATIONS",
        attributes: {
          employees: "1/1 employee",
          department: "OPERATIONS",
        },
        children: [
          {
            name: "PLANNING ANALIST",
            attributes: {
              employees: "0/1 employee",
              department: "OPERATIONS",
            },
          },
        ],
      },
      {
        name: "BUSINESS DEVELOPMENT",
        attributes: {
          employees: "2/2 employee",
          department: "OPERATIONS",
        },
      },
    ],
  }