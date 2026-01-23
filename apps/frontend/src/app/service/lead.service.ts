// src/services/service.ts
import axios from 'axios';
import { from, Observable, tap } from 'rxjs';

// Base URL of your API
const API_BASE_URL = 'http://localhost:3000/api'; // replace with your API URL

export const apiService = {
  // Method to fetch users
  postLeadIntakeFunnel(data: any): Observable<any> {
    return from(axios.post(`${API_BASE_URL}/lead-intake-funnel`, data)).pipe(
      tap((response) => console.log('response', response)),
    );
  },
};
