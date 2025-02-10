export const OrganizationalData = {
    name: "COO",
    attributes: {
      employees: "Not assigned",
      department: "Operations",
      tier:"tier 2",
    },
    children: [
      {
        name: "BUSINESS Operations",
        attributes: {
          employees: "1/1 employee",
          department: "Operations",
          tier:"tier 3",
        },
        children: [
          {
            name: "PLANNING ANALIST",
            attributes: {
              employees: "0/1 employee",
              department: "Operations",
              tier:"tier 4"
            },
          },
        ],
      },
      {
        name: "BUSINESS DEVELOPMENT",
        attributes: {
          employees: "2/2 employee",
          department: "Operations",
          tier:"tier 3",
        },
      },
    ],
  }