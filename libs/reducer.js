const selfManage = 99999;

function createDefaultManager({ managerId }) {
  const name = (managerId === selfManage ? '** self-manage **' : '** manager unknown **');
  return { id: managerId, name , managerId: null, subordinates: [] };
}

const reducer = ({ employees }) => {
  const classifiedEmployees = [];

  employees.reduce((accumulated, employee) => {
    if (employee.id === employee.managerId)
      employee.managerId = selfManage;

    if (!employee.subordinates) employee.subordinates = [];

    const { id, name, managerId } = employee;

    if (!accumulated[id]) {
      accumulated[id] = employee;
      classifiedEmployees.push(accumulated[id]);
    } else
      Object.assign(accumulated[id], { name, managerId });

    if (managerId) {
      let manager = accumulated[managerId];
      if (!manager) {
        manager = createDefaultManager({ managerId });
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