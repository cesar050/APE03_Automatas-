import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from '../shared/components/simulator.component';
import { AutomataService } from '../core/services/automata.service';
import { SimulationResult, AutomataDefinition } from '../shared/models/automata.model';

@Component({
  selector: 'app-iot',
  standalone: true,
  imports: [CommonModule, SimulatorComponent],
  template: `
    <app-simulator
      title="AFND — Telemetría IoT"
      subtitle="Valida que un paquete IoT tenga la estructura: HDR (TEMP | HUM)* CRC"
      placeholder="ej: HDR, TEMP, CRC"
      [definition]="definition"
      [examples]="examples"
      [result]="result"
      [diagramImage]="'diagrams/IoT.png'"
      (simulate)="onSimulate($event)"/>
  `
})
export class IotComponent {
  result: SimulationResult | null = null;

  definition: AutomataDefinition = {
    states: ['q0', 'q1', 'q2', 'q3'],
    alphabet: ['HDR', 'TEMP', 'HUM', 'CRC'],
    transitions: {
      'q0': { 'HDR': ['q1'] },
      'q1': { 'TEMP': ['q2'], 'HUM': ['q2'], 'CRC': ['q3'] },
      'q2': { 'TEMP': ['q2'], 'HUM': ['q2'], 'CRC': ['q3'] },
      'q3': {}
    },
    initial: 'q0',
    accepting: ['q3']
  };

  examples = [
    ['HDR', 'CRC'],
    ['HDR', 'TEMP', 'CRC'],
    ['HDR', 'HUM', 'TEMP', 'CRC'],
    ['HDR', 'TEMP']
  ];

  constructor(private svc: AutomataService) {}

  onSimulate(cadena: string[]) {
    this.svc.simulateAfnd('iot', cadena).subscribe(r => this.result = r);
  }
}