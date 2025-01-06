import { execSync } from 'child_process';

const vercelToken = process.env.VERCEL_TOKEN;

try {
    // Ejecuta el comando para desplegar en Vercel con confirmación automática y usando el token
    execSync(`vercel --prod --yes --token ${vercelToken}`, { stdio: 'inherit' });
    console.log('Despliegue a Vercel completado correctamente.');
} catch (error) {
    console.error('Error durante el despliegue a Vercel:', error);
    process.exit(1);
}