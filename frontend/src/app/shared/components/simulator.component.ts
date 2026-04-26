import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulationResult, AutomataDefinition } from '../models/automata.model';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .card { background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    h2 { font-size: 1.25rem; color: #0f172a; margin-bottom: 4px; }
    .subtitle { font-size: 0.88rem; color: #64748b; margin-bottom: 24px; }
    .section-title { font-size: 0.88rem; color: #475569; margin-bottom: 10px; font-weight: 600; }

    .definition { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 24px; }
    .def-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; font-size: 0.85rem; }
    .def-item span { display: block; color: #64748b; font-size: 0.75rem; margin-bottom: 2px; }
    .def-item strong { color: #0f172a; }

    .transitions { margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 24px; }
    th { background: #0f172a; color: white; padding: 8px 12px; text-align: left; }
    td { padding: 7px 12px; border-bottom: 1px solid #f1f5f9; }
    .state-cell { font-weight: 600; color: #3b82f6; }
    tr:hover td { background: #f8fafc; }

    .diagram-wrap { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 24px; overflow-x: auto; }

    .input-area { margin-bottom: 14px; }
    .input-area label { display: block; font-size: 0.82rem; color: #64748b; margin-bottom: 8px; }
    .input-row { display: flex; gap: 8px; }
    .input-row input { flex: 1; padding: 9px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.92rem; outline: none; }
    .input-row input:focus { border-color: #3b82f6; }
    .btn-primary { background: #3b82f6; color: white; border: none; padding: 9px 20px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; }
    .btn-primary:hover { background: #2563eb; }
    .btn-secondary { background: #f1f5f9; color: #475569; border: none; padding: 9px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; }

    .examples { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; font-size: 0.8rem; color: #94a3b8; }
    .chip { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; border-radius: 20px; padding: 4px 12px; cursor: pointer; font-size: 0.78rem; }
    .chip:hover { background: #dbeafe; }

    .badge { padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.95rem; margin-bottom: 16px; display: inline-block; }
    .accept { background: #dcfce7; color: #166534; }
    .reject { background: #fee2e2; color: #991b1b; }

    .trace th { background: #1e293b; }
    .trace .final-row td { background: #f0fdf4; font-weight: 600; }
  `],
  template: `
    <div class="card">
      <h2>{{ title }}</h2>
      <p class="subtitle">{{ subtitle }}</p>

      <p class="section-title">Definición Formal</p>
      <div class="definition">
        <div class="def-item"><span>Σ — Alfabeto</span><strong>{{ definition.alphabet.join(', ') }}</strong></div>
        <div class="def-item"><span>Q — Estados</span><strong>{{ definition.states.join(', ') }}</strong></div>
        <div class="def-item"><span>q₀ — Estado inicial</span><strong>{{ definition.initial }}</strong></div>
        <div class="def-item"><span>F — Estados de aceptación</span><strong>{{ definition.accepting.join(', ') }}</strong></div>
      </div>

      <p class="section-title">Tabla de Transiciones (δ)</p>
      <div class="transitions">
        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th *ngFor="let s of definition.alphabet">{{ s }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let state of definition.states">
              <td class="state-cell">
                {{ state === definition.initial ? '→' : '' }}
                {{ definition.accepting.includes(state) ? '★' : '' }}
                {{ state }}
              </td>
              <td *ngFor="let sym of definition.alphabet">{{ getTransition(state, sym) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="section-title">Diagrama de Transición</p>
      <div class="diagram-wrap">
        <svg [attr.width]="svgWidth" height="160" [attr.viewBox]="'0 0 ' + svgWidth + ' 160'">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#475569"/>
            </marker>
          </defs>

          <!-- flecha inicio -->
          <line [attr.x1]="stateX(0) - 52" y1="80"
                [attr.x2]="stateX(0) - 34" y2="80"
                stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>

          <!-- transiciones -->
          <g *ngFor="let edge of edges">
            <!-- loop -->
            <ng-container *ngIf="edge.from === edge.to">
              <path [attr.d]="loopPath(edge.from)"
                    fill="none" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr)"/>
              <text [attr.x]="stateX(stateIndex(edge.from))"
                    [attr.y]="18" text-anchor="middle"
                    font-size="11" fill="#3b82f6">{{ edge.label }}</text>
            </ng-container>
            <!-- línea normal -->
            <ng-container *ngIf="edge.from !== edge.to">
              <line [attr.x1]="stateX(stateIndex(edge.from)) + 30"
                    [attr.y1]="edgeY(edge.from, edge.to)"
                    [attr.x2]="stateX(stateIndex(edge.to)) - 30"
                    [attr.y2]="edgeY(edge.from, edge.to)"
                    stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>
              <text [attr.x]="midX(edge.from, edge.to)"
                    [attr.y]="edgeLabelY(edge.from, edge.to)"
                    text-anchor="middle" font-size="11" fill="#475569">{{ edge.label }}</text>
            </ng-container>
          </g>

          <!-- estados -->
          <g *ngFor="let state of definition.states; let i = index">
            <!-- círculo exterior doble si es aceptación -->
            <circle *ngIf="definition.accepting.includes(state)"
                    [attr.cx]="stateX(i)" cy="80" r="30"
                    fill="none" stroke="#0f172a" stroke-width="1"/>
            <!-- círculo principal -->
            <circle [attr.cx]="stateX(i)" cy="80" r="26"
                    [attr.fill]="activeStates.includes(state) ? '#bfdbfe' : '#f8fafc'"
                    [attr.stroke]="definition.accepting.includes(state) ? '#16a34a' : '#0f172a'"
                    stroke-width="1.5"/>
            <text [attr.x]="stateX(i)" y="85"
                  text-anchor="middle" font-size="13"
                  [attr.font-weight]="activeStates.includes(state) ? '700' : '400'"
                  fill="#0f172a">{{ state }}</text>
          </g>
        </svg>
      </div>

      <p class="section-title">Simulación</p>
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
        <button *ngFor="let e of examples" class="chip" (click)="loadExample(e)">{{ e.join(', ') }}</button>
      </div>

      <ng-container *ngIf="result">
        <div [class]="result.accepted ? 'badge accept' : 'badge reject'">
          {{ result.accepted ? '✓ CADENA ACEPTADA' : '✗ CADENA RECHAZADA' }}
        </div>

        <p class="section-title">Traza de Ejecución</p>
        <table class="trace">
          <thead>
            <tr><th>Paso</th><th>Símbolo</th><th>Estados activos</th></tr>
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
      </ng-container>
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
  edges: { from: string; to: string; label: string }[] = [];
  activeStates: string[] = [];
  svgWidth = 600;

  ngOnChanges() {
    this.buildEdges();
    this.svgWidth = Math.max(600, this.definition?.states?.length * 150);
  }

  buildEdges() {
    if (!this.definition) return;
    const map: Record<string, Record<string, string[]>> = {};
    for (const from of this.definition.states) {
      for (const sym of this.definition.alphabet) {
        const targets = this.definition.transitions?.[from]?.[sym];
        if (!targets) continue;
        const arr = Array.isArray(targets) ? targets : [targets];
        for (const to of arr) {
          const key = `${from}->${to}`;
          if (!map[key]) map[key] = { from: [from], to: [to], labels: [] } as any;
          if (!map[key]['labels']) map[key]['labels'] = [];
          map[key]['labels'].push(sym);
        }
      }
    }
    this.edges = Object.entries(map).map(([, v]: any) => ({
      from: v.from[0],
      to: v.to[0],
      label: v.labels.join(', ')
    }));
  }

  stateIndex(state: string): number {
    return this.definition.states.indexOf(state);
  }

  stateX(i: number): number {
    const spacing = this.svgWidth / (this.definition.states.length + 1);
    return spacing * (i + 1);
  }

  midX(from: string, to: string): number {
    return (this.stateX(this.stateIndex(from)) + this.stateX(this.stateIndex(to))) / 2;
  }

  edgeY(from: string, to: string): number {
    const fi = this.stateIndex(from);
    const ti = this.stateIndex(to);
    return fi < ti ? 80 : 100;
  }

  edgeLabelY(from: string, to: string): number {
    return this.edgeY(from, to) - 6;
  }

  loopPath(state: string): string {
    const x = this.stateX(this.stateIndex(state));
    return `M ${x - 15} 54 C ${x - 15} 10, ${x + 15} 10, ${x + 15} 54`;
  }

  onSimulate() {
    const cadena = this.inputRaw.split(',').map(s => s.trim()).filter(Boolean);
    if (cadena.length) {
      this.simulate.emit(cadena);
    }
  }

  onClear() {
    this.inputRaw = '';
    this.result = null;
    this.activeStates = [];
  }

  loadExample(example: string[]) {
    this.inputRaw = example.join(', ');
    this.simulate.emit(example);
  }

  getTransition(state: string, symbol: string): string {
    const t = this.definition.transitions?.[state]?.[symbol];
    if (!t) return '∅';
    return Array.isArray(t) ? '{ ' + t.join(', ') + ' }' : String(t);
  }

  formatStates(step: any): string {
    if (step.states) return '{ ' + step.states.join(', ') + ' }';
    if (step.state !== undefined) return step.state ?? '∅';
    return '∅';
  }
}