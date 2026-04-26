import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from '../shared/components/simulator.component';
import { AutomataService } from '../core/services/automata.service';
import { SimulationResult, AutomataDefinition } from '../shared/models/automata.model';

@Component({
  selector: 'app-banking',
  standalone: true,
  imports: [CommonModule, SimulatorComponent],
  template: `
    <app-simulator
      title="AFD — Validador de Transacciones Bancarias"
      subtitle="Valida el flujo: Autorización → Captura → Liquidación"
      placeholder="ej: a, b, d"
      [definition]="definition"
      [examples]="examples"
      [result]="result"
      [diagramImage]="'diagrams/banking.png'"
      [alphabetLegend]="alphabetLegend"
      (simulate)="onSimulate($event)"/>
  `
})
export class BankingComponent {
  result: SimulationResult | null = null;

  alphabetLegend = [
    { symbol: 'a', meaning: 'Autorizar' },
    { symbol: 'b', meaning: 'Capturar'  },
    { symbol: 'd', meaning: 'Liquidar'  },
    { symbol: 'e', meaning: 'Cancelar'  },
  ];

  definition: AutomataDefinition = {
    states: ['q0', 'q1', 'q2', 'q3', 'q4'],
    alphabet: ['a', 'b', 'd', 'e'],
    transitions: {
      'q0': { 'a': 'q1', 'e': 'q4' },
      'q1': { 'b': 'q2', 'e': 'q4' },
      'q2': { 'd': 'q3', 'e': 'q4' },
      'q3': {},
      'q4': {}
    },
    initial: 'q0',
    accepting: ['q3']
  };

  examples = [
    ['a', 'b', 'd'],
    ['a', 'b', 'e'],
    ['a', 'd'],
    ['a', 'b']
  ];

  constructor(private svc: AutomataService) {}

  onSimulate(cadena: string[]) {
    this.svc.simulateAfd('banking', cadena).subscribe(r => this.result = r);
  }
}