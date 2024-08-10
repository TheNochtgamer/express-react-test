import type { Router } from 'express';

declare type MyRoute = {
  router: Router;
  orderAtLast?: boolean;
};
