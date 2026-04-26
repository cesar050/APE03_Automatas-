export interface SimulationStep {
  symbol: string | null;
  states?: string[];
  state?: string | null;
}

export interface SimulationResult {
  input: string[];
  accepted: boolean;
  steps: SimulationStep[];
  final_states?: string[];
  final_state?: string | null;
  definition: AutomataDefinition;
}

export interface AutomataDefinition {
  states: string[];
  alphabet: string[];
  transitions: Record<string, Record<string, string[] | string>>;
  initial: string;
  accepting: string[];
}