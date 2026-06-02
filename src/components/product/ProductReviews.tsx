import { JudgeMeReviews } from '@/components/reviews/JudgeMeReviews';

interface ProductReviewsProps {
  productHandle: string;
  productTitle: string;
  productId?: string;
}

export const ProductReviews = ({ productHandle, productTitle, productId }: ProductReviewsProps) => {
  if (productId) {
    return <JudgeMeReviews productId={productId} productHandle={productHandle} productTitle={productTitle} />;
  }

  return (
    <section className="py-12 sm:py-16 bg-muted/20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center bg-card rounded-2xl border border-border/50 p-6 sm:p-8">
          <h2 className="font-display text-2xl md:text-3xl mb-2" style={{ letterSpacing: '-0.02em' }}>
            Customer Reviews
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Reviews for {productTitle} are collected through our verified review platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
