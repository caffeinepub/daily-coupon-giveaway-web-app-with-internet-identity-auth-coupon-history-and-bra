import { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import LandingPage from './features/auth/LandingPage';
import BottomNavLayout from './components/layout/BottomNavLayout';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();

  // Register service worker for PWA support
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {!identity ? <LandingPage /> : <BottomNavLayout />}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
