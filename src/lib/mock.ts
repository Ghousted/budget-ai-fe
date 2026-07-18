/**
 * Mock data for the design phase. Everything here mirrors the Figma content so
 * the screens look real. Swap this module for API calls when wiring the backend.
 */

export const user = {
  firstName: 'Juan',
  fullName: 'Juan dela Cruz',
  email: 'juan.delacruz@email.com',
};

export const summary = {
  month: 'July 2025',
  totalBalance: 38420,
  monthChange: 2340, // "+₱2,340 this month"
  income: 52000,
  expenses: 13580,
};

export type BudgetLine = { key: string; spent: number; budget: number };

/** Budget-overview rows (Home shows the first four). */
export const budget: BudgetLine[] = [
  { key: 'food', spent: 4200, budget: 6000 },
  { key: 'transport', spent: 1800, budget: 2500 },
  { key: 'shopping', spent: 3100, budget: 4000 },
  { key: 'bills', spent: 2800, budget: 3000 },
  { key: 'medicine', spent: 900, budget: 1500 },
  { key: 'leisure', spent: 1400, budget: 2000 },
  { key: 'education', spent: 600, budget: 1200 },
];

export type Insight = { id: string; title: string; body: string };

export const insights: Insight[] = [
  {
    id: 'i1',
    title: 'Saving Goals Ahead',
    body: "You're 68% toward your Emergency Fund. Save ₱500 more this week to stay on track.",
  },
  {
    id: 'i2',
    title: 'Coffee Habit Alert',
    body: 'You spent ₱1,890 on coffee this month, 23% over your usual spending.',
  },
];

export type LogEntry = {
  id: string;
  categoryKey: string;
  note: string;
  amount: number;
  type: 'expense' | 'income';
  when: string; // display string
};

export const recentLogs: LogEntry[] = [
  { id: 'l1', categoryKey: 'food', note: 'Jollibee with team', amount: 480, type: 'expense', when: 'Today, 12:30 PM' },
  { id: 'l2', categoryKey: 'transport', note: 'Grab to office', amount: 180, type: 'expense', when: 'Today, 8:05 AM' },
  { id: 'l3', categoryKey: 'income', note: 'Salary', amount: 26000, type: 'income', when: 'Jul 15' },
  { id: 'l4', categoryKey: 'shopping', note: 'Uniqlo shirt', amount: 990, type: 'expense', when: 'Jul 14' },
  { id: 'l5', categoryKey: 'bills', note: 'Globe postpaid', amount: 1499, type: 'expense', when: 'Jul 13' },
];

export type Goal = {
  key: string;
  name: string;
  color: string;
  icon: string; // MaterialCommunityIcons name
  saved: number;
  target: number;
  targetLabel: string;
};

export const goals: Goal[] = [
  { key: 'emergency', name: 'Emergency Fund', color: '#22C55E', icon: 'shield-check', saved: 68000, target: 100000, targetLabel: 'Dec 2025' },
  { key: 'japan', name: 'Japan Trip', color: '#3B82F6', icon: 'airplane', saved: 28000, target: 80000, targetLabel: 'Mar 2026' },
  { key: 'laptop', name: 'New Laptop', color: '#8B5CF6', icon: 'laptop', saved: 15000, target: 60000, targetLabel: 'Sep 2025' },
];

export const goalsSummary = {
  totalSaved: goals.reduce((s, g) => s + g.saved, 0),
  totalTarget: goals.reduce((s, g) => s + g.target, 0),
};

// ---- AI chat ------------------------------------------------------------

export const quickPrompts = [
  'Where did my money go?',
  'Can I afford ₱2,000 today?',
];

export type ChatMessage =
  | { id: string; role: 'assistant' | 'user'; kind: 'text'; text: string }
  | {
      id: string;
      role: 'assistant';
      kind: 'analysis';
      title: string;
      rows: { label: string; value: string; tone: 'default' | 'good' | 'warn' | 'bad' | 'brand' }[];
      note: string;
    };

export const chatThread: ChatMessage[] = [
  {
    id: 'm1',
    role: 'assistant',
    kind: 'text',
    text: "Hi Juan! 👋 I'm Peso, your AI finance assistant. I've analyzed your spending and I'm ready to help. What would you like to know?",
  },
  { id: 'm2', role: 'user', kind: 'text', text: 'Analyze my spending' },
  {
    id: 'm3',
    role: 'assistant',
    kind: 'analysis',
    title: 'July Spending Analysis',
    rows: [
      { label: 'Highest category', value: 'Food (₱4,200)', tone: 'bad' },
      { label: 'vs. last month', value: '↓ 12% better', tone: 'good' },
      { label: 'Unusual spend', value: 'Shopping +31%', tone: 'warn' },
      { label: 'Saving Rate', value: '16.2%', tone: 'brand' },
    ],
    note: '⚠️ You overspent on shopping this month. Cutting ₱1,200 there would boost your savings by 14%.',
  },
];
