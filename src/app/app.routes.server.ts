import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path:'details/:slug/:id',
    renderMode: RenderMode.Server
  },
  {
    path:'details/:id',
    renderMode: RenderMode.Server
  },
  {
    path:'checkout/:id',
    renderMode: RenderMode.Server
  },
  {
    path: "**",
    renderMode: RenderMode.Server
  }
];
