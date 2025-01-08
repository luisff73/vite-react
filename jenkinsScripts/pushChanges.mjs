import { execSync } from 'child_process';

const executor = process.argv[2];
const motivo = process.argv[3];
const gitUsername = process.argv[4];
const gitPassword = process.argv[5];
const commitMessage = `Pipeline ejecutada por ${executor}. Motivo: ${motivo}`;

try {
    // Configura el usuario de Git
    execSync('git config user.name "luisff73"');
    execSync('git config user.email "jvrluis@hotmail.com"');

    // Añade los cambios y haz commit
    execSync('git add README.md');
    execSync(`git commit -m "${commitMessage}"`);

    // Haz push de los cambios al repositorio remoto
    execSync(`git push https://${gitUsername}:${gitPassword}@github.com/luisff73/vite-react.git HEAD:ci_jenkins`);
    console.log('Changes pushed successfully.');
} catch (error) {
    console.error('Error en el push:', error);
    process.exit(1);
}