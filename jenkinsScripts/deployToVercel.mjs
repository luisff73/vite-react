import { execSync } from 'child_process';

const vercelToken = process.env.VERCEL_TOKEN;

try {
    // Configura el token de Vercel
    execSync(`vercel login --token ${vercelToken}`, { stdio: 'inherit' });

    // Ejecuta el comando para desplegar en Vercel con confirmación automática
    execSync('vercel --prod --yes', { stdio: 'inherit' });
    console.log('Despliegue a Vercel completado correctamente.');
} catch (error) {
    console.error('Error durante el despliegue a Vercel:', error);
    process.exit(1);
}