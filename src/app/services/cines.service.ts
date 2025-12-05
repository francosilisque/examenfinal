import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cine {
  id?: string;
  nombre: string;
  ciudad: string;
  capacidad: number;
}

@Injectable({ providedIn: 'root' })
export class CinesService {
  private firestore = inject(Firestore);

  getAll(): Observable<Cine[]> {
    const col = collection(this.firestore, 'cines');
    return collectionData(col, { idField: 'id' }) as Observable<Cine[]>;
  }

  getOne(id: string) {
    const d = doc(this.firestore, `cines/${id}`);
    return docData(d, { idField: 'id' });
  }

  add(c: Cine) {
    const col = collection(this.firestore, 'cines');
    return addDoc(col, c as any);
  }

  update(id: string, c: Partial<Cine>) {
    const d = doc(this.firestore, `cines/${id}`);
    return updateDoc(d, c as any);
  }

  delete(id: string) {
    const d = doc(this.firestore, `cines/${id}`);
    return deleteDoc(d);
  }
}
