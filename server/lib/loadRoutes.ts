import fs from 'fs';
import path from 'path';
import { type Express } from 'express';
import type { MyRoute } from '../types';

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
  const routeImports: MyRoute[] = [];
  stats[0] = routeFiles.length;

  for (const routeFile of routeFiles) {
    try {
      const route: MyRoute = await import(routeFile);

      if (!route.router)
        throw new Error('Invalid route file: router is invalid');

      routeImports.push(route);
      stats[1]++;
    } catch (error) {
      console.error(`Failed to load route ${routeFile}:`, error);
    }
  }

  routeImports
    .sort((a, b) => {
      if (a?.orderAtLast && !b?.orderAtLast) return 1;
      if (!a?.orderAtLast && b?.orderAtLast) return -1;
      return 0;
    })
    .forEach(route => {
      app.use(route.router);
    });

  console.log(`Loaded ${stats[1]}/${stats[0]} routes.`);
}
