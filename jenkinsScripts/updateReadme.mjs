import fs from 'fs';
import path from 'path';

const readmePath = path.join(process.cwd(), 'README.md');
const badgeSuccess = '![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)';
const badgeFailure = '![Failure](https://img.shields.io/badge/test-failure-red)';

const testResult = process.argv[2]; // 'success' or 'failure'

fs.readFile(readmePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading README.md:', err);
    process.exit(1);
  }

  const resultText = 'RESULTADO DE LOS ULTIMOS TESTS';
  const badge = testResult === 'success' ? badgeSuccess : badgeFailure;
  const newData = data.includes(resultText)
    ? data.replace(new RegExp(`${resultText}.*`, 'g'), `${resultText}\n${badge}`)
    : `${data}\n\n${resultText}\n${badge}`;

  fs.writeFile(readmePath, newData, 'utf8');
});
