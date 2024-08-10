import fs from 'fs';
import path from 'path';
import type { Express } from 'express';

function loadInsideFolder(folderPath: string): string[] {
  const files = fs.readdirSync(folderPath, {
    withFileTypes: true,
    recursive: true,
  });
  return files
    .filter(file => file.isFile())
    .map(file => path.join(file.path, file.name));
}

export default async function loadRoutes(app: Express): Promise<void> {
  const routesPath = path.join(__dirname, '../routes');
  const stats = [0, 0];

  const routeFiles = loadInsideFolder(routesPath);
  stats[0] = routeFiles.length;

  for (const routeFile of routeFiles) {
    try {
      const route = await import(routeFile);
      app.use(route.router);
      stats[1]++;
    } catch (error) {
      console.error(`Failed to load route ${routeFile}:`, error);
    }
  }

  console.log(`Loaded ${stats[1]} out of ${stats[0]} routes.`);
}
