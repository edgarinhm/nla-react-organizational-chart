export const GetTiersList = (node) => {
  let count = 0;
  if (node.children) {
    count += node.children.length;
    node.children.forEach((child) => {
      count += GetTiersList(child);
    });
  }
  return count;
};

export const GetDivisionId = (division) => {
  switch (division) {
    case "Bussines Development":
      return 1;
    case "Customer Succes":
      return 2;
    case "Backoffice":
      return 3;
    case "Technology":
      return 4;
    case "Sales":
      return 5;
    case "Operations":
      return 6;

    default:
      return division;
  }
};

export const GetDivision = (divisionId) => {
  switch (divisionId) {
    case 1:
      return "Bussines Development";
    case 2:
      return "Customer Succes";

    case 3:
      return "Backoffice";
    case 4:
      return "Technology";
    case 5:
      return "Sales";
    case 6:
      return "Operations";

    default:
      return divisionId;
  }
};

export const MapPostionsChartNodes = (positions) => {
  return positions.map((position) => {
    const chartNode = {
      name: position.name,
      attributes: {
        id: position.id,
        employees: "0 employees",
        tier: position.tier,
        department: GetDivision(position.division),
      },
    };
    return chartNode;
  });
};
