# OrgChart

Simple OrgChart printer.

## Usage

```
node index.js
```

## Docker

```
docker build -t orgchart .
docker run --rm -it orgchart
```
## Sample Data

```json
[
  { "name": "Alan", "id": 100, "managerId": 150 },
  { "name": "Martin", "id": 220, "managerId": 100 },
  { "name": "Ricky", "id": 221, "managerId": 100 },
  { "name": "Jamie", "id": 150, "managerId": null },
  { "name": "Alex", "id": 275, "managerId": 100 },
  { "name": "Steve", "id": 400, "managerId": 100 },
  { "name": "David", "id": 190, "managerId": 400 },
  { "name": "Bowie", "id": 191, "managerId": 401 },
  { "name": "Alex I", "id": 300, "managerId": 275 },
  { "name": "Alex II", "id": 301, "managerId": 275 },
  { "name": "Junior", "id": 302, "managerId": 301 }
]
```
Update [data file](data/employees.json)

## Output

```
├── Jamie
|   ├── Alan
|   ├── Martin
|   ├── Ricky
|   ├── Alex
|   |   ├── Alex I
|   |   ├── Alex II
|   |   |   └── Junior
|   ├── Steve
|   |   └── David
├── ** self-manager **
|   └── Bowie
```