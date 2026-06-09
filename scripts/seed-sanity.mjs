import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('Error: Set SANITY_TOKEN environment variable first.');
  process.exit(1);
}

const client = createClient({
  projectId: '9op646qf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// Helper to generate a Sanity doc key
const key = () => Math.random().toString(36).slice(2, 10);

// Convert Section[] → Portable Text blocks
function toPortableText(sections) {
  const blocks = [];
  for (const s of sections) {
    if (s.type === 'paragraph') {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', children: [{ _type: 'span', _key: key(), text: s.content }], markDefs: [] });
    } else if (s.type === 'heading') {
      blocks.push({ _type: 'block', _key: key(), style: 'h2', children: [{ _type: 'span', _key: key(), text: s.content }], markDefs: [] });
    } else if (s.type === 'subheading') {
      blocks.push({ _type: 'block', _key: key(), style: 'h3', children: [{ _type: 'span', _key: key(), text: s.content }], markDefs: [] });
    } else if (s.type === 'quote') {
      blocks.push({ _type: 'block', _key: key(), style: 'blockquote', children: [{ _type: 'span', _key: key(), text: s.content }], markDefs: [] });
    } else if (s.type === 'list' && s.items) {
      for (const item of s.items) {
        blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: key(), text: item }], markDefs: [] });
      }
    }
  }
  return blocks;
}

