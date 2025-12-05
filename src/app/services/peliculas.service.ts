import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Pelicula {
  id?: string;
  titulo: string;
  genero: string;
  anio: number;
  duracion: string;
}

@Injectable({ providedIn: 'root' })
export class PeliculasService {
  private firestore = inject(Firestore);

  getAll(): Observable<Pelicula[]> {
    const col = collection(this.firestore, 'peliculas');
    return collectionData(col, { idField: 'id' }) as Observable<Pelicula[]>;
  }

  getOne(id: string) {
    const d = doc(this.firestore, `peliculas/${id}`);
    return docData(d, { idField: 'id' });
  }

  add(p: Pelicula) {
    const col = collection(this.firestore, 'peliculas');
    return addDoc(col, p as any);
  }

  update(id: string, p: Partial<Pelicula>) {
    const d = doc(this.firestore, `peliculas/${id}`);
    return updateDoc(d, p as any);
  }

  delete(id: string) {
    const d = doc(this.firestore, `peliculas/${id}`);
    return deleteDoc(d);
  }
}
