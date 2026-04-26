import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulationResult } from '../../shared/models/automata.model';

@Injectable({ providedIn: 'root' })
export class AutomataService {
  private base = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  simulateAfnd(tipo: string, input: string[]): Observable<SimulationResult> {
    return this.http.post<SimulationResult>(
      `${this.base}/afnd/${tipo}/simulate`,
      { input }
    );
  }

  simulateAfd(tipo: string, input: string[]): Observable<SimulationResult> {
    return this.http.post<SimulationResult>(
      `${this.base}/afd/${tipo}/simulate`,
      { input }
    );
  }
}