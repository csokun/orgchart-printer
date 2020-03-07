const assert = require('assert').strict;
const { builder } = require('../report');

const scenarios = [{
  name: 'A manager and a subordinate',
  employees: [
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
  ],
  expected:
    [
      '├── Alan',
      '|   └── Martin',
      '├── Martin'
    ]
},
{
  name: 'An unknown manager and a subordinate',
  employees: [
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
  ],
  expected:
    [
      '├── Alan',
      '├── ** manager unknown **',
      '|   └── Alan'
    ]
},
{
  name: 'A self-manage employee',
  employees: [
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
  ],
  expected: [
    '├── Alan',
    '├── ** self-manage **',
    '|   └── Alan'
  ]
}];

console.log('Report module test suite');
scenarios.forEach(({ name, employees, expected }) => {
  try {
    const nodes = [];
    builder({ nodes, employees });
    assert.deepEqual(nodes, expected);
    console.log(` + ${name} - Passed!`);
  } catch (e) {
    console.log(` - ${name} - Failed!`);
    throw e;
  }
});