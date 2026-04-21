import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Check, Gift } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/seo';
import { quizQuestions, pickBundleFromTags } from '@/data/quizQuestions';
import { bundles } from '@/data/bundles';
import { toast } from 'sonner';

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);

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

                <h1 className="font-display text-4xl md:text-5xl mb-4">
                  {recommendation.bundleName}
                </h1>

                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  {recommendation.reason}
                </p>

                {/* Bundle Card Preview */}
                <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 mb-6 text-left">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-2xl mb-1">{matchedBundle.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {matchedBundle.tagline}
                      </p>
                    </div>
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      SAVE {matchedBundle.discountPercent}%
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {matchedBundle.products.slice(0, 4).map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{p} Strips</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-bold text-primary">
                      ${matchedBundle.salePrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ${matchedBundle.originalPrice.toFixed(2)}
                    </span>
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
                    Tap to copy. Apply at checkout.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/bundles" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-14 px-10 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Shop My Bundle
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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
