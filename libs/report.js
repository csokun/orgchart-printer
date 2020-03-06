const spacing = 4;
const separator = '|'.padEnd(spacing, ' ');
const depth = [separator];
const breadcrumb = { 1: separator };

function getPath(level) {
  if (level <= 0) return '';
  if(depth.length < level) depth.push(separator);

  let path = breadcrumb[level];
  if (!path){
    path = depth.slice(1, level).join('');
    breadcrumb[level] = path;
  }
  return path;
}

function print({ employees, level = 0 }) {
  const employeeCount = employees.length;
  const padding = getPath(level);

  employees.forEach((employee, index) => {
    const { name, subordinates } = employee;
    const lastChild = (index + 1 === employeeCount);
    const hasSuboridates = subordinates.length > 0;
    const symbolChar = (lastChild && !hasSuboridates) ? '└──' : '├──';

    if (level > 0) {
      console.log(`${padding}${symbolChar} ${name}`);
    } else
      console.log(`├── ${name}`);

    if (hasSuboridates) print({ employees: subordinates, level: (level + 1)});
  });
}

function writer({ classifiedEmployees }) {
  const orgChart = classifiedEmployees.filter(emp => !emp.managerId);
  print({ employees: orgChart });
}

module.exports = { writer };
