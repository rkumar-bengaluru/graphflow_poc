// src/types.ts
export interface ActionDefinition {
  Name: string;
  Description: string;
  ActionType: string;
  InputSchema?: Record<string, any>;
  OutputSchema?: Record<string, any>;
}

export interface Integration {
  Name: string;
  Description: string;
  Actions: ActionDefinition[];
}
