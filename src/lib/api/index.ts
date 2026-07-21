/**
 * Typed resource functions for the Budget AI API. Each returns the app's
 * camelCase domain types (`@/lib/types`), mapping from the API's snake_case
 * wire format. Screens import from here, never from `client` directly.
 */

import { request } from './client';
import type {
  BudgetLine,
  BudgetOverview,
  Category,
  EntryType,
  Goal,
  GoalsOverview,
  Insight,
  LogEntry,
  Summary,
  User,
} from '@/lib/types';

export { API_BASE_URL, ApiError, setAuthToken } from './client';

// --- Wire types (snake_case, as returned by FastAPI) ----------------------

type WireUser = { id: string; first_name: string; full_name: string; email: string };
type WireSummary = {
  month: string;
  total_balance: number;
  month_change: number;
  income: number;
  expenses: number;
};
type WireBudgetLine = { category_key: string; spent: number; budget: number };
type WireBudgetOverview = {
  month: string;
  total_spent: number;
  total_budget: number;
  lines: WireBudgetLine[];
};
type WireCategory = { key: string; label: string; short: string; color: string; icon: string };
type WireTransaction = {
  id: string;
  category_key: string;
  note: string;
  amount: number;
  type: EntryType;
  when: string;
};
type WireGoal = {
  key: string;
  name: string;
  color: string;
  icon: string;
  saved: number;
  target: number;
  target_label: string;
};
type WireGoalsOverview = { total_saved: number; total_target: number; goals: WireGoal[] };

// --- Mappers --------------------------------------------------------------

const toUser = (u: WireUser): User => ({
  id: u.id,
  firstName: u.first_name,
  fullName: u.full_name,
  email: u.email,
});

const toSummary = (s: WireSummary): Summary => ({
  month: s.month,
  totalBalance: s.total_balance,
  monthChange: s.month_change,
  income: s.income,
  expenses: s.expenses,
});

const toBudgetLine = (b: WireBudgetLine): BudgetLine => ({
  key: b.category_key,
  spent: b.spent,
  budget: b.budget,
});

const toBudgetOverview = (b: WireBudgetOverview): BudgetOverview => ({
  month: b.month,
  totalSpent: b.total_spent,
  totalBudget: b.total_budget,
  lines: b.lines.map(toBudgetLine),
});

const toTransaction = (t: WireTransaction): LogEntry => ({
  id: t.id,
  categoryKey: t.category_key,
  note: t.note,
  amount: t.amount,
  type: t.type,
  when: t.when,
});

const toGoal = (g: WireGoal): Goal => ({
  key: g.key,
  name: g.name,
  color: g.color,
  icon: g.icon,
  saved: g.saved,
  target: g.target,
  targetLabel: g.target_label,
});

const toGoalsOverview = (g: WireGoalsOverview): GoalsOverview => ({
  totalSaved: g.total_saved,
  totalTarget: g.total_target,
  goals: g.goals.map(toGoal),
});

// --- Auth -----------------------------------------------------------------

export type AuthResult = { token: string; user: User };

export const auth = {
  async signIn(email: string, password: string): Promise<AuthResult> {
    const res = await request<{ token: string; user: WireUser }>('/auth/sign-in', {
      method: 'POST',
      body: { email, password },
    });
    return { token: res.token, user: toUser(res.user) };
  },

  async signUp(fullName: string, email: string, password: string): Promise<AuthResult> {
    const res = await request<{ token: string; user: WireUser }>('/auth/sign-up', {
      method: 'POST',
      body: { full_name: fullName, email, password },
    });
    return { token: res.token, user: toUser(res.user) };
  },

  async me(): Promise<User> {
    return toUser(await request<WireUser>('/auth/me'));
  },
};

// --- Finance --------------------------------------------------------------

export const finance = {
  async summary(): Promise<Summary> {
    return toSummary(await request<WireSummary>('/summary'));
  },

  async insights(): Promise<Insight[]> {
    return request<Insight[]>('/insights');
  },

  async categories(): Promise<Category[]> {
    return request<WireCategory[]>('/categories');
  },

  async budgets(): Promise<BudgetOverview> {
    return toBudgetOverview(await request<WireBudgetOverview>('/budgets'));
  },

  async transactions(): Promise<LogEntry[]> {
    const rows = await request<WireTransaction[]>('/transactions');
    return rows.map(toTransaction);
  },

  async createTransaction(input: {
    amount: number;
    type: EntryType;
    categoryKey?: string | null;
    note?: string;
  }): Promise<LogEntry> {
    const res = await request<WireTransaction>('/transactions', {
      method: 'POST',
      body: {
        amount: input.amount,
        type: input.type,
        category_key: input.categoryKey ?? null,
        note: input.note ?? '',
      },
    });
    return toTransaction(res);
  },

  async goals(): Promise<GoalsOverview> {
    return toGoalsOverview(await request<WireGoalsOverview>('/goals'));
  },

  async createGoal(input: {
    name: string;
    target: number;
    targetLabel?: string;
    color?: string;
    icon?: string;
  }): Promise<Goal> {
    const res = await request<WireGoal>('/goals', {
      method: 'POST',
      body: {
        name: input.name,
        target: input.target,
        target_label: input.targetLabel ?? '',
        color: input.color ?? '#22C55E',
        icon: input.icon ?? 'shield-check',
      },
    });
    return toGoal(res);
  },

  async addFunds(key: string, amount: number): Promise<Goal> {
    return toGoal(
      await request<WireGoal>(`/goals/${encodeURIComponent(key)}/funds`, {
        method: 'POST',
        query: { amount },
      }),
    );
  },

  async deleteGoal(key: string): Promise<void> {
    await request<{ status: string; key: string }>(`/goals/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });
  },
};

// --- AI companion ---------------------------------------------------------

export type ChatMessageIn = { role: 'user' | 'assistant'; content: string };

export type ChatReply = {
  reply: string;
  card: {
    title: string;
    rows: { label: string; value: string; tone: string }[];
    note: string;
  } | null;
  provider: string;
};

export type AffordReply = {
  affordable: boolean;
  verdict: string;
  detail: string;
  provider: string;
};

export const ai = {
  async chat(messages: ChatMessageIn[]): Promise<ChatReply> {
    return request<ChatReply>('/ai/chat', { method: 'POST', body: { messages } });
  },

  async canIAfford(amount: number, note = ''): Promise<AffordReply> {
    return request<AffordReply>('/ai/can-i-afford', {
      method: 'POST',
      body: { amount, note },
    });
  },
};

export const health = {
  async check(): Promise<{ status: string; env: string; ai_provider: string }> {
    return request('/health');
  },
};
