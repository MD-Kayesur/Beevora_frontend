'use client';
import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Star, ShieldAlert, Award, Sparkles, RefreshCw, ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

// Quiz Questions Setup
interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    icon: string;
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your primary wellness goal?",
    subtitle: "Select the health or dietary benefit you care about most.",
    options: [
      { label: "Immunity & Defense", description: "Fights infections, cold/flu, and soothes throats.", value: "immunity", icon: "🛡️" },
      { label: "Relaxation & Better Sleep", description: "Calms the nervous system, great for evenings.", value: "sleep", icon: "💤" },
      { label: "Energy & Daily Vitality", description: "Natural fuel boost, excellent pre-workout energy.", value: "energy", icon: "⚡" },
      { label: "Gourmet Flavor & Pairing", description: "Tastes exceptional in tea, spreads, and pastries.", value: "flavor", icon: "🍯" }
    ]
  },
  {
    id: 2,
    question: "Select your preferred flavor profile:",
    subtitle: "Honey tastes range from light and clean to deep and herbal.",
    options: [
      { label: "Earthy, Rich & Bold", description: "Deep molasses notes, strong herbal undertones.", value: "earthy", icon: "🍂" },
      { label: "Fruity, Floral & Sweet", description: "Light citrus hints, fragrant blossom aroma.", value: "floral", icon: "🌸" },
      { label: "Mild, Clean & Smooth", description: "Traditional sweet finish, perfectly balanced.", value: "mild", icon: "✨" }
    ]
  },
  {
    id: 3,
    question: "How do you plan to enjoy your honey?",
    subtitle: "Different honeys pair best with specific foods.",
    options: [
      { label: "Direct spoonfuls for wellness", description: "Consuming raw as a daily tonic.", value: "direct", icon: "🥄" },
      { label: "Mixed in hot tea, coffee or milk", description: "Easily dissolves, enhances hot beverages.", value: "tea", icon: "☕" },
      { label: "Spread on waffles, pancakes or toast", description: "Perfect thick topping for morning snacks.", value: "topping", icon: "🥞" }
    ]
  }
];

