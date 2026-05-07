import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Lock, RefreshCw, Download, MessageSquarePlus, Trash2 } from 'lucide-react';

interface Feedback {
  id: string;
  product_title: string | null;
  variant_id: string | null;
  quantity: number | null;
  price_amount: number | null;
  reason: string;
  comment: string | null;
  is_bundle: boolean;
  bundle_name: string | null;
  user_agent: string | null;
  page_url: string | null;
  created_at: string;
}

interface ShopifyOrder {
  id: string;
  name: string;
  createdAt: string;
  displayFinancialStatus: string;
  displayFulfillmentStatus: string;
  currentTotalPriceSet: { shopMoney: { amount: string; currencyCode: string } };
  customer: { email: string; firstName: string; lastName: string } | null;
}

interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  numberOfOrders: string;
  amountSpent: { amount: string; currencyCode: string };
  createdAt: string;
}

interface AdminNote {
  id: string;
  scope: string;
  scope_id: string | null;
  note: string;
  author: string | null;
  created_at: string;
}

const REASON_LABELS: Record<string, string> = {
  too_expensive: 'Too expensive',
  didnt_like: "Didn't like the product",
  changed_mind: 'Changed mind',
  shipping_concerns: 'Shipping',
  site_issue: 'Site issue',
  just_browsing: 'Just browsing',
  other: 'Other',
};

