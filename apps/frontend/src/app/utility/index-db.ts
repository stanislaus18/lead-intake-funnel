import { BehaviorSubject, from, map, Observable, of, switchMap } from 'rxjs';
import { IDBPDatabase, openDB } from 'idb';

export interface UploadItem {
  id: string;
  file: File;
  status: 'PENDING' | 'UPLOADING' | 'DONE';
  createdAt: number;
}

export class UploadDBService {
  private db$ = new BehaviorSubject<IDBPDatabase | null>(null);
  private indexedDB: IDBPDatabase | null = null;

  init$() {
    return from(
      openDB('offline-db', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('uploads')) {
            db.createObjectStore('uploads', { keyPath: 'id' });
          }
        },
      }),
    ).pipe(
      switchMap((db) => {
        this.indexedDB = db;
        this.db$.next(db);
        return this.db$;
      }),
    );
  }

  saveImage$(file: File): Observable<IDBValidKey> {
    return from(
      (this.indexedDB as IDBPDatabase).put('uploads', {
        id: crypto.randomUUID(),
        file,
        status: 'PENDING',
        createdAt: Date.now(),
      }),
    );
  }

  getAll$() {
    return this.db$.pipe(switchMap((db) => from(db!.getAll('uploads'))));
  }
}
