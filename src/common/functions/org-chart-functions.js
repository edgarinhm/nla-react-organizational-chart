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
  const parents = positions.filter((position) => position.parentId === 0);
  return RecursionNodeChart(parents, positions);
};

const RecursionNodeChart = (parents, positions) => {
  return parents.map((rootPosition) => {
    const chartNode = {
      name: rootPosition.name,
      attributes: {
        id: rootPosition.id,
        employees: "0 employees",
        tier: rootPosition.tier,
        department: GetDivision(rootPosition.division),
      },
      children: RecursionNodeChart(
        positions.filter((position) => rootPosition.id === position.parentId), positions
      ),
    };
    return chartNode;
  });
};
