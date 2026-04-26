import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from '../shared/components/simulator.component';
import { AutomataService } from '../core/services/automata.service';
import { SimulationResult, AutomataDefinition } from '../shared/models/automata.model';

@Component({
  selector: 'app-slack',
  standalone: true,
  imports: [CommonModule, SimulatorComponent],
  template: `
    <app-simulator
      title="AFND — Sintaxis Mensajería Slack"
      subtitle="Valida el patrón: @bot (USER)? (!cmd | ?help)"
      placeholder="ej: @bot, USER, !cmd"
      [definition]="definition"
      [examples]="examples"
      [result]="result"
      [diagramImage]="'diagrams/slack.png'"
      (simulate)="onSimulate($event)"/>
  `
})
export class SlackComponent {
  result: SimulationResult | null = null;

  definition: AutomataDefinition = {
    states: ['q0', 'q1', 'q2', 'q3'],
    alphabet: ['@bot', 'USER', '!cmd', '?help'],
    transitions: {
      'q0': { '@bot': ['q1'] },
      'q1': { 'USER': ['q2'], '!cmd': ['q3'], '?help': ['q3'] },
      'q2': { '!cmd': ['q3'], '?help': ['q3'] },
      'q3': {}
    },
    initial: 'q0',
    accepting: ['q3']
  };

  examples = [
    ['@bot', '!cmd'],
    ['@bot', '?help'],
    ['@bot', 'USER', '!cmd'],
    ['@bot', 'USER', '?help'],
    ['@bot', 'USER']
  ];

  constructor(private svc: AutomataService) {}

  onSimulate(cadena: string[]) {
    this.svc.simulateAfnd('slack', cadena).subscribe(r => this.result = r);
  }
}