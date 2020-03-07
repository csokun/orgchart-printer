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

function builder({ nodes = [], employees, level = 0 }) {
  const employeeCount = employees.length;
  const padding = getPath(level);

  employees.forEach((employee, index) => {
    const { name, subordinates } = employee;
    const lastChild = (index + 1 === employeeCount);
    const hasSuboridates = subordinates.length > 0;
    const symbolChar = (lastChild && !hasSuboridates) ? '└──' : '├──';

    if (level > 0) {
      nodes.push(`${padding}${symbolChar} ${name}`);
    } else
      nodes.push(`├── ${name}`);

    if (hasSuboridates) builder({ nodes, employees: subordinates, level: (level + 1)});
  });
}

function circularWarning({ classifiedEmployees }) {
  try {
    JSON.stringify(classifiedEmployees);
  } catch(e) {
    if(e.message.includes('Converting circular structure to JSON')) {
      console.log('Circular structure detected - some employees will not be listed.')
    }
  }
}

function print({ nodes }) {
  console.log(nodes.join('\n'));
}

function writer({ classifiedEmployees }) {
  circularWarning({ classifiedEmployees });
  const employees = classifiedEmployees.filter(emp => !emp.managerId);
  const nodes = [];
  builder({ nodes, employees });
  print({ nodes });
}

module.exports = { writer, builder, print };
