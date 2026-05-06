import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { CartItem } from '@/stores/cartStore';

const REASONS = [
  { value: 'too_expensive', label: 'Too expensive' },
  { value: 'didnt_like', label: "Didn't like the product" },
  { value: 'changed_mind', label: 'Changed my mind' },
  { value: 'shipping_concerns', label: 'Shipping cost or time' },
  { value: 'site_issue', label: 'Issue with the website' },
  { value: 'just_browsing', label: 'Just browsing' },
  { value: 'other', label: 'Other' },
];

export type RemovalContext =
  | { type: 'item'; item: CartItem }
  | { type: 'bundle'; bundleId: string; bundleName: string; items: CartItem[] };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: RemovalContext | null;
  onConfirm: () => Promise<void> | void;
}

export function CartRemovalFeedbackDialog({ open, onOpenChange, context, onConfirm }: Props) {
  const [reason, setReason] = useState<string>('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (skip = false) => {
    if (!context) return;
    setSubmitting(true);
    try {
      if (!skip && reason) {
        const base = {
          reason,
          comment: comment.trim().slice(0, 1000) || null,
          user_agent: navigator.userAgent.slice(0, 500),
          page_url: window.location.href.slice(0, 500),
        };
        if (context.type === 'item') {
          await supabase.from('cart_removal_feedback').insert({
            ...base,
            product_title: context.item.product?.node?.title?.slice(0, 200) ?? null,
            variant_id: context.item.variantId,
            quantity: context.item.quantity,
            price_amount: parseFloat(context.item.price.amount) || null,
            is_bundle: false,
          });
        } else {
          await supabase.from('cart_removal_feedback').insert({
            ...base,
            product_title: context.items.map(i => i.product?.node?.title).filter(Boolean).join(', ').slice(0, 200),
            is_bundle: true,
            bundle_name: context.bundleName,
          });
        }
      }
      await onConfirm();
      if (!skip) toast.success('Thanks for your feedback!');
      reset();
      onOpenChange(false);
    } catch (e) {
      console.error('Feedback submit failed', e);
      // Still remove even if feedback fails
      await onConfirm();
      reset();
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setReason('');
    setComment('');
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="max-w-md" hideClose>
        <DialogHeader>
          <DialogTitle className="font-body text-lg">Help us improve</DialogTitle>
          <DialogDescription>
            Before we remove this, can you tell us why? It only takes a second.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {REASONS.map((r) => (
            <label
              key={r.value}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                reason === r.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="removal-reason"
                value={r.value}
                checked={reason === r.value}
                onChange={(e) => setReason(e.target.value)}
                className="accent-primary"
              />
              <span className="text-sm">{r.label}</span>
            </label>
          ))}
        </div>

        <Textarea
          placeholder="Anything else we should know? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 1000))}
          rows={3}
          maxLength={1000}
        />

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => handleSubmit(true)}
            disabled={submitting}
          >
            Skip & remove
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={!reason || submitting}
            className="btn-primary"
          >
            Submit & remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
