import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from '../shared/components/simulator.component';
import { AutomataService } from '../core/services/automata.service';
import { SimulationResult, AutomataDefinition } from '../shared/models/automata.model';

@Component({
  selector: 'app-lock',
  standalone: true,
  imports: [CommonModule, SimulatorComponent],
  template: `
    <app-simulator
      title="AFD — Cerradura Inteligente IoT"
      subtitle="Se bloquea tras 3 intentos incorrectos consecutivos"
      placeholder="ej: i, i, c"
      [definition]="definition"
      [examples]="examples"
      [result]="result"
      [diagramImage]="'diagrams/lock.png'"
      [alphabetLegend]="alphabetLegend"
      (simulate)="onSimulate($event)"/>
  `
})
export class LockComponent {
  result: SimulationResult | null = null;

  alphabetLegend = [
    { symbol: 'c', meaning: 'Clave correcta'   },
    { symbol: 'i', meaning: 'Clave incorrecta' },
  ];

  definition: AutomataDefinition = {
    states: ['q0', 'q1', 'q2', 'q3', 'q4'],
    alphabet: ['c', 'i'],
    transitions: {
      'q0': { 'i': 'q1', 'c': 'q4' },
      'q1': { 'i': 'q2', 'c': 'q4' },
      'q2': { 'i': 'q3', 'c': 'q4' },
      'q3': {},
      'q4': {}
    },
    initial: 'q0',
    accepting: ['q4']
  };

  examples = [
    ['c'],
    ['i', 'c'],
    ['i', 'i', 'c'],
    ['i', 'i', 'i']
  ];

  constructor(private svc: AutomataService) {}

  onSimulate(cadena: string[]) {
    this.svc.simulateAfd('lock', cadena).subscribe(r => this.result = r);
  }
}