const { test } = require('./test.helper');
const { reducer } = require('../reducer');

const scenarios = [{
  name: 'A manager and a subordinate',
  employees: [
    { "name": "Alan", "id": 100, "managerId": null },
    { "name": "Martin", "id": 220, "managerId": 100 },
  ],
  expected: [
    {
      "name": "Alan",
      "id": 100,
      "managerId": null,
      "subordinates": [
        {
          "name": "Martin",
          "id": 220,
          "managerId": 100,
          "subordinates": []
        }
      ]
    },
    {
      "name": "Martin",
      "id": 220,
      "managerId": 100,
      "subordinates": []
    }
  ]
},
{
  name: 'An unknown manager and a subordinate',
  employees: [{ "name": "Alan", "id": 100, "managerId": 99 }],
  expected: [
    {
      id: 100,
      managerId: 99,
      name: 'Alan',
      subordinates: []
    },
    {
      id: 99,
      managerId: null,
      name: '** manager unknown **',
      subordinates: [
        {
          id: 100,
          managerId: 99,
          name: 'Alan',
          subordinates: []
        }
      ]
    }
  ]
},
{
  name: 'A self-manage employee',
  employees: [{ "name": "Alan", "id": 100, "managerId": 100 }],
  expected: [
    {
      id: 100,
      managerId: 99999,
      name: 'Alan',
      subordinates: []
    },
    {
      id: 99999,
      managerId: null,
      name: '** self-manage **',
      subordinates: [
        {
          id: 100,
          managerId: 99999,
          name: 'Alan',
          subordinates: []
        }
      ]
    }
  ] 
}];

console.log('Reducer module test suite');
scenarios.forEach(({ name, employees, expected }) => {
  test(name, () => {
    return reducer({ employees });
  }, expected);
});