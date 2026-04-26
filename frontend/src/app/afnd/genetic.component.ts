import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from '../shared/components/simulator.component';
import { AutomataService } from '../core/services/automata.service';
import { SimulationResult, AutomataDefinition } from '../shared/models/automata.model';

@Component({
  selector: 'app-genetic',
  standalone: true,
  imports: [CommonModule, SimulatorComponent],
  template: `
    <app-simulator
      title="AFND — Secuencias Genéticas"
      subtitle="Reconoce el patrón proteico: K G X* F"
      placeholder="ej: K, G, A, F"
      [definition]="definition"
      [examples]="examples"
      [result]="result"
      [diagramImage]="'diagrams/genetica.png'"
      (simulate)="onSimulate($event)"/>
  `
})
export class GeneticComponent {
  result: SimulationResult | null = null;

  definition: AutomataDefinition = {
    states: ['q0', 'q1', 'q2', 'q3'],
    alphabet: ['K', 'G', 'A', 'F'],
    transitions: {
      'q0': { 'K': ['q1'] },
      'q1': { 'G': ['q2'] },
      'q2': { 'K': ['q2'], 'G': ['q2'], 'A': ['q2'], 'F': ['q3'] },
      'q3': {}
    },
    initial: 'q0',
    accepting: ['q3']
  };

  examples = [
    ['K', 'G', 'F'],
    ['K', 'G', 'A', 'F'],
    ['K', 'G', 'K', 'A', 'G', 'F'],
    ['K', 'G', 'A']
  ];

  constructor(private svc: AutomataService) {}

  onSimulate(cadena: string[]) {
    this.svc.simulateAfnd('genetic', cadena).subscribe(r => this.result = r);
  }
}