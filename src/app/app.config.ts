import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
      apiKey: 'AIzaSyC7e4fa3J8wNqDWT1vBR_EnmAFmzbeC5gA',
      authDomain: 'proyecto-cine-pelicula.firebaseapp.com',
      projectId: 'proyecto-cine-pelicula',
      storageBucket: 'proyecto-cine-pelicula.firebasestorage.app',
      messagingSenderId: '562900093862',
      appId: '1:562900093862:web:a0a3a287ff72e2ea911d67'
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