async function seed() {
  console.log('Seeding Sanity content...\n');

  // ── Site Settings ──────────────────────────────────────────────
  console.log('Creating site settings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    heroHeadline: 'Discover the Healing Power Within You',
    heroSubtext: 'Pranic Healing is a gentle, no-touch energy healing system that guides you from exhaustion to radiant wellbeing.',
    homeBio1: 'Through years of exploring various healing and spiritual modalities, Rosalyn discovered Pranic Healing and non-dualism. These practices have become the foundation of her personal and professional life.',
    homeBio2: 'Based in Paso Robles, Central California, Rosalyn works full-time as a Water Utility Engineer for the City. On weekends and special events, she also works at DENO Winery — bringing the same care and presence to every role she holds.',
    contactPhone: '(805) 555-0123',
    contactEmail: 'rosalyn@zenenergetics.com',
    googleRating: 4.9,
    googleReviewCount: 127,
    googleReviewUrl: 'https://www.google.com/search?q=pranic+healing+rosalyn+piza',
  });
  console.log('  Site settings done.\n');

  // ── Testimonials ───────────────────────────────────────────────
  console.log('Creating testimonials...');
  const testimonials = [
    { name: 'Sarah Jenkins', city: 'Seattle, WA', condition: 'Chronic Migraines', story: 'I had been suffering from chronic migraines for years. After just three sessions, the intensity and frequency reduced dramatically. The gentle approach made me feel so safe and cared for.', order: 1 },
    { name: 'Michael Chen', city: 'San Francisco, CA', condition: 'Anxiety & Grief', story: 'The distance healing sessions were a revelation. I was going through a period of intense grief and anxiety, and I could literally feel the heavy weight lifting off my chest during our sessions.', order: 2 },
    { name: 'Elena Rodriguez', city: 'Austin, TX', condition: 'Post-Surgery Recovery', story: 'I sought pranic healing to help with my recovery post-surgery. My doctor was amazed at how quickly my incision healed and how high my energy levels were compared to normal recovery times.', order: 3 },
    { name: 'David Thompson', city: 'Portland, OR', condition: 'Emotional Imbalance', story: 'I was skeptical at first, but the chakra balancing intensive changed my life. I finally found the clarity and emotional stability I had been seeking through years of talk therapy alone.', order: 4 },
    { name: 'Aisha Patel', city: 'Chicago, IL', condition: 'Insomnia', story: 'My daughter was having severe sleep issues and nightmares. After two gentle sessions, she began sleeping through the night peacefully. It\'s been a blessing for our whole family.', order: 5 },
    { name: 'James Wilson', city: 'Denver, CO', condition: 'Lower Back Pain', story: 'The lower back pain that had bothered me for a decade vanished. The healer explained exactly which energy centers were congested and cleared them. I feel 10 years younger.', order: 6 },
  ];
  for (const t of testimonials) {
    await client.create({ _type: 'testimonial', ...t });
    console.log(`  + ${t.name}`);
  }
  console.log();

  // ── Services ───────────────────────────────────────────────────
  console.log('Creating services...');
  const services = [
    { title: 'Individual Pranic Healing', time: '60 min', price: 'Starting at $120', description: 'A comprehensive one-on-one energy session. We will scan your aura and chakras, cleanse congested energy, and revitalize your system to address specific physical or emotional ailments.', iconName: 'Waves', colorTheme: 'blue', order: 1 },
    { title: 'Distance Healing Session', time: '45 min', price: 'Starting at $90', description: 'Receive powerful healing from the comfort of your home. Since the energy body is interconnected with the earth\'s energy field, distance healing is highly effective.', iconName: 'Sun', colorTheme: 'amber', order: 2 },
    { title: 'Aura Scanning & Analysis', time: '30 min', price: 'Starting at $65', description: 'A preventative check-up for your energy body. We will assess your chakras for imbalances before they manifest as physical ailments, providing a detailed energy report.', iconName: 'Sparkles', colorTheme: 'purple', order: 3 },
    { title: 'Chakra Balancing Intensive', time: '90 min', price: 'Starting at $160', description: 'A deep, focused session targeting major energy centers. Ideal for breaking through deep-seated emotional trauma, stress, and long-standing energy blockages.', iconName: 'Moon', colorTheme: 'indigo', order: 4 },
    { title: 'Group Healing Circle', time: '60 min', price: 'Starting at $40', description: 'Experience the amplified power of group energy. A guided meditation followed by collective healing for general stress relief and well-being.', iconName: 'Users', colorTheme: 'emerald', order: 5 },
    { title: 'Monthly Wellness Package', time: '4 Sessions', price: 'Starting at $380', description: 'Commit to your healing journey with weekly sessions. Consistent cleansing and energizing accelerates profound transformation and maintains optimal health.', iconName: 'HeartHandshake', colorTheme: 'rose', order: 6 },
  ];
  for (const s of services) {
    await client.create({ _type: 'service', ...s });
    console.log(`  + ${s.title}`);
  }
  console.log();

  // ── Packages ───────────────────────────────────────────────────
  console.log('Creating packages...');
  const packages = [
    {
      packageId: 'single', name: 'Single Session', tagline: 'Your first step into pranic healing',
      sessions: 1, duration: '60 min', price: 'Pricing coming soon', highlighted: false,
      bestFor: 'First-time clients who want to experience pranic healing before committing to a programme.',
      includes: ['Full 60-minute individual healing session', 'Aura scanning at the start and close', 'Post-session energy maintenance guidance', 'Written session notes emailed to you'],
      order: 1,
    },
    {
      packageId: 'starter', name: 'Starter Pack', tagline: 'Three sessions — begin the shift',
      sessions: 3, duration: '3 × 60 min', price: 'Pricing coming soon', highlighted: true,
      badge: 'Most Popular', badgeColor: 'primary', savingsNote: 'Save vs. individual sessions',
      bestFor: 'Clients dealing with a specific issue — physical pain, stress, grief — who want to see meaningful, lasting results.',
      includes: ['Three individual 60-minute sessions', 'Full aura scan at each visit', 'Personalised chakra balancing plan', 'Post-session guidance after every session', 'Priority scheduling for all three bookings', 'Written progress notes emailed to you'],
      order: 2,
    },
    {
      packageId: 'journey', name: 'Deep Healing Journey', tagline: 'Six sessions — sustained transformation',
      sessions: 6, duration: '6 × 60 min', price: 'Pricing coming soon', highlighted: false,
      badge: 'Best Value', badgeColor: 'amber', savingsNote: 'Greatest saving per session',
      bestFor: 'Clients committed to deep, sustained healing — chronic conditions, long-term stress patterns, or full energetic renewal.',
      includes: ['Six individual 60-minute sessions', 'One 30-minute Aura Scanning & Analysis', 'One 90-minute Chakra Balancing Intensive', 'Personalised healing protocol across all sessions', 'Priority scheduling and early access to new slots', 'Detailed progress report after session 3 and 6', 'Direct WhatsApp support between sessions', 'Meditation and self-care resource library'],
      order: 3,
    },
    {
      packageId: 'transformation', name: 'Complete Transformation', tagline: 'Ten sessions — a full energetic reset',
      sessions: 10, duration: '10 × 60 min', price: 'Pricing coming soon', highlighted: false,
      savingsNote: 'Maximum saving — best per-session rate',
      bestFor: 'Clients seeking a complete energetic overhaul — long-standing physical ailments, deep emotional release, or profound spiritual growth.',
      includes: ['Ten individual 60-minute sessions', 'Two 30-minute Aura Scanning & Analysis sessions', 'Two 90-minute Chakra Balancing Intensives', 'Full intake review and bespoke healing roadmap', 'Highest-priority scheduling — your slots reserved first', 'Detailed progress report after sessions 3, 6, and 10', 'Unlimited WhatsApp support between sessions', 'Personalised meditation audio recording', 'Complimentary 15-min check-in call one month after completion'],
      order: 4,
    },
  ];
  for (const p of packages) {
    await client.create({ _type: 'package', ...p });
    console.log(`  + ${p.name}`);
  }
  console.log();

  // ── Articles ───────────────────────────────────────────────────
  console.log('Creating articles...');
  const articles = [
    {
      slug: 'what-is-prana-life-force-energy',
      title: 'What is Prana? Understanding the Life Force That Sustains Us',
      subtitle: 'An exploration of the invisible energy that animates every living thing — and how learning to work with it can transform your health.',
      category: 'Foundations', readTime: '6 min read', publishedDate: '2025-05-12',
      excerpt: 'Prana is the Sanskrit word for life force — the invisible, vital energy that breathes through every living being.',
      body: toPortableText([
        { type: 'paragraph', content: 'Prana is the Sanskrit word for life force — the invisible, vital energy that breathes through every living being. Ancient healing traditions across cultures have recognized this energy by different names: chi in Chinese medicine, ki in Japanese practice, and mana in Polynesian tradition. What they all describe is the same fundamental truth: life is not merely physical.' },
        { type: 'heading', content: 'Where Does Prana Come From?' },
        { type: 'paragraph', content: 'According to pranic healing teachings, prana is absorbed into the body from three primary sources: the sun, the air, and the ground. Solar prana enters through sunlight and is the most potent form. Air prana is absorbed through breathing — which is why slow, conscious breathwork is so deeply revitalizing. Ground prana enters through the soles of the feet, which is one reason walking barefoot on the earth feels so grounding.' },
        { type: 'quote', content: 'Prana or vital energy is the very substratum of life itself. Without it, the physical body would be inert.' },
        { type: 'heading', content: 'How Prana Flows Through Your Body' },
        { type: 'paragraph', content: 'Prana circulates through a network of subtle energy channels called nadis. When this flow is abundant and unobstructed, you feel energetic, clear-headed, emotionally balanced, and physically well. When the flow is depleted or blocked — due to stress, illness, negative emotions, or environmental factors — you may notice fatigue, mental fog, mood disturbances, or physical discomfort.' },
        { type: 'paragraph', content: 'Energy centers called chakras act as transformers, stepping up or stepping down the frequency of prana as it moves through different levels of the body\'s energy field. There are eleven major chakras in pranic healing, each governing a cluster of organs and emotional states.' },
        { type: 'heading', content: 'Signs That Your Prana Is Low' },
        { type: 'list', items: ['Persistent fatigue even after adequate sleep', 'Difficulty concentrating or mental fog', 'Feeling emotionally flat or unmotivated', 'Recurring minor illnesses or slow recovery', 'A general sense of heaviness or disconnection from life'] },
        { type: 'heading', content: 'Working with Prana' },
        { type: 'paragraph', content: 'The good news is that prana can be intentionally cultivated and directed. Pranic healing practitioners are trained to sense, cleanse, and replenish the energy body, restoring its natural vitality. Even in daily life, simple practices — conscious breathing, spending time in nature, meditation, and maintaining positive emotions — all help sustain a robust pranic field.' },
        { type: 'paragraph', content: 'Understanding prana is the first step toward taking a more active role in your own wellbeing. When you begin to see yourself as an energetic being as much as a physical one, a whole new dimension of health and healing becomes available to you.' },
      ]),
    },
    {
      slug: 'how-pranic-healing-works',
      title: 'How Pranic Healing Works: A Step-by-Step Look at an Energy Session',
      subtitle: 'Curious what actually happens during a pranic healing session? Here is a clear, grounded look at the process from beginning to end.',
      category: 'How It Works', readTime: '8 min read', publishedDate: '2025-04-28',
      excerpt: 'Many people come to pranic healing with a mix of curiosity and healthy skepticism. What does a healer actually do?',
      body: toPortableText([
        { type: 'paragraph', content: 'Many people come to pranic healing with a mix of curiosity and healthy skepticism. What does a healer actually do? How can working with an invisible energy field produce real results? This article walks you through a typical session so you can know exactly what to expect.' },
        { type: 'heading', content: 'The Three Core Steps' },
        { type: 'paragraph', content: 'Every pranic healing session, whether in person or at a distance, follows a three-part protocol refined over decades of practice and research by Grand Master Choa Kok Sui.' },
        { type: 'subheading', content: 'Step 1: Scanning' },
        { type: 'paragraph', content: 'The practitioner begins by gently scanning the client\'s energy body, moving their hands a few inches above the physical body to sense the aura\'s condition. They are looking for areas of congestion (excess, stagnant energy) and depletion (areas where energy is too thin or deficient). This step gives the healer a map of the work that needs to be done.' },
        { type: 'subheading', content: 'Step 2: Cleansing' },
        { type: 'paragraph', content: 'Before fresh, healthy energy can flow in, diseased or congested energy must be removed. This is perhaps the most important step and one that makes pranic healing distinct from practices that only add energy. Using specific hand movements and mental intention, the practitioner systematically sweeps away energetic contaminants from the affected areas and chakras.' },
        { type: 'subheading', content: 'Step 3: Energizing' },
        { type: 'paragraph', content: 'With the space cleared, the healer projects fresh prana into the depleted areas. Different colors of prana are used for different purposes — white prana for general revitalization, electric violet for strong cleansing, orange-red for activating, and light blue for soothing and cooling.' },
        { type: 'quote', content: 'Healing is not something done to you. It is something that happens through you, when energy is given space to move freely.' },
        { type: 'heading', content: 'What the Client Experiences' },
        { type: 'paragraph', content: 'Most clients sit or lie comfortably in their clothes throughout the session. Common sensations include gentle warmth, a tingling feeling, a sense of deep relaxation, and sometimes an emotional release such as tears or a feeling of lightness. Some clients feel nothing during the session but notice significant changes in the hours or days that follow.' },
        { type: 'heading', content: 'How Many Sessions Are Needed?' },
        { type: 'paragraph', content: 'This depends on the nature of the condition, its duration, and the client\'s own vitality. Acute issues — a recent injury, a sudden onset of anxiety, a fresh emotional upset — often respond quickly, sometimes within one to three sessions. Chronic or complex issues may require a series of regular sessions over weeks or months, ideally combined with complementary medical care and lifestyle support.' },
      ]),
    },
    {
      slug: 'chakras-and-healing',
      title: 'The Eleven Major Chakras: Your Body\'s Energy Command Centers',
      subtitle: 'Pranic healing works with eleven major chakras, each governing specific organs, emotions, and aspects of wellbeing.',
      category: 'Energy Anatomy', readTime: '9 min read', publishedDate: '2025-04-10',
      excerpt: 'Most people have heard of the seven chakras from yoga traditions. Pranic healing works with eleven major chakras, offering a more detailed map.',
      body: toPortableText([
        { type: 'paragraph', content: 'Most people have heard of the seven chakras from yoga traditions. Pranic healing works with eleven major chakras, offering a more detailed map of the body\'s energy anatomy. Understanding these centers can help you recognize patterns in your own health and emotional life.' },
        { type: 'heading', content: 'The Eleven Major Chakras' },
        { type: 'list', items: ['Crown Chakra — Spiritual connection, higher consciousness, divine will', 'Forehead Chakra — Higher intuition, clairvoyance, memory', 'Ajna (Brow) Chakra — Willpower, concentration, higher intelligence', 'Throat Chakra — Communication, creativity, higher concreteness', 'Heart Chakra — Higher emotions, compassion, love, joy', 'Solar Plexus Chakra — Emotions, vitality, digestive organs', 'Spleen Chakra — Energy assimilation, blood vitality, immune defense', 'Navel Chakra — Lower emotions, kundalini energy, vitality', 'Sex Chakra — Sexual energy, creative vitality, lower concreteness', 'Basic (Root) Chakra — Grounding, survival instinct, physical vitality', 'Meng Mein Chakra — Kidney function, blood pressure, vitality distribution'] },
        { type: 'heading', content: 'What Happens When a Chakra Is Imbalanced?' },
        { type: 'paragraph', content: 'Each chakra can be in one of three states: balanced, congested (over-activated with stagnant energy), or depleted (under-active with insufficient energy). Both extremes produce symptoms. A congested solar plexus chakra, for instance, may manifest as irritability, anxiety, or digestive problems. A depleted solar plexus may show up as low energy, poor self-esteem, or emotional flatness.' },
        { type: 'quote', content: 'The chakras are not merely spiritual metaphors. They are functional energy centers that have measurable effects on the organs and systems they govern.' },
        { type: 'heading', content: 'The Heart Chakra and Emotional Health' },
        { type: 'paragraph', content: 'In pranic healing, the heart chakra is given particular attention because it governs the emotional body. Grief, heartbreak, prolonged stress, and unexpressed emotions all create congestion here. When the heart chakra is cleansed and energized, clients often report a profound sense of emotional relief — as if a weight they had been carrying for years has finally been set down.' },
        { type: 'heading', content: 'Daily Practices for Chakra Health' },
        { type: 'list', items: ['Spend time in morning sunlight to naturally energize the entire field', 'Practice rhythmic breathing (inhale 6 counts, hold 1, exhale 6) to activate the spleen chakra', 'Use loving-kindness meditation to keep the heart chakra expansive', 'Spend time in nature and walk barefoot when possible to ground the basic chakra', 'Minimize prolonged exposure to negativity, conflict, and excessive screen time'] },
        { type: 'paragraph', content: 'Working with a trained pranic healer provides the most direct way to restore chakra balance, but these daily practices create the energetic conditions in which healing can take hold and last.' },
      ]),
    },
    {
      slug: 'pranic-healing-for-stress-and-anxiety',
      title: 'Pranic Healing for Stress and Anxiety: What the Research Tells Us',
      subtitle: 'Stress and anxiety are among the most common reasons people seek pranic healing. Here is what we know about why it works so well.',
      category: 'Conditions', readTime: '7 min read', publishedDate: '2025-03-22',
      excerpt: 'We are living through an epidemic of anxiety. Pranic healing offers a complementary approach that addresses anxiety at its energetic root.',
      body: toPortableText([
        { type: 'paragraph', content: 'We are living through an epidemic of anxiety. Globally, hundreds of millions of people struggle with chronic stress and anxiety disorders, and the tools of conventional medicine — though often helpful — leave many people still searching for relief. Pranic healing offers a complementary approach that addresses anxiety at its energetic root.' },
        { type: 'heading', content: 'The Energetic Signature of Anxiety' },
        { type: 'paragraph', content: 'Pranic healers who have worked with anxious clients consistently observe the same pattern: severe congestion in the solar plexus chakra, combined with depletion in the crown and heart chakras. The solar plexus governs the emotional body and, when overloaded with unprocessed fear or worry, creates the physical and mental symptoms we call anxiety — racing thoughts, a tight chest, digestive distress, inability to relax.' },
        { type: 'heading', content: 'What a Healing Session Addresses' },
        { type: 'list', items: ['Deep cleansing of the solar plexus chakra to remove accumulated emotional congestion', 'Stabilizing and energizing the ajna to restore calm, focused clarity', 'Energizing the heart chakra with soothing, cool blue prana to promote inner peace', 'Revitalizing the crown to reconnect the client with a sense of wellbeing', 'Grounding through the basic chakra to bring the client back to the present moment'] },
        { type: 'quote', content: 'After my first session I slept more deeply than I had in three years. I woke up and the constant hum of worry was simply quieter.' },
        { type: 'heading', content: 'What Clients Typically Report' },
        { type: 'paragraph', content: 'Many clients notice a significant reduction in baseline anxiety after two to four sessions. The racing-thought quality of anxiety often softens first, followed by improved sleep, a greater sense of groundedness, and eventually a shift in the emotional reactivity that was fueling the anxiety cycle.' },
        { type: 'heading', content: 'A Simple Self-Care Practice for Anxious Days' },
        { type: 'paragraph', content: 'Place both hands over your solar plexus (the area just below the sternum). Breathe slowly and imagine that with each exhale you are releasing dense, heavy energy from this center. With each inhale, draw in calm golden light. Even five minutes of this practice can meaningfully shift an anxious state.' },
      ]),
    },
    {
      slug: 'distance-healing-explained',
      title: 'Distance Healing: How Can Healing Work Across Space and Time?',
      subtitle: 'Remote pranic healing is one of the most surprising aspects of the practice. This article explains the energetic principles that make it possible.',
      category: 'How It Works', readTime: '6 min read', publishedDate: '2025-03-05',
      excerpt: 'Of all the aspects of pranic healing, distance or remote healing is the one that most challenges conventional assumptions about how the world works.',
      body: toPortableText([
        { type: 'paragraph', content: 'Of all the aspects of pranic healing, distance or remote healing is the one that most challenges conventional assumptions about how the world works. How can a healer help someone they cannot see or touch, sometimes from thousands of miles away? The answer lies in understanding the true nature of the energy body.' },
        { type: 'heading', content: 'Energy Is Not Limited by Physical Space' },
        { type: 'paragraph', content: 'The physical body has edges. The energy body does not — at least not in the same rigid way. The aura extends around and beyond the physical form, and the subtle energy that animates us is not confined by the laws that govern matter. This is why prayer, intention, and love can be felt across vast distances. Distance healing works within this same framework: consciousness and energy can meet, regardless of where physical bodies happen to be located.' },
        { type: 'heading', content: 'How a Distance Session Works' },
        { type: 'paragraph', content: 'Before a distance session, the client agrees to a scheduled time and finds a quiet, comfortable place to rest. The healer, working from their own space, uses a surrogate — often a photograph or a mental representation of the client — to locate and interact with the client\'s energy body. The same three-step protocol of scanning, cleansing, and energizing is applied.' },
        { type: 'quote', content: 'I was skeptical about the distance session. But I felt warmth moving across my back during the exact window he was working. I couldn\'t explain it, but I couldn\'t deny it either.' },
        { type: 'heading', content: 'What to Do During Your Distance Session' },
        { type: 'list', items: ['Find a quiet room and lie down or sit comfortably', 'Set an intention for what you would like support with', 'Breathe slowly and allow yourself to rest — no effort is required from you', 'Keep a glass of water nearby to drink after the session', 'After the session, spend a few minutes grounded before returning to your day'] },
        { type: 'heading', content: 'Is Distance Healing as Effective as In-Person?' },
        { type: 'paragraph', content: 'Many experienced practitioners and their clients report that well-conducted distance sessions can be equally effective as in-person work. For clients who are bedridden, living in a remote area, or dealing with conditions that make travel difficult, distance healing makes this modality accessible in ways that in-person sessions cannot always be.' },
      ]),
    },
    {
      slug: 'pranic-healing-for-children',
      title: 'Pranic Healing for Children: Gentle Support for Little Energy Bodies',
      subtitle: 'Children respond to energy healing with remarkable speed. Here is what parents need to know.',
      category: 'Special Topics', readTime: '5 min read', publishedDate: '2025-02-18',
      excerpt: 'Children are energetically sensitive and highly receptive. Their energy bodies are bright and responsive, which means they tend to benefit from pranic healing quickly.',
      body: toPortableText([
        { type: 'paragraph', content: 'Children are energetically sensitive and highly receptive. Their energy bodies are bright and responsive, which means they tend to benefit from pranic healing quickly and noticeably. Many parents who have experienced healing themselves begin wondering how this gentle modality might support their children\'s health and emotional wellbeing.' },
        { type: 'heading', content: 'Why Children Respond So Well' },
        { type: 'paragraph', content: 'Children have not yet developed the energetic armoring that adults build up over years of stress, suppressed emotion, and accumulated trauma. Their fields are generally more fluid and less congested, which means that when you introduce fresh, clean prana, the body accepts and integrates it quickly.' },
        { type: 'heading', content: 'What Conditions Can Be Supported?' },
        { type: 'list', items: ['Childhood anxiety and worry, including school-related stress', 'Behavioral difficulties and emotional regulation challenges', 'Frequent minor illnesses such as colds and ear infections', 'Sleep disturbances and nightmares', 'Attention and focus challenges', 'Physical complaints such as growing pains and headaches', 'Grief, loss, or transition (new sibling, moving, parental divorce)'] },
        { type: 'quote', content: 'My eight-year-old had night terrors almost every night for two years. After three sessions, they stopped. I still don\'t fully understand why, but I am deeply grateful.' },
        { type: 'heading', content: 'A Note on Parental Presence' },
        { type: 'paragraph', content: 'For children under twelve, a parent or guardian is always present during the session. This not only ensures the child\'s comfort and safety but often allows the parent to observe the session and learn simple supportive practices they can use at home between sessions.' },
        { type: 'paragraph', content: 'If your child is receiving medical treatment for any condition, pranic healing is always offered as a complement to that care, never a replacement for it. Always keep your child\'s medical team informed of any complementary approaches you are exploring.' },
      ]),
    },
    {
      slug: 'building-your-daily-energy-practice',
      title: 'Building a Daily Energy Practice: Simple Habits That Keep Your Prana Flowing',
      subtitle: 'You don\'t need to be a healer to tend your own energy. Here are seven accessible practices that keep the pranic body vibrant.',
      category: 'Self-Care', readTime: '7 min read', publishedDate: '2025-02-02',
      excerpt: 'Pranic healing sessions provide powerful restoration, but what happens in between sessions matters enormously.',
      body: toPortableText([
        { type: 'paragraph', content: 'Pranic healing sessions provide powerful restoration, but what happens in between sessions matters enormously. Just as a car needs regular fuel, your energy body needs consistent daily care. The good news is that effective energy hygiene does not require special training — just intention and a few simple habits.' },
        { type: 'heading', content: '1. Rhythmic Breathing Upon Waking' },
        { type: 'paragraph', content: 'Begin each morning with five minutes of slow, rhythmic breathing before you reach for your phone. A simple ratio of inhale four counts, hold one, exhale four, hold one — activates the spleen chakra and draws fresh solar prana into your field. Morning sunlight on the skin enhances this effect significantly.' },
        { type: 'heading', content: '2. The Salt Shower Protocol' },
        { type: 'paragraph', content: 'Salt is a powerful natural cleanser of energetic contaminants. Adding a cup of sea salt or Himalayan salt to your bath, or keeping a small bowl of salt water in your shower area to rinse your hands and forearms, helps clear the low-grade energetic debris that accumulates through a normal day of interaction and stress.' },
        { type: 'heading', content: '3. Mindful Sun Exposure' },
        { type: 'paragraph', content: 'Spend at least 10 to 15 minutes in morning sunlight when possible. Sunlight is the richest source of solar prana, and this simple daily practice noticeably elevates energy levels and mood. Stand barefoot on grass or soil at the same time and you are drawing ground prana as well — a double dose of natural revitalization.' },
        { type: 'heading', content: '4. Pranic Breathing Before Meals' },
        { type: 'paragraph', content: 'Take three to five slow, deep breaths before eating. This activates the spleen chakra, which governs the assimilation of prana from food and air. It also shifts the nervous system from sympathetic (stressed) to parasympathetic (restful), improving digestion and the absorption of nutrients.' },
        { type: 'heading', content: '5. Evening Energy Hygiene' },
        { type: 'paragraph', content: 'Before sleep, spend a few minutes consciously releasing the energy of the day. A simple practice: sit quietly, breathe slowly, and imagine that you are gently shaking off the energetic impressions you have gathered from other people and environments throughout the day. Follow with a shower or foot soak in salt water if you have had a particularly draining day.' },
        { type: 'heading', content: '6. Blessing Your Food and Water' },
        { type: 'paragraph', content: 'This is one of the simplest and most underestimated practices. Before eating or drinking, place your hands over your food or water, take a breath, and mentally project loving, healing energy into it. Intention is real, and this small act can meaningfully raise the pranic quality of what you consume.' },
        { type: 'heading', content: '7. Gratitude as Energy Practice' },
        { type: 'paragraph', content: 'Gratitude generates heart chakra energy. Ending each day by naming three things you are genuinely grateful for — however small — keeps the heart chakra expanded and the overall energy field elevated. It is, essentially, a form of self-healing through cultivated positive emotion.' },
      ]),
    },
  ];

  for (const a of articles) {
    await client.create({ _type: 'article', ...a });
    console.log(`  + ${a.title.slice(0, 50)}...`);
  }
  console.log();

  console.log('All content seeded successfully!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
