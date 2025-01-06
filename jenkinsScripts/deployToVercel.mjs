import { execSync } from 'child_process';

try {
    // Ejecuta el comando para desplegar en Vercel con confirmación automática
    execSync('vercel --prod --yes', { stdio: 'inherit' });
    console.log('Despliegue a Vercel completado correctamente.');
} catch (error) {
    console.error('Error durante el despliegue a Vercel:', error);
    process.exit(1);
}