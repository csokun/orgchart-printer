const reducer = ({ employees }) => {
  const classifiedEmployees = [];

  employees.reduce((accumulated, employee) => {
    const { id, name, managerId } = employee;
    if (!employee.subordinates) employee.subordinates = [];

    if (!accumulated[id]) {
      accumulated[id] = employee;
      classifiedEmployees.push(accumulated[id]);
    } else
      Object.assign(accumulated[id], { name, managerId });
  
    if (managerId) {
      let manager = accumulated[managerId];
      if (!manager) {
        manager = { id: managerId, name: '** self-manager **', managerId: null, subordinates: [] };
        accumulated[managerId] = manager;
        classifiedEmployees.push(manager);
      }
      manager.subordinates.push(employee);
    }
  
    return accumulated;
  }, { });

  return classifiedEmployees;
}

module.exports = { reducer };