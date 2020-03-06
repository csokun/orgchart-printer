const { reducer, writer } = require('./libs');
const employees = require('./data/employees.json');

const classifiedEmployees = reducer({ employees });
writer({ classifiedEmployees });