const fmtMoney = (n: number | string) =>
  `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function callDashboard<T = any>(pw: string, action: string, opts: { method?: string; body?: any; query?: Record<string, string> } = {}) {
  const params = new URLSearchParams({ action, ...(opts.query || {}) });
  return supabase.functions.invoke<T>(`admin-dashboard?${params.toString()}`, {
    headers: { 'x-admin-password': pw },
    method: (opts.method as any) || 'GET',
    body: opts.body,
  });
}

export default function AdminCartFeedback() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin-pw') || '');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [overview, setOverview] = useState<any>(null);
  const [customers, setCustomers] = useState<ShopifyCustomer[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [notes, setNotes] = useState<AdminNote[]>([]);

  const tryLogin = useCallback(async (pw: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnErr } = await callDashboard(pw, 'overview');
      if (fnErr) throw fnErr;
      if ((data as any)?.error) throw new Error((data as any).error);
      setOverview(data);
      setAuthed(true);
      sessionStorage.setItem('admin-pw', pw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      setError(msg.includes('Unauthorized') ? 'Wrong password' : msg);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAll = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const [ov, cu, fb, nt] = await Promise.all([
        callDashboard(pw, 'overview'),
        callDashboard(pw, 'customers'),
        callDashboard(pw, 'feedback'),
        callDashboard(pw, 'notes-list'),
      ]);
      setOverview(ov.data);
      setCustomers(((cu.data as any)?.customers || []) as ShopifyCustomer[]);
      setFeedback(((fb.data as any)?.data || []) as Feedback[]);
      setNotes(((nt.data as any)?.data || []) as AdminNote[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (password) tryLogin(password).then(() => loadAll(password));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNote = async (scope: string, scope_id: string | null, note: string) => {
    if (!note.trim()) return;
    await callDashboard(password, 'notes-create', {
      method: 'POST',
      body: { scope, scope_id, note, author: 'admin' },
    });
    const { data } = await callDashboard(password, 'notes-list');
    setNotes(((data as any)?.data || []) as AdminNote[]);
  };

  const deleteNote = async (id: string) => {
    await callDashboard(password, 'notes-delete', { method: 'POST', body: { id } });
    setNotes((n) => n.filter((x) => x.id !== id));
  };

  const notesFor = (scope: string, scope_id?: string | null) =>
    notes.filter((n) => n.scope === scope && (scope_id == null || n.scope_id === scope_id));

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Admin Access</h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); tryLogin(password).then(() => loadAll(password)); }} className="space-y-3">
            <Input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || !password}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const sh = overview?.shopify || {};
  const ga = overview?.ga4 || {};
  const kl = overview?.klaviyo || {};

  // Reasons aggregate
  const reasonCounts = feedback.reduce<Record<string, number>>((acc, d) => {
    acc[d.reason] = (acc[d.reason] || 0) + 1;
    return acc;
  }, {});
  const sortedReasons = Object.entries(reasonCounts).sort(([, a], [, b]) => b - a);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Analytics, customers, feedback &amp; notes</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => loadAll(password)} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="feedback">Cart Feedback</TabsTrigger>
            <TabsTrigger value="notes">Dashboard Notes</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KpiCard label="Revenue (30d)" value={fmtMoney(sh.revenue || 0)} />
              <KpiCard label="Orders (30d)" value={String(sh.orderCount ?? 0)} />
              <KpiCard label="AOV" value={fmtMoney(sh.aov || 0)} />
              <KpiCard label="Cart Feedback" value={String(overview?.feedbackCount ?? 0)} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Google Analytics (30d)</h3>
                {ga.error ? (
                  <p className="text-sm text-destructive">{ga.error}</p>
                ) : ga.totals ? (
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Stat label="Active users" value={ga.totals.activeUsers?.toLocaleString()} />
                    <Stat label="Sessions" value={ga.totals.sessions?.toLocaleString()} />
                    <Stat label="Pageviews" value={ga.totals.pageViews?.toLocaleString()} />
                    <Stat label="Conversions" value={ga.totals.conversions?.toLocaleString()} />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                )}
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Newsletter (Klaviyo)</h3>
                {kl.error ? (
                  <p className="text-sm text-destructive">{kl.error}</p>
                ) : (
                  <Stat label="Subscribers" value={String(kl.totalSubscribers ?? '—')} />
                )}
              </Card>
            </div>

            {sortedReasons.length > 0 && (
              <Card className="p-4">
                <h2 className="font-semibold mb-3">Cart removal reasons</h2>
                <div className="space-y-4">
                  {sortedReasons.map(([reason, count]) => {
                    const pct = (count / feedback.length) * 100;
                    const reasonNotes = notesFor('reason', reason);
                    return (
                      <div key={reason} className="space-y-2 border-b pb-3 last:border-b-0">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{REASON_LABELS[reason] || reason}</span>
                            <span className="text-muted-foreground">{count} ({pct.toFixed(0)}%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <NoteThread
                          notes={reasonNotes}
                          onAdd={(t) => addNote('reason', reason, t)}
                          onDelete={deleteNote}
                          placeholder="Admin comment for this reason…"
                        />
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* ORDERS */}
          <TabsContent value="orders">
            <Card className="p-4 overflow-x-auto">
              <h3 className="font-semibold mb-3">Recent Orders (30d)</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(sh.orders || []).map((o: ShopifyOrder) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">{o.name}</TableCell>
                      <TableCell>{o.customer ? `${o.customer.firstName || ''} ${o.customer.lastName || ''} (${o.customer.email})` : '—'}</TableCell>
                      <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{o.displayFinancialStatus}</Badge>{' '}
                        <Badge variant="secondary">{o.displayFulfillmentStatus}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{fmtMoney(o.currentTotalPriceSet.shopMoney.amount)}</TableCell>
                    </TableRow>
                  ))}
                  {(!sh.orders || sh.orders.length === 0) && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No recent orders</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* CUSTOMERS */}
          <TabsContent value="customers">
            <Card className="p-4 overflow-x-auto">
              <h3 className="font-semibold mb-3">Customers ({customers.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Spent</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((c) => {
                    const cNotes = notesFor('customer', c.id);
                    return (
                      <TableRow key={c.id}>
                        <TableCell>{`${c.firstName || ''} ${c.lastName || ''}`.trim() || '—'}</TableCell>
                        <TableCell>{c.email || '—'}</TableCell>
                        <TableCell className="text-right">{c.numberOfOrders}</TableCell>
                        <TableCell className="text-right">{fmtMoney(c.amountSpent?.amount || 0)}</TableCell>
                        <TableCell className="min-w-[260px]">
                          <NoteThread
                            notes={cNotes}
                            onAdd={(t) => addNote('customer', c.id, t)}
                            onDelete={deleteNote}
                            placeholder="Internal note…"
                            compact
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {customers.length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No customers</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* FEEDBACK */}
          <TabsContent value="feedback" className="space-y-3">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => exportFeedbackCsv(feedback)} disabled={feedback.length === 0}>
                <Download className="h-4 w-4 mr-2" /> Export CSV
              </Button>
            </div>
            {feedback.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">No feedback yet.</Card>
            ) : (
              feedback.map((d) => {
                const fNotes = notesFor('feedback', d.id);
                return (
                  <Card key={d.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{REASON_LABELS[d.reason] || d.reason}</Badge>
                        {d.is_bundle && <Badge variant="outline">Bundle: {d.bundle_name}</Badge>}
                        {d.product_title && <span className="text-sm font-medium">{d.product_title}</span>}
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(d.created_at).toLocaleString()}</span>
                    </div>
                    {d.comment && <p className="text-sm text-foreground/90 italic">"{d.comment}"</p>}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {d.quantity != null && <span>Qty: {d.quantity}</span>}
                      {d.price_amount != null && <span>Price: ${Number(d.price_amount).toFixed(2)}</span>}
                      {d.page_url && <span className="truncate max-w-xs">From: {d.page_url}</span>}
                    </div>
                    <NoteThread
                      notes={fNotes}
                      onAdd={(t) => addNote('feedback', d.id, t)}
                      onDelete={deleteNote}
                      placeholder="Add admin comment on this entry…"
                    />
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* GENERAL NOTES */}
          <TabsContent value="notes">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Dashboard notes &amp; to-dos</h3>
              <NoteThread
                notes={notesFor('dashboard')}
                onAdd={(t) => addNote('dashboard', null, t)}
                onDelete={deleteNote}
                placeholder="Write a general note…"
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value ?? '—'}</div>
    </div>
  );
}

function NoteThread({
  notes,
  onAdd,
  onDelete,
  placeholder,
  compact,
}: {
  notes: AdminNote[];
  onAdd: (text: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  placeholder?: string;
  compact?: boolean;
}) {
  const [val, setVal] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (!val.trim()) return;
    setBusy(true);
    await onAdd(val);
    setVal('');
    setBusy(false);
  };
  return (
    <div className="space-y-2">
      {notes.length > 0 && (
        <ul className="space-y-1.5">
          {notes.map((n) => (
            <li key={n.id} className="flex items-start justify-between gap-2 bg-muted/50 rounded px-2 py-1.5 text-sm">
              <div>
                <p className="whitespace-pre-wrap">{n.note}</p>
                <span className="text-[10px] text-muted-foreground">{new Date(n.created_at).toLocaleString()}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => onDelete(n.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        {compact ? (
          <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder={placeholder} className="h-8 text-sm" />
        ) : (
          <Textarea value={val} onChange={(e) => setVal(e.target.value)} placeholder={placeholder} rows={2} className="text-sm" />
        )}
        <Button size="sm" onClick={submit} disabled={busy || !val.trim()}>
          <MessageSquarePlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function exportFeedbackCsv(data: Feedback[]) {
  const headers = ['Date', 'Reason', 'Comment', 'Product', 'Bundle', 'Qty', 'Price', 'Page'];
  const rows = data.map((d) => [
    new Date(d.created_at).toISOString(),
    REASON_LABELS[d.reason] || d.reason,
    d.comment || '',
    d.product_title || '',
    d.is_bundle ? d.bundle_name || 'Bundle' : '',
    d.quantity ?? '',
    d.price_amount ?? '',
    d.page_url || '',
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cart-feedback-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
