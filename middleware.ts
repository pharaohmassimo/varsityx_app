import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook/clerk',
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return; // Allow public routes
  }
  
  // Protect all other routes
  auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};