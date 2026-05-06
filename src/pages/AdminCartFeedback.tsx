import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Lock, RefreshCw, Download } from 'lucide-react';

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

const REASON_LABELS: Record<string, string> = {
  too_expensive: 'Too expensive',
  didnt_like: "Didn't like the product",
  changed_mind: 'Changed mind',
  shipping_concerns: 'Shipping',
  site_issue: 'Site issue',
  just_browsing: 'Just browsing',
  other: 'Other',
};

export default function AdminCartFeedback() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin-pw') || '');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Feedback[]>([]);

  const fetchData = async (pw: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: res, error: fnError } = await supabase.functions.invoke('admin-cart-feedback', {
        headers: { 'x-admin-password': pw },
      });
      if (fnError) throw fnError;
      if (res?.error) throw new Error(res.error);
      setData(res?.data || []);
      setAuthed(true);
      sessionStorage.setItem('admin-pw', pw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      setError(msg.includes('Unauthorized') ? 'Wrong password' : msg);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) fetchData(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportCsv = () => {
    const headers = ['Date', 'Reason', 'Comment', 'Product', 'Bundle', 'Qty', 'Price', 'Page'];
    const rows = data.map(d => [
      new Date(d.created_at).toISOString(),
      REASON_LABELS[d.reason] || d.reason,
      d.comment || '',
      d.product_title || '',
      d.is_bundle ? d.bundle_name || 'Bundle' : '',
      d.quantity ?? '',
      d.price_amount ?? '',
      d.page_url || '',
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cart-feedback-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Admin Access</h1>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); fetchData(password); }}
            className="space-y-3"
          >
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || !password}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Aggregate stats
  const reasonCounts = data.reduce<Record<string, number>>((acc, d) => {
    acc[d.reason] = (acc[d.reason] || 0) + 1;
    return acc;
  }, {});
  const sortedReasons = Object.entries(reasonCounts).sort(([, a], [, b]) => b - a);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Cart Removal Feedback</h1>
            <p className="text-sm text-muted-foreground">{data.length} responses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchData(password)} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} disabled={data.length === 0}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        {sortedReasons.length > 0 && (
          <Card className="p-4">
            <h2 className="font-semibold mb-3">Reasons breakdown</h2>
            <div className="space-y-2">
              {sortedReasons.map(([reason, count]) => {
                const pct = (count / data.length) * 100;
                return (
                  <div key={reason} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{REASON_LABELS[reason] || reason}</span>
                      <span className="text-muted-foreground">{count} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        <div className="space-y-3">
          {data.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">No feedback yet.</Card>
          ) : (
            data.map((d) => (
              <Card key={d.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">{REASON_LABELS[d.reason] || d.reason}</Badge>
                    {d.is_bundle && <Badge variant="outline">Bundle: {d.bundle_name}</Badge>}
                    {d.product_title && (
                      <span className="text-sm font-medium">{d.product_title}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(d.created_at).toLocaleString()}
                  </span>
                </div>
                {d.comment && (
                  <p className="text-sm text-foreground/90 italic">"{d.comment}"</p>
                )}
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {d.quantity != null && <span>Qty: {d.quantity}</span>}
                  {d.price_amount != null && <span>Price: ${Number(d.price_amount).toFixed(2)}</span>}
                  {d.page_url && <span className="truncate max-w-xs">From: {d.page_url}</span>}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
