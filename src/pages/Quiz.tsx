import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Check, Gift } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/seo';
import { quizQuestions, pickBundleFromTags, pickSingleProductFromTags } from '@/data/quizQuestions';
import { bundles } from '@/data/bundles';
import { toast } from 'sonner';
import { useRegion } from '@/hooks/useRegion';

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const { formatPrice } = useRegion();

  const totalSteps = quizQuestions.length;
  const currentQuestion = quizQuestions[step];
  const progress = showResult ? 100 : ((step + 1) / (totalSteps + 1)) * 100;

  const handleSelect = (optionLabel: string, tags: string[]) => {
    const next = { ...answers, [currentQuestion.id]: tags };
    setAnswers(next);

    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        setShowResult(true);
        // Auto-store quiz reward code so it auto-applies at checkout
        try {
          window.localStorage.setItem('neuvie-discount-code', 'QUIZ15');
        } catch {
          // ignore
        }
      }
    }, 250);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Compute recommendation
  const tagCounts: Record<string, number> = {};
  Object.values(answers).forEach((tags) => {
    tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });
  const recommendation = pickBundleFromTags(tagCounts);
  const matchedBundle = bundles.find((b) => b.id === recommendation.bundleId) || bundles[0];
  const singleProduct = pickSingleProductFromTags(tagCounts);

  const copyDiscount = async () => {
    try {
      await navigator.clipboard.writeText('QUIZ15');
      toast.success('Code copied!', { description: 'QUIZ15 — paste it at checkout.' });
    } catch {
      toast.info('Your code: QUIZ15');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Find Your Perfect Strip in 30 Seconds | NEUVIE™"
        description="Take our 30-second quiz to find the wellness strip bundle built for your goals, lifestyle, and routine. Plus, get 15% off your match."
      />
      <Navbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="container-narrow max-w-2xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
              <span>
                {showResult
                  ? 'Your Match'
                  : `Question ${step + 1} of ${totalSteps}`}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-display text-3xl md:text-4xl mb-3 text-center">
                  {currentQuestion.question}
                </h1>
                {currentQuestion.subtitle && (
                  <p className="text-muted-foreground text-center mb-8">
                    {currentQuestion.subtitle}
                  </p>
                )}

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id]?.join(',') === option.tags.join(',');
                    return (
                      <button
                        key={option.label}
                        onClick={() => handleSelect(option.label, option.tags)}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 group ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-card'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium text-base md:text-lg">
                            {option.label}
                          </span>
                          <ArrowRight
                            className={`h-5 w-5 flex-shrink-0 transition-all ${
                              isSelected
                                ? 'text-primary translate-x-1'
                                : 'text-muted-foreground group-hover:text-primary group-hover:translate-x-1'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-full mb-5">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold">Your Personalized Match</span>
                </div>

                <h1 className="font-display text-3xl md:text-5xl mb-4">
                  Your two best paths
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  Based on your answers, here's the complete bundle we built for you —
                  plus the single strip to start with if you want to test the routine first.
                </p>

                {/* Two-Card Recommendation Grid: Bundle + Single Product */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 text-left">
                  {/* RECOMMENDED BUNDLE */}
                  <div className="bg-card border-2 border-primary/30 rounded-2xl p-5 md:p-6 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                        Best Match · Full Routine
                      </span>
                      <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
                        SAVE {matchedBundle.discountPercent}%
                      </span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl mb-1">{matchedBundle.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3">
                      {recommendation.reason}
                    </p>

                    <ul className="space-y-1.5 mb-4 flex-1">
                      {matchedBundle.products.slice(0, 4).map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs md:text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{p} Strips</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl md:text-3xl font-bold text-primary">
                        {formatPrice(matchedBundle.salePrice)}
                      </span>
                      <span className="text-sm md:text-base text-muted-foreground line-through">
                        {formatPrice(matchedBundle.originalPrice)}
                      </span>
                    </div>

                    <Link to={`/bundles/${matchedBundle.id}`} className="w-full">
                      <Button
                        size="lg"
                        className="w-full h-12 text-sm font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Shop the Bundle
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* SINGLE STRIP STARTER */}
                  <div className="bg-card border-2 border-border rounded-2xl p-5 md:p-6 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
                        Start Small · Single Strip
                      </span>
                      <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
                        FROM {formatPrice(34.99)}
                      </span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl mb-1">{singleProduct.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3">
                      {singleProduct.reason}
                    </p>

                    <ul className="space-y-1.5 mb-4 flex-1">
                      <li className="flex items-start gap-2 text-xs md:text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>30-day supply (30 strips)</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs md:text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Dissolves in ~30 seconds</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs md:text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Subscribe & save 20%</span>
                      </li>
                    </ul>

                    <p className="text-[11px] text-muted-foreground mb-3">
                      No commitment. Try one strip, build the routine.
                    </p>

                    <Link to={`/product/${singleProduct.handle}`} className="w-full">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full h-12 text-sm font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Try {singleProduct.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-dashed border-accent/40 rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gift className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-accent">Quiz Reward — Extra 15% Off</span>
                  </div>
                  <button
                    onClick={copyDiscount}
                    className="font-mono text-2xl font-bold tracking-widest bg-background px-6 py-3 rounded-lg border border-accent/30 hover:bg-accent/5 transition-colors"
                  >
                    QUIZ15
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Tap to copy. Works on bundles and single strips.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link to="/shop" className="text-sm text-primary hover:underline font-medium">
                    Browse all 13 strips
                  </Link>
                  <span className="hidden sm:inline text-muted-foreground">·</span>
                  <button
                    onClick={() => {
                      setStep(0);
                      setAnswers({});
                      setShowResult(false);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    Retake quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