export default function HoneyQuizPage() {
  const { products, isLoading } = useProducts();
  const { addItem } = useCart();

  const [currentStep, setCurrentStep] = useState(0); // 0 = start, 1-3 = questions, 4 = results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedProduct, setRecommendedProduct] = useState<any | null>(null);
  const [matchPercentage, setMatchPercentage] = useState(95);
  const [matchReason, setMatchReason] = useState('');

  const startQuiz = () => {
    setAnswers({});
    setCurrentStep(1);
    setRecommendedProduct(null);
  };

  const handleSelectOption = (value: string) => {
    const questionKey = `q${currentStep}`;
    const updatedAnswers = { ...answers, [questionKey]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Recommendations
      calculateResults(updatedAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, string>) => {
    const goal = finalAnswers.q1;
    const taste = finalAnswers.q2;
    const usage = finalAnswers.q3;

    // Filter honey products
    const honeys = products.filter(p => p.category === 'Honey' || p.category === 'honey');
    
    let targetProductName = 'Beevora Original Honey'; // Default fallback
    let reason = "This is our signature wildflower honey, perfectly balanced for all spreads and morning teas.";
    let percent = 92;

    if (goal === 'immunity' || taste === 'earthy' || usage === 'direct') {
      targetProductName = 'Beevora Manuka Gold';
      reason = "Our premium Manuka Gold contains concentrated antibacterial factors, making it an extraordinary daily wellness spoonful to naturally supercharge your immune system and soothe throat inflammation.";
      percent = 98;
    } else if (goal === 'sleep' || taste === 'floral' || usage === 'tea') {
      targetProductName = 'Beevora Wildflower Honey';
      reason = "This organic wildflower nectar is loaded with natural calming enzymes. Formulated by mountain bees, it blends flawlessly in warm evening teas to naturally promote restful, deep sleep cycle recovery.";
      percent = 96;
    } else if (goal === 'energy' || usage === 'topping') {
      targetProductName = 'Beevora Original Honey';
      reason = "Our standard raw honey contains natural low-glycemic fructose that delivers an instant, long-lasting energy boost without sugar spikes, perfect on morning toast or pre-workout breakfast bowls.";
      percent = 95;
    }

    // Find the actual product object from products list
    const matched = honeys?.find(p => p?.name?.toLowerCase()?.includes(targetProductName?.toLowerCase()) || targetProductName?.toLowerCase()?.includes(p?.name?.toLowerCase())) || honeys[0];

    setRecommendedProduct(matched);
    setMatchReason(reason);
    setMatchPercentage(percent);
    setCurrentStep(4); // Move to results step
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Intro Landing screen */}
      {currentStep === 0 && (
        <Card className="p-8 md:p-12 text-center bg-[#0D1428] border-white/10 relative overflow-hidden shadow-2xl rounded-3xl space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto text-amber-500 border border-amber-500/20 animate-bounce">
            <Sparkles className="h-8 w-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Find Your Perfect <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Honey Match</span>
            </h1>
            <p className="text-white/60 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
              Take our quick, 1-minute gamified Wellness Pairing Quiz to discover the perfect raw, organic honey tailored to your tastebuds and dietary goals.
            </p>
          </div>

          <div className="pt-4">
            <Button
              size="xl"
              onClick={startQuiz}
              className="px-10 shadow-xl shadow-amber-500/10 hover:scale-105 transition-all"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Start Wellness Quiz
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5 text-[10px] sm:text-xs text-white/40 font-mono">
            <div>⏱️ 1 MINUTE</div>
            <div>🔬 WELLNESS METRICS</div>
            <div>🎁 EXCLUSIVE RECOMMENDATION</div>
          </div>
        </Card>
      )}

      {/* Quiz Questions Screens */}
      {currentStep >= 1 && currentStep <= 3 && (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-1">
            <span>QUESTION {currentStep} OF 3</span>
            <span>{Math.round(((currentStep - 1) / 3) * 100)}% COMPLETE</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-amber-500 transition-all duration-500 ease-out" 
              style={{ width: `${(currentStep / 3) * 100}%` }} 
            />
          </div>

          {/* Question card */}
          {QUESTIONS.map((q) => {
            if (q.id !== currentStep) return null;
            return (
              <Card key={q.id} className="p-6 sm:p-10 bg-[#0D1428] border-white/10 rounded-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{q.question}</h2>
                  <p className="text-sm text-white/50">{q.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value)}
                      className="group p-5 text-left rounded-2xl bg-white/3 border border-white/5 hover:border-amber-500/50 hover:bg-white/5 flex gap-4 items-start transition-all cursor-pointer hover:scale-[1.02]"
                    >
                      <span className="text-2xl p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 group-hover:scale-110 transition-all">
                        {opt.icon}
                      </span>
                      <div className="space-y-1">
                        <p className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">{opt.label}</p>
                        <p className="text-xs text-white/40 leading-relaxed">{opt.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Results / Recommendation Screen */}
      {currentStep === 4 && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Spinner size="lg" />
              <p className="text-xs text-white/40 font-mono tracking-widest animate-pulse uppercase">Formulating your pairing match...</p>
            </div>
          ) : recommendedProduct ? (
            <div className="space-y-8">
              {/* Header Title */}
              <div className="text-center space-y-2">
                <Badge variant="warning" className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-2">
                  ✨ Quiz Result Match
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Your Perfect Honey Pairing</h1>
                <p className="text-sm text-white/40 max-w-md mx-auto">Based on your wellness goals, flavor preference, and culinary pairing choices.</p>
              </div>

              {/* Recommendation Presentation Card */}
              <Card className="bg-[#0D1428] border-white/10 p-6 sm:p-10 rounded-3xl relative overflow-hidden">
                {/* Glowing match badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 rounded-full px-4 py-1.5 text-xs font-bold font-mono shadow-lg flex items-center gap-1.5 animate-pulse">
                  <CheckCircle className="h-3.5 w-3.5" /> {matchPercentage}% MATCH
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Column: Product Image visualizer */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 group flex items-center justify-center p-6 shadow-inner">
                    {recommendedProduct.thumbnail ? (
                      <img 
                        src={recommendedProduct.thumbnail} 
                        alt={recommendedProduct.name} 
                        className="object-contain max-h-72 w-full rounded-xl select-none group-hover:scale-105 transition-transform" 
                      />
                    ) : (
                      <Sparkles className="h-16 w-16 text-amber-500/20" />
                    )}
                  </div>

                  {/* Right Column: Product details and checkout trigger */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{recommendedProduct.name}</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.round(recommendedProduct.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-white/40">({recommendedProduct.reviewCount || 0} customer reviews)</span>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed">{matchReason}</p>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">{formatPrice(recommendedProduct.price)}</span>
                      <span className="text-xs text-white/30 uppercase font-bold tracking-wider">In Stock</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        size="xl"
                        className="flex-1 shadow-xl shadow-amber-500/20"
                        leftIcon={<ShoppingCart className="h-5 w-5" />}
                        onClick={() => addItem(recommendedProduct)}
                      >
                        Add Match to Cart
                      </Button>
                      <Link href={`/products/${recommendedProduct.id}`} className="block">
                        <Button
                          size="xl"
                          variant="secondary"
                          className="w-full border-white/20 hover:bg-white/10"
                        >
                          View Full Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Reset Quiz Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={startQuiz}
                  className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white uppercase tracking-wider transition-colors cursor-pointer group"
                >
                  <RefreshCw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Retake Wellness Quiz</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-4 bg-white/3 border border-white/5 rounded-3xl">
              <ShieldAlert className="h-10 w-10 text-red-500/60 mx-auto" />
              <p className="text-sm text-white/50">Could not formulate a honey recommendation. Please verify seeded products exist in the database.</p>
              <Button size="sm" onClick={startQuiz}>Try Again</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple Badge Helper
function Badge({ children, className = '', variant = 'primary' }: { children: React.ReactNode, className?: string, variant?: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}
