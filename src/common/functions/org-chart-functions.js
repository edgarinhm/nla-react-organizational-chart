export const GetTiersList = (node) => {
    let count = 0;
    if (node.children) {
      count += node.children.length;
      node.children.forEach(child => {
        count += GetTiersList(child);
      });
    }
    return count;
};