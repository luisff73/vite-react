import { execSync } from 'child_process';

const executor = process.argv[2];
const motivo = process.argv[3];
const commitMessage = `Pipeline ejecutada por ${executor}. Motivo: ${motivo}`;

try {
    // Configura el usuario de Git
    execSync('git config user.name "luisff73"');
    execSync('git config user.email "jvrluis@hotmail.com"');

    execSync('git add README.md');
    execSync(`git commit -m "${commitMessage}"`);

    execSync('git push origin HEAD:ci_jenkins');

} catch (error) {
    console.error('Error en el push:', error);
    process.exit(1);
}