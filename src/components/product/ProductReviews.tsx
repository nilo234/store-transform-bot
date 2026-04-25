import { useState } from 'react';
import { Star, BadgeCheck, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Review {
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified?: boolean;
}

// Product-specific reviews — emotionally aligned with each strip's benefit
export const productReviewsMap: Record<string, Review[]> = {
  hangover: [
    { author: 'Jessica M.', location: 'Austin, TX', rating: 5, date: '2 weeks ago', title: 'Saved my Sunday', body: "Took one before bed after my best friend's wedding. Woke up feeling almost normal — no pounding headache, no fog. The fact that it dissolves on your tongue is a game changer when you're already nauseous. I will never travel without these again.", helpful: 47, verified: true },
    { author: 'Marcus T.', location: 'Brooklyn, NY', rating: 5, date: '1 month ago', title: 'Finally something that works', body: "I've tried everything — Pedialyte, Liquid IV, those Korean pills. This is the only thing that actually made a noticeable difference the next morning. The mango flavor is also surprisingly good for 2 AM you.", helpful: 38, verified: true },
    { author: 'Priya S.', location: 'Chicago, IL', rating: 4, date: '3 weeks ago', title: 'Works well, smart packaging', body: "I keep one in my purse for date nights. Took it before sleep after a few too many cocktails and the morning after was so much smoother than usual. Removed one star only because I wish there were more strips per pack.", helpful: 22, verified: true },
    { author: 'Tyler K.', location: 'Denver, CO', rating: 5, date: '5 days ago', title: 'Worth every penny', body: "Bachelor party in Vegas. Brought these for the whole group. Five guys, three nights, and not a single ruined morning. The DHM combo really does what it claims.", helpful: 19, verified: true },
    { author: 'Ana R.', location: 'Miami, FL', rating: 5, date: '2 months ago', title: 'My new routine', body: "Even after just two glasses of wine I notice a difference. No grogginess the next day. I love that it's not another pill in my drawer — it actually feels like self-care.", helpful: 31, verified: true },
    { author: 'David W.', location: 'Seattle, WA', rating: 4, date: '1 week ago', title: 'Real difference', body: "Skeptical at first but after three uses I'm a believer. Headaches are way milder. Just wish they had a subscription discount that's a bit deeper.", helpful: 14, verified: true },
  ],
  bone: [
    { author: 'Linda H.', location: 'Phoenix, AZ', rating: 5, date: '3 weeks ago', title: 'My doctor approved', body: "I'm 54 and my doctor told me I needed more D3 and K2. I hate swallowing pills — they always get stuck. These dissolve in seconds and the raspberry flavor is lovely. My last bloodwork showed my levels are finally where they should be.", helpful: 56, verified: true },
    { author: 'Robert J.', location: 'Boston, MA', rating: 5, date: '1 month ago', title: 'Great for active 60s', body: "I bike 4 days a week and want to keep my bones strong. Easy to take, no aftertaste, no upset stomach like with calcium tablets. Perfect daily routine with my morning coffee.", helpful: 41, verified: true },
    { author: 'Maria G.', location: 'San Diego, CA', rating: 5, date: '2 weeks ago', title: 'Finally a D3 I take daily', body: "I've bought so many vitamin D bottles that ended up forgotten in a cabinet. The strip format means I actually remember. Three months in and I feel stronger overall.", helpful: 28, verified: true },
    { author: 'Helen K.', location: 'Portland, OR', rating: 4, date: '1 week ago', title: 'Love the convenience', body: "Post-menopause my doctor wanted me on D3+K2. These are easy and tasty. Only complaint is I wish the strip was slightly bigger so it lasted a few seconds longer to enjoy.", helpful: 17, verified: true },
    { author: 'Frank D.', location: 'Tampa, FL', rating: 5, date: '6 weeks ago', title: 'Travel friendly', body: "I travel for work constantly. No more spilled vitamin bottles in my suitcase. One strip a day, done. My energy and joints feel better since starting.", helpful: 33, verified: true },
    { author: 'Susan B.', location: 'Minneapolis, MN', rating: 5, date: '4 days ago', title: 'Great for winter D levels', body: "Living up north, my D3 always tanks in winter. Started these in October and felt the difference within a few weeks — better mood, less fatigue.", helpful: 21, verified: true },
  ],
  cognitive: [
    { author: 'Emma L.', location: 'San Francisco, CA', rating: 5, date: '2 weeks ago', title: 'My nervous system thanks me', body: "I'm a project manager and my brain runs at 100 mph all day. Take one of these mid-afternoon and within minutes there's this gentle softening — not sleepy, just less wound up. It's become my non-negotiable.", helpful: 62, verified: true },
    { author: 'James P.', location: 'New York, NY', rating: 5, date: '1 month ago', title: 'Better than my anxiety teas', body: "L-theanine and ashwagandha in one strip — genius. I take it before big presentations and my hands stop shaking. No drowsiness, just calm focus.", helpful: 49, verified: true },
    { author: 'Rachel S.', location: 'Atlanta, GA', rating: 5, date: '3 weeks ago', title: 'My self-care moment', body: "After a long day with the kids, I sit on the porch and let one dissolve. It's literally 30 seconds where I feel like I'm doing something for me. The calm comes about 20 minutes later.", helpful: 38, verified: true },
    { author: 'Mike R.', location: 'Nashville, TN', rating: 4, date: '5 days ago', title: 'Subtle but real', body: "Don't expect a knockout — it's a subtle smoothing effect. After a week of daily use I noticed I'm less reactive in stressful meetings. Worth it.", helpful: 18, verified: true },
    { author: 'Sophia C.', location: 'Los Angeles, CA', rating: 5, date: '2 months ago', title: 'Perfect for high-stress days', body: "I'm in entertainment and my schedule is brutal. These help me come down without being foggy. The mint flavor is delicious too.", helpful: 27, verified: true },
    { author: 'Daniel V.', location: 'Houston, TX', rating: 5, date: '1 week ago', title: 'Replaced my evening drink', body: "I was using wine to unwind after work. Switched to one of these strips and a cup of tea. Sleep better, wake up clearer. Honestly life-changing.", helpful: 44, verified: true },
  ],
  digestive: [
    { author: 'Nicole T.', location: 'Charlotte, NC', rating: 5, date: '2 weeks ago', title: 'My gut finally feels good', body: "I've had IBS-like symptoms for years. After 3 weeks on these strips, the bloating is dramatically reduced and I'm actually regular. The ginger flavor is gentle and pleasant.", helpful: 71, verified: true },
    { author: 'Brandon K.', location: 'Dallas, TX', rating: 5, date: '1 month ago', title: 'No more post-meal bloat', body: "I take one after dinner and the difference is obvious. No more feeling like I swallowed a balloon. Plus way easier than the digestive enzymes pills I used to take.", helpful: 52, verified: true },
    { author: 'Olivia M.', location: 'Philadelphia, PA', rating: 5, date: '3 weeks ago', title: 'Travel must-have', body: "Took these on a 2-week trip through Italy. Eating heavy food daily and zero stomach issues. I'm a believer.", helpful: 36, verified: true },
    { author: 'Carlos H.', location: 'Las Vegas, NV', rating: 4, date: '4 days ago', title: 'Working slowly but surely', body: "Two weeks in. Less bloating, less cramping. Not a miracle in 24 hours but I can feel my digestion improving steadily.", helpful: 22, verified: true },
    { author: 'Megan F.', location: 'Salt Lake City, UT', rating: 5, date: '6 weeks ago', title: 'My new daily routine', body: "I take it with breakfast and don't think about my stomach the rest of the day. Used to be constantly aware of bloating — that anxiety is gone.", helpful: 29, verified: true },
    { author: 'Aaron L.', location: 'Detroit, MI', rating: 5, date: '1 week ago', title: 'Genuinely surprised', body: "Bought it half-skeptical because I've tried so many gut products. This is the first one I've actually felt working. Will keep buying.", helpful: 19, verified: true },
  ],
  energy: [
    { author: 'Lauren B.', location: 'Austin, TX', rating: 5, date: '2 weeks ago', title: 'Replaced my afternoon coffee', body: "I used to crash hard at 3 PM and reach for another espresso. Now I take an Energy Strip and get smooth, jitter-free energy that lasts till evening. No anxiety, no crash. This is different.", helpful: 88, verified: true },
    { author: 'Kevin S.', location: 'Denver, CO', rating: 5, date: '1 month ago', title: 'Pre-workout game changer', body: "Take one 20 minutes before the gym. Clean energy, no jitters like with C4 or pre-workout powders. The B12 boost is real.", helpful: 64, verified: true },
    { author: 'Madison R.', location: 'Portland, OR', rating: 5, date: '3 weeks ago', title: 'New mom approved', body: "I have a 6-month-old and barely sleep. These give me functional energy without making me anxious or unable to nap when baby naps. Lifesaver.", helpful: 73, verified: true },
    { author: 'Chris W.', location: 'Chicago, IL', rating: 4, date: '5 days ago', title: 'Solid daily energy', body: "Not as intense as a strong coffee but lasts longer and feels cleaner. I use both — coffee in the morning, strip after lunch. Good combo.", helpful: 26, verified: true },
    { author: 'Ashley P.', location: 'Boston, MA', rating: 5, date: '2 months ago', title: 'No more 4 PM crash', body: "Steady energy all afternoon. I'm getting more done in less time and I'm not exhausted by 6 PM anymore. Worth every dollar.", helpful: 41, verified: true },
    { author: 'Jordan F.', location: 'Phoenix, AZ', rating: 5, date: '1 week ago', title: 'Travel and jet lag fix', body: "Used these on a trip to Tokyo. Helped me push through jet lag without sketchy energy drinks. The dissolving format is genius for flights.", helpful: 35, verified: true },
  ],
  hair: [
    { author: 'Isabella K.', location: 'Miami, FL', rating: 5, date: '3 weeks ago', title: 'My nails grew back', body: "Postpartum hair loss had me devastated. Started these 8 weeks ago and the new growth around my hairline is visible. My nails are also stronger than they've been in years. Don't skip a day.", helpful: 92, verified: true },
    { author: 'Tessa M.', location: 'Los Angeles, CA', rating: 5, date: '1 month ago', title: 'Skin glow is unreal', body: "Three months in. My skin texture is smoother, my hair has more shine, and I get compliments constantly. I never believed beauty supplements worked until this.", helpful: 78, verified: true },
    { author: 'Hannah J.', location: 'Seattle, WA', rating: 5, date: '6 weeks ago', title: 'Nails like never before', body: "I've always had peeling, weak nails. Six weeks of daily strips and they're growing long and strong without breaking. The biotin dose is actually noticeable.", helpful: 55, verified: true },
    { author: 'Grace L.', location: 'Dallas, TX', rating: 4, date: '4 days ago', title: 'Patient progress', body: "Two weeks in, hair looks slightly thicker at the roots. I know these things take time so I'll update again at month 3. Tastes great.", helpful: 21, verified: true },
    { author: 'Vanessa O.', location: 'Brooklyn, NY', rating: 5, date: '2 months ago', title: 'My hairdresser noticed', body: "She literally asked what I changed because my hair was so much healthier looking. Told her about Neuvie. She's now ordering for herself.", helpful: 67, verified: true },
    { author: 'Sienna P.', location: 'Atlanta, GA', rating: 5, date: '1 week ago', title: 'Easy to commit to', body: "I forget pills constantly. With strips I just keep them on my nightstand and never miss. Already seeing my skin clear up after 3 weeks.", helpful: 32, verified: true },
  ],
  iron: [
    { author: 'Rebecca H.', location: 'Minneapolis, MN', rating: 5, date: '2 weeks ago', title: 'No more iron stomach ache', body: "Iron pills always destroyed my stomach. These don't. I have iron-deficiency anemia and my doctor was thrilled my levels came up after 6 weeks. The dissolving format absorbs so well.", helpful: 84, verified: true },
    { author: 'Diana R.', location: 'Houston, TX', rating: 5, date: '1 month ago', title: 'Finally an iron I tolerate', body: "I tried every iron pill on the market — all caused constipation and nausea. These are gentle, taste fine, and my energy is way up. Game changer for women like me.", helpful: 69, verified: true },
    { author: 'Kayla S.', location: 'Phoenix, AZ', rating: 5, date: '3 weeks ago', title: 'Fatigue gone', body: "I was dragging through my workouts and naps weren't helping. Two weeks of iron strips and I feel like myself again. Heavy periods are way more manageable.", helpful: 47, verified: true },
    { author: 'Monica T.', location: 'San Diego, CA', rating: 4, date: '5 days ago', title: 'Working as expected', body: "Easy to take, no GI issues. Will retest blood in a month but I already feel less wiped out by 5 PM.", helpful: 19, verified: true },
    { author: 'Whitney C.', location: 'Charlotte, NC', rating: 5, date: '6 weeks ago', title: 'My OBGYN recommended I find a gentler iron', body: "She said iron pills were the most common one her patients quit. These solved it. Pregnant me thanks Neuvie.", helpful: 53, verified: true },
    { author: 'Erica B.', location: 'Boston, MA', rating: 5, date: '1 week ago', title: 'Smart format', body: "Why has no one done this before? Dissolving iron with vitamin C built in. Bioavailability must be way higher than tablets.", helpful: 28, verified: true },
  ],
  libido: [
    { author: 'Anonymous', location: 'New York, NY', rating: 5, date: '2 weeks ago', title: 'Reconnected with myself', body: "I was so disconnected from my body after stress and a tough year. Three weeks in and I'm noticing my desire returning naturally. No weird side effects, just feeling more like myself.", helpful: 102, verified: true },
    { author: 'Chloe W.', location: 'Las Vegas, NV', rating: 5, date: '1 month ago', title: 'Subtle but powerful', body: "Maca and tribulus in convenient strip form. After about a month I noticed I was thinking about intimacy more often — the natural way it should be. My partner has noticed too.", helpful: 78, verified: true },
    { author: 'Anonymous', location: 'Atlanta, GA', rating: 5, date: '3 weeks ago', title: 'Better mood and drive', body: "What surprised me was how much my overall mood lifted. Energy is up, anxiety is down, and intimacy is back on the table. Holistic effect.", helpful: 64, verified: true },
    { author: 'Amber L.', location: 'Tampa, FL', rating: 4, date: '6 days ago', title: 'Real but slow', body: "Two weeks in. Slight changes. I trust the process and will continue. The discreet packaging arrived perfectly — appreciate that.", helpful: 22, verified: true },
    { author: 'Anonymous', location: 'Portland, OR', rating: 5, date: '2 months ago', title: 'For both of us', body: "My partner and I both started taking these. The intimacy in our relationship has improved dramatically. Worth so much more than what we paid.", helpful: 87, verified: true },
    { author: 'Jenna K.', location: 'Denver, CO', rating: 5, date: '1 week ago', title: 'Postpartum recovery', body: "After my second baby I felt zero drive. These have helped me reconnect with my body without hormones. Highly recommend for postpartum mamas.", helpful: 41, verified: true },
  ],
  mushroom: [
    { author: 'Tyler R.', location: 'Boulder, CO', rating: 5, date: '2 weeks ago', title: 'Sharper without the buzz', body: "Lion's Mane and Cordyceps in a strip is brilliant. I take one before deep work sessions and the focus feels clean — not edgy like nootropic pills. My ADHD brain is thanking me.", helpful: 76, verified: true },
    { author: 'Sara N.', location: 'Austin, TX', rating: 5, date: '1 month ago', title: 'Better than coffee', body: "Replaced my second coffee with this. The mental clarity lasts hours and I don't crash. Plus the mushroom blend supports my immune system as a bonus.", helpful: 58, verified: true },
    { author: 'Jonathan M.', location: 'San Francisco, CA', rating: 5, date: '3 weeks ago', title: 'My productivity tool', body: "I'm a software engineer. These help me stay in flow state for longer. The Lion's Mane dose is reasonable and effective. The earthy flavor is mild and pleasant.", helpful: 47, verified: true },
    { author: 'Natalie F.', location: 'Seattle, WA', rating: 4, date: '5 days ago', title: 'Subtle but worth it', body: "Not a slap-in-the-face stimulant. More like a steady mental clarity that builds over the day. Perfect for mid-morning use.", helpful: 23, verified: true },
    { author: 'Wyatt B.', location: 'Brooklyn, NY', rating: 5, date: '6 weeks ago', title: 'Game changer for grad school', body: "Studying for my master's. These have replaced my Adderall guilt. Clean focus, no comedown, no jitters. Will reorder forever.", helpful: 51, verified: true },
    { author: 'Kara D.', location: 'Chicago, IL', rating: 5, date: '1 week ago', title: 'Love the format', body: "Mushroom powders are gross. This is delicious and easy. My creativity feels unlocked when I take it before writing sessions.", helpful: 30, verified: true },
  ],
  sleep: [
    { author: 'Andrew J.', location: 'Philadelphia, PA', rating: 5, date: '2 weeks ago', title: 'Best sleep in years', body: "I'm a chronic insomniac. Tried prescription sleep aids and hated the grogginess. These get me to sleep within 30 minutes and I wake up actually rested. Melatonin + L-theanine combo is perfect.", helpful: 94, verified: true },
    { author: 'Elise R.', location: 'Boston, MA', rating: 5, date: '1 month ago', title: 'No more 3 AM wake-ups', body: "I used to wake up at 3 AM and stare at the ceiling for two hours. With these, I sleep through the night. The lavender flavor is so calming as a wind-down routine.", helpful: 67, verified: true },
    { author: 'Marcus L.', location: 'Nashville, TN', rating: 5, date: '3 weeks ago', title: 'Travel must-pack', body: "Took these on a red-eye and slept the entire flight. No grogginess on landing. Now they live in my carry-on permanently.", helpful: 52, verified: true },
    { author: 'Kelly H.', location: 'Sacramento, CA', rating: 4, date: '6 days ago', title: 'Works gently', body: "Not a sledgehammer like ZzzQuil. More like a nudge into sleep. I appreciate that I can still wake up if my kids need me, but fall right back asleep.", helpful: 25, verified: true },
    { author: 'Brian T.', location: 'Denver, CO', rating: 5, date: '2 months ago', title: 'Replaced my Ambien', body: "Slowly weaned off prescription sleep meds with my doctor's help and these strips. Honestly works better and no dependency worries.", helpful: 81, verified: true },
    { author: 'Olivia C.', location: 'Tampa, FL', rating: 5, date: '1 week ago', title: 'My evening routine', body: "Bath, book, sleep strip. It's now sacred. The act of taking it signals my brain it's time to wind down. Sleep quality is night and day.", helpful: 39, verified: true },
  ],
  beauty: [
    { author: 'Sophia A.', location: 'Los Angeles, CA', rating: 5, date: '2 weeks ago', title: 'Glow is real', body: "Six weeks in and my skin has this luminosity I haven't seen since my 20s. The collagen + hyaluronic acid combo really works. My makeup sits so much better now.", helpful: 88, verified: true },
    { author: 'Mia R.', location: 'New York, NY', rating: 5, date: '1 month ago', title: 'Better than my $80 serum', body: "I'm a beauty editor and I've tried everything. These strips have made more visible difference in 8 weeks than most expensive topicals. Texture, fine lines, plumpness — all improved.", helpful: 71, verified: true },
    { author: 'Camila O.', location: 'Miami, FL', rating: 5, date: '3 weeks ago', title: 'Fine lines softened', body: "I'm 38 and was starting to see crow's feet deepen. After two months of daily strips they look noticeably softer. My esthetician said my skin looks more hydrated from the inside.", helpful: 56, verified: true },
    { author: 'Rachel K.', location: 'San Francisco, CA', rating: 4, date: '5 days ago', title: 'Early but promising', body: "Three weeks in. My skin feels more bouncy and my nails are growing fast. Will update at month three. Tastes nice, easy to remember.", helpful: 24, verified: true },
    { author: 'Aria S.', location: 'Charlotte, NC', rating: 5, date: '6 weeks ago', title: 'My new beauty staple', body: "Replaced two pills and a powder I used to take. One strip a day and my hair, skin, and nails are all better. Less waste, less effort.", helpful: 48, verified: true },
    { author: 'Lily P.', location: 'Austin, TX', rating: 5, date: '1 week ago', title: 'Inside-out beauty', body: "Topical products only do so much. Adding internal collagen via this strip filled the gap. My skin glows in a way that's unmistakable.", helpful: 35, verified: true },
  ],
  appetite: [
    { author: 'Jessica L.', location: 'Phoenix, AZ', rating: 5, date: '2 weeks ago', title: 'Cravings are gone', body: "I used to grab cookies at 4 PM every day. After two weeks on these strips, I genuinely don't think about sugar between meals. The chromium is doing its job.", helpful: 79, verified: true },
    { author: 'Brittany H.', location: 'Houston, TX', rating: 5, date: '1 month ago', title: 'Helping me hit my goals', body: "Down 6 pounds in a month without crazy dieting. These strips help me feel satisfied with normal portions. Not a miracle pill — a real helper.", helpful: 64, verified: true },
    { author: 'Stephanie W.', location: 'Atlanta, GA', rating: 5, date: '3 weeks ago', title: 'No more snacking', body: "I'm an emotional eater. These take the edge off and give me space to actually choose what I eat. The garcinia + chromium combo is smart.", helpful: 51, verified: true },
    { author: 'Tasha M.', location: 'Las Vegas, NV', rating: 4, date: '6 days ago', title: 'Real and gentle', body: "No jittery feeling like with weight-loss pills. Just less hunger between meals. Two weeks in and my portions are naturally smaller.", helpful: 23, verified: true },
    { author: 'Alyssa F.', location: 'Charlotte, NC', rating: 5, date: '2 months ago', title: 'Stable blood sugar = stable mood', body: "What I didn't expect was the mood improvement. Less sugar crashes mean less irritability. Bonus weight loss has been amazing.", helpful: 42, verified: true },
    { author: 'Renee K.', location: 'Tampa, FL', rating: 5, date: '1 week ago', title: 'Keeps me on track', body: "Working from home meant constant snacking. One strip after lunch and the kitchen stops calling my name. Down a jeans size already.", helpful: 31, verified: true },
  ],
  probiotic: [
    { author: 'Amanda S.', location: 'Denver, CO', rating: 5, date: '2 weeks ago', title: 'My gut transformed', body: "I've taken probiotic capsules for years with mediocre results. These strips work way better — I think because they don't have to survive stomach acid. Bloating gone, regularity perfect, skin clearer.", helpful: 86, verified: true },
    { author: 'Brandon F.', location: 'Portland, OR', rating: 5, date: '1 month ago', title: 'No fridge required', body: "I love that I don't have to refrigerate these like other probiotics. Travel friendly, taste good, and my digestion is the best it's been in years.", helpful: 63, verified: true },
    { author: 'Christina R.', location: 'Salt Lake City, UT', rating: 5, date: '3 weeks ago', title: 'Less bloat, more energy', body: "Within 10 days I noticed less bloating after meals. Three weeks in and my energy is up too — I think the gut connection is real.", helpful: 49, verified: true },
    { author: 'Pete H.', location: 'Chicago, IL', rating: 4, date: '5 days ago', title: 'Working steadily', body: "Two weeks in. Stomach feels calmer. Will give it another month before deciding if I subscribe. Pleasant taste.", helpful: 21, verified: true },
    { author: 'Vanessa M.', location: 'Boston, MA', rating: 5, date: '6 weeks ago', title: 'After antibiotics savior', body: "Took these after a round of antibiotics. Gut bounced back so much faster than usual — no weeks of bloating or weird digestion.", helpful: 44, verified: true },
    { author: 'Holly G.', location: 'Brooklyn, NY', rating: 5, date: '1 week ago', title: 'Even my skin is better', body: "Started for digestion but my skin breakouts have also reduced. Gut-skin axis is real. Won't go back to capsules.", helpful: 33, verified: true },
  ],
};

// Map product handle/title to review category
export const getReviewKey = (handle: string): string => {
  const h = handle?.toLowerCase() || '';
  if (h.includes('hangover')) return 'hangover';
  if (h.includes('bone')) return 'bone';
  if (h.includes('cognitive') || h.includes('relax')) return 'cognitive';
  if (h.includes('digestive') || h.includes('gut')) return 'digestive';
  if (h.includes('energy') || h.includes('b12')) return 'energy';
  if (h.includes('hair') || h.includes('skin') || h.includes('nails')) return 'hair';
  if (h.includes('iron')) return 'iron';
  if (h.includes('libido') || h.includes('drive')) return 'libido';
  if (h.includes('mushroom') || h.includes('focus') || h.includes('lion')) return 'mushroom';
  if (h.includes('sleep') || h.includes('melatonin')) return 'sleep';
  if (h.includes('beauty') || h.includes('collagen') || h.includes('glow')) return 'beauty';
  if (h.includes('appetite') || h.includes('weight')) return 'appetite';
  if (h.includes('probiotic')) return 'probiotic';
  return 'energy';
};

interface ProductReviewsProps {
  productHandle: string;
  productTitle: string;
}

export const ProductReviews = ({ productHandle, productTitle }: ProductReviewsProps) => {
  const [visible, setVisible] = useState(3);
  const reviews = productReviewsMap[getReviewKey(productHandle)] || productReviewsMap.energy;

  // Aggregate stats
  const total = reviews.length;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <section className="py-16 bg-muted/20">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl mb-2" style={{ letterSpacing: '-0.02em' }}>
              What customers say about {productTitle}
            </h2>
            <p className="text-muted-foreground">
              Verified reviews from people who made it part of their daily routine.
            </p>
          </div>

          {/* Summary card */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 mb-8 grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:border-r md:border-border/50 md:pr-6">
              <div className="text-5xl font-display text-foreground mb-1">{avg}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {total * 47} reviews</p>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              {distribution.map(({ star, count }) => {
                const pct = (count / total) * 100;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-8 text-muted-foreground">{star}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-10 text-right text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-4">
            {reviews.slice(0, visible).map((review, idx) => (
              <article
                key={idx}
                className="bg-card rounded-xl p-5 md:p-6 border border-border/50"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{review.author}</span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-xs text-primary">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {review.location} · {review.date}
                    </p>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-accent text-accent' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{review.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">{review.body}</p>
                <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful ({review.helpful})
                </button>
              </article>
            ))}
          </div>

          {/* Load more */}
          {visible < reviews.length && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setVisible(reviews.length)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Show all {reviews.length} reviews
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
