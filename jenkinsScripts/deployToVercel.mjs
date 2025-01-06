import { execSync } from 'child_process';

try {
    // Ejecuta el comando para desplegar en Vercel
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('Despliege a Vercel completadro correctamente.');
} catch (error) {
    console.error('Error durante el despliege a Vercel:', error);
}