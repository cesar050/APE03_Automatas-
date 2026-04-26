import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from '../shared/components/simulator.component';
import { AutomataService } from '../core/services/automata.service';
import { SimulationResult, AutomataDefinition } from '../shared/models/automata.model';

@Component({
  selector: 'app-scientific',
  standalone: true,
  imports: [CommonModule, SimulatorComponent],
  template: `
    <app-simulator
      title="AFD — Protocolo Three-Way Handshake"
      subtitle="Valida la negociación TCP: SYN → SYN-ACK → ACK"
      placeholder="ej: a, b, c"
      [definition]="definition"
      [examples]="examples"
      [result]="result"
      [diagramImage]="'diagrams/handshake.png'"
      [alphabetLegend]="alphabetLegend"
      (simulate)="onSimulate($event)"/>
  `
})
export class ScientificComponent {
  result: SimulationResult | null = null;

  alphabetLegend = [
    { symbol: 'a', meaning: 'SYN — El cliente inicia la conexión'            },
    { symbol: 'b', meaning: 'SYN-ACK — El servidor confirma y sincroniza'    },
    { symbol: 'c', meaning: 'ACK — El cliente confirma, conexión establecida' },
  ];

  definition: AutomataDefinition = {
    states: ['q0', 'q1', 'q2', 'q3', 'q4'],
    alphabet: ['a', 'b', 'c'],
    transitions: {
      'q0': { 'a': 'q1', 'b': 'q4', 'c': 'q4' },
      'q1': { 'b': 'q2', 'a': 'q4', 'c': 'q4' },
      'q2': { 'c': 'q3', 'a': 'q4', 'b': 'q4' },
      'q3': {},
      'q4': {}
    },
    initial: 'q0',
    accepting: ['q3']
  };

  examples = [
    ['a', 'b', 'c'],
    ['a', 'c'],
    ['b', 'a', 'c'],
    ['a', 'b']
  ];

  constructor(private svc: AutomataService) {}

  onSimulate(cadena: string[]) {
    this.svc.simulateAfd('handshake', cadena).subscribe(r => this.result = r);
  }
}