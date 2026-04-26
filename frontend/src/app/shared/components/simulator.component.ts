import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulationResult, AutomataDefinition } from '../models/automata.model';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>{{ title }}</h2>
      <p class="subtitle">{{ subtitle }}</p>

      <div class="definition">
        <div class="def-item"><span>Σ (Alfabeto)</span><strong>{{ definition.alphabet.join(', ') }}</strong></div>
        <div class="def-item"><span>Q (Estados)</span><strong>{{ definition.states.join(', ') }}</strong></div>
        <div class="def-item"><span>q₀ (Inicial)</span><strong>{{ definition.initial }}</strong></div>
        <div class="def-item"><span>F (Aceptación)</span><strong>{{ definition.accepting.join(', ') }}</strong></div>
      </div>

      <div class="transitions">
        <h4>Tabla de Transiciones</h4>
        <table>
          <thead>
            <tr>
              <th>δ</th>
              <th *ngFor="let s of definition.alphabet">{{ s }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let state of definition.states">
              <td class="state-cell">
                <span *ngIf="state === definition.initial">→</span>
                <span *ngIf="definition.accepting.includes(state)">★</span>
                {{ state }}
              </td>
              <td *ngFor="let sym of definition.alphabet">
                {{ getTransition(state, sym) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="input-area">
        <label>Cadena de entrada (separada por comas)</label>
        <div class="input-row">
          <input [(ngModel)]="inputRaw" [placeholder]="placeholder" (keyup.enter)="onSimulate()"/>
          <button class="btn-primary" (click)="onSimulate()">Simular</button>
          <button class="btn-secondary" (click)="onClear()">Limpiar</button>
        </div>
      </div>

      <div class="examples">
        <span>Ejemplos:</span>
        <button *ngFor="let e of examples" class="chip" (click)="loadExample(e)">
          {{ e.join(', ') }}
        </button>
      </div>

      <div class="result" *ngIf="result">
        <div [class]="result.accepted ? 'badge accept' : 'badge reject'">
          {{ result.accepted ? '✓ CADENA ACEPTADA' : '✗ CADENA RECHAZADA' }}
        </div>

        <h4>Traza de ejecución</h4>
        <table class="trace">
          <thead>
            <tr>
              <th>Paso</th>
              <th>Símbolo</th>
              <th>Estado(s) activo(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let step of result.steps; let i = index"
                [class.final-row]="i === result.steps.length - 1">
              <td>{{ i }}</td>
              <td>{{ step.symbol ?? '—' }}</td>
              <td>{{ formatStates(step) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SimulatorComponent implements OnChanges {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() definition!: AutomataDefinition;
  @Input() examples: string[][] = [];
  @Input() placeholder = '';
  @Input() result: SimulationResult | null = null;
  @Output() simulate = new EventEmitter<string[]>();

  inputRaw = '';

  ngOnChanges() {}

  onSimulate() {
    const cadena = this.inputRaw.split(',').map(s => s.trim()).filter(Boolean);
    if (cadena.length) this.simulate.emit(cadena);
  }

  onClear() {
    this.inputRaw = '';
    this.result = null;
  }

  loadExample(example: string[]) {
    this.inputRaw = example.join(', ');
    this.simulate.emit(example);
  }

  getTransition(state: string, symbol: string): string {
    const t = this.definition.transitions?.[state]?.[symbol];
    if (!t) return '∅';
    return Array.isArray(t) ? '{ ' + t.join(', ') + ' }' : t;
  }

  formatStates(step: any): string {
    if (step.states) return '{ ' + step.states.join(', ') + ' }';
    if (step.state !== undefined) return step.state ?? '∅';
    return '∅';
  }
}