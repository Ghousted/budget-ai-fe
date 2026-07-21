/**
 * Canonical domain types for the app (camelCase). These mirror the backend
 * schemas in `budget-ai-api` (app/schemas/*.py), which use snake_case — the API
 * client in `@/lib/api` maps between the two so screens only ever see this shape.
 */

export type EntryType = 'expense' | 'income';

export type User = {
  id: string;
  firstName: string;
  fullName: string;
  email: string;
};

export type Summary = {
  month: string;
  totalBalance: number;
  monthChange: number;
  income: number;
  expenses: number;
};

/** A single category's spend vs. its monthly budget. `key` is the category key. */
export type BudgetLine = { key: string; spent: number; budget: number };

export type BudgetOverview = {
  month: string;
  totalSpent: number;
  totalBudget: number;
  lines: BudgetLine[];
};

export type Category = {
  key: string;
  label: string;
  short: string;
  color: string;
  icon: string; // MaterialCommunityIcons name
};

export type Insight = { id: string; title: string; body: string };

export type LogEntry = {
  id: string;
  categoryKey: string;
  note: string;
  amount: number;
  type: EntryType;
  when: string; // display string
};

export type Goal = {
  key: string;
  name: string;
  color: string;
  icon: string; // MaterialCommunityIcons name
  saved: number;
  target: number;
  targetLabel: string;
};

export type GoalsOverview = {
  totalSaved: number;
  totalTarget: number;
  goals: Goal[];
};

// ---- AI companion (Budget Bot) -----------------------------------------

/** A structured analysis card the assistant can render inline in the thread. */
export type AnalysisRow = {
  label: string;
  value: string;
  tone: 'default' | 'good' | 'warn' | 'bad' | 'brand';
};

export type ChatMessage =
  | { id: string; role: 'assistant' | 'user'; kind: 'text'; text: string }
  | {
      id: string;
      role: 'assistant';
      kind: 'analysis';
      title: string;
      rows: AnalysisRow[];
      note: string;
    };
