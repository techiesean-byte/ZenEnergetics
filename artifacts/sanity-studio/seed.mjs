import https from 'https';

const TOKEN = process.env.SANITY_TOKEN;
const PROJECT_ID = '9op646qf';
const DATASET = 'production';

if (!TOKEN) { console.error('Set SANITY_TOKEN'); process.exit(1); }

const uid = () => Math.random().toString(36).slice(2, 10);

function ptBlock(style, text) {
  return { _type: 'block', _key: uid(), style, children: [{ _type: 'span', _key: uid(), text, marks: [] }], markDefs: [] };
}
function ptBullet(text) {
  return { _type: 'block', _key: uid(), style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: uid(), text, marks: [] }], markDefs: [] };
}
function toPortableText(sections) {
  const blocks = [];
  for (const s of sections) {
    if (s.type === 'paragraph')  blocks.push(ptBlock('normal', s.content));
    if (s.type === 'heading')    blocks.push(ptBlock('h2', s.content));
    if (s.type === 'subheading') blocks.push(ptBlock('h3', s.content));
    if (s.type === 'quote')      blocks.push(ptBlock('blockquote', s.content));
    if (s.type === 'list')       s.items.forEach(i => blocks.push(ptBullet(i)));
  }
  return blocks;
}

function mutate(mutations) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ mutations });
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path: `/v2024-01-01/data/mutate/${DATASET}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (res.statusCode >= 400) reject(new Error(`${res.statusCode}: ${JSON.stringify(parsed)}`));
        else resolve(parsed);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const create = doc => mutate([{ create: doc }]);
const createOrReplace = doc => mutate([{ createOrReplace: doc }]);

async function seed() {
  console.log('Seeding Sanity content...\n');

  console.log('Site settings...');
  await createOrReplace({
    _id: 'siteSettings', _type: 'siteSettings',
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
  console.log('  done.\n');

  console.log('Testimonials...');
  for (const t of [
    { name: 'Sarah Jenkins', city: 'Seattle, WA', condition: 'Chronic Migraines', story: 'I had been suffering from chronic migraines for years. After just three sessions, the intensity and frequency reduced dramatically. The gentle approach made me feel so safe and cared for.', order: 1 },
    { name: 'Michael Chen', city: 'San Francisco, CA', condition: 'Anxiety & Grief', story: 'The distance healing sessions were a revelation. I was going through a period of intense grief and anxiety, and I could literally feel the heavy weight lifting off my chest during our sessions.', order: 2 },
    { name: 'Elena Rodriguez', city: 'Austin, TX', condition: 'Post-Surgery Recovery', story: 'I sought pranic healing to help with my recovery post-surgery. My doctor was amazed at how quickly my incision healed and how high my energy levels were compared to normal recovery times.', order: 3 },
    { name: 'David Thompson', city: 'Portland, OR', condition: 'Emotional Imbalance', story: 'I was skeptical at first, but the chakra balancing intensive changed my life. I finally found the clarity and emotional stability I had been seeking through years of talk therapy alone.', order: 4 },
    { name: 'Aisha Patel', city: 'Chicago, IL', condition: 'Insomnia', story: "My daughter was having severe sleep issues and nightmares. After two gentle sessions, she began sleeping through the night peacefully. It's been a blessing for our whole family.", order: 5 },
    { name: 'James Wilson', city: 'Denver, CO', condition: 'Lower Back Pain', story: 'The lower back pain that had bothered me for a decade vanished. The healer explained exactly which energy centers were congested and cleared them. I feel 10 years younger.', order: 6 },
  ]) {
    await create({ _type: 'testimonial', ...t });
    console.log(`  + ${t.name}`);
  }
  console.log();

  console.log('Services...');
  for (const s of [
    { title: 'Individual Pranic Healing', time: '60 min', price: 'Starting at $120', description: 'A comprehensive one-on-one energy session. We will scan your aura and chakras, cleanse congested energy, and revitalize your system to address specific physical or emotional ailments.', iconName: 'Waves', colorTheme: 'blue', order: 1 },
    { title: 'Distance Healing Session', time: '45 min', price: 'Starting at $90', description: "Receive powerful healing from the comfort of your home. Since the energy body is interconnected with the earth's energy field, distance healing is highly effective.", iconName: 'Sun', colorTheme: 'amber', order: 2 },
    { title: 'Aura Scanning & Analysis', time: '30 min', price: 'Starting at $65', description: 'A preventative check-up for your energy body. We will assess your chakras for imbalances before they manifest as physical ailments, providing a detailed energy report.', iconName: 'Sparkles', colorTheme: 'purple', order: 3 },
    { title: 'Chakra Balancing Intensive', time: '90 min', price: 'Starting at $160', description: 'A deep, focused session targeting major energy centers. Ideal for breaking through deep-seated emotional trauma, stress, and long-standing energy blockages.', iconName: 'Moon', colorTheme: 'indigo', order: 4 },
    { title: 'Group Healing Circle', time: '60 min', price: 'Starting at $40', description: 'Experience the amplified power of group energy. A guided meditation followed by collective healing for general stress relief and well-being.', iconName: 'Users', colorTheme: 'emerald', order: 5 },
    { title: 'Monthly Wellness Package', time: '4 Sessions', price: 'Starting at $380', description: 'Commit to your healing journey with weekly sessions. Consistent cleansing and energizing accelerates profound transformation and maintains optimal health.', iconName: 'HeartHandshake', colorTheme: 'rose', order: 6 },
  ]) {
    await create({ _type: 'service', ...s });
    console.log(`  + ${s.title}`);
  }
  console.log();

  console.log('Packages...');
  for (const p of [
    { packageId: 'single', name: 'Single Session', tagline: 'Your first step into pranic healing', sessions: 1, duration: '60 min', price: 'Pricing coming soon', highlighted: false, bestFor: 'First-time clients who want to experience pranic healing before committing to a programme.', includes: ['Full 60-minute individual healing session', 'Aura scanning at the start and close', 'Post-session energy maintenance guidance', 'Written session notes emailed to you'], order: 1 },
    { packageId: 'starter', name: 'Starter Pack', tagline: 'Three sessions — begin the shift', sessions: 3, duration: '3 × 60 min', price: 'Pricing coming soon', highlighted: true, badge: 'Most Popular', badgeColor: 'primary', savingsNote: 'Save vs. individual sessions', bestFor: 'Clients dealing with a specific issue — physical pain, stress, grief — who want to see meaningful, lasting results.', includes: ['Three individual 60-minute sessions', 'Full aura scan at each visit', 'Personalised chakra balancing plan', 'Post-session guidance after every session', 'Priority scheduling for all three bookings', 'Written progress notes emailed to you'], order: 2 },
    { packageId: 'journey', name: 'Deep Healing Journey', tagline: 'Six sessions — sustained transformation', sessions: 6, duration: '6 × 60 min', price: 'Pricing coming soon', highlighted: false, badge: 'Best Value', badgeColor: 'amber', savingsNote: 'Greatest saving per session', bestFor: 'Clients committed to deep, sustained healing — chronic conditions, long-term stress patterns, or full energetic renewal.', includes: ['Six individual 60-minute sessions', 'One 30-minute Aura Scanning & Analysis', 'One 90-minute Chakra Balancing Intensive', 'Personalised healing protocol across all sessions', 'Priority scheduling and early access to new slots', 'Detailed progress report after session 3 and 6', 'Direct WhatsApp support between sessions', 'Meditation and self-care resource library'], order: 3 },
    { packageId: 'transformation', name: 'Complete Transformation', tagline: 'Ten sessions — a full energetic reset', sessions: 10, duration: '10 × 60 min', price: 'Pricing coming soon', highlighted: false, savingsNote: 'Maximum saving — best per-session rate', bestFor: 'Clients seeking a complete energetic overhaul — long-standing physical ailments, deep emotional release, or profound spiritual growth.', includes: ['Ten individual 60-minute sessions', 'Two 30-minute Aura Scanning & Analysis sessions', 'Two 90-minute Chakra Balancing Intensives', 'Full intake review and bespoke healing roadmap', 'Highest-priority scheduling — your slots reserved first', 'Detailed progress report after sessions 3, 6, and 10', 'Unlimited WhatsApp support between sessions', 'Personalised meditation audio recording', 'Complimentary 15-min check-in call one month after completion'], order: 4 },
  ]) {
    await create({ _type: 'package', ...p });
    console.log(`  + ${p.name}`);
  }
  console.log();

  console.log('Articles...');
  const articles = [
    { slug: 'what-is-prana-life-force-energy', title: 'What is Prana? Understanding the Life Force That Sustains Us', subtitle: 'An exploration of the invisible energy that animates every living thing — and how learning to work with it can transform your health.', category: 'Foundations', readTime: '6 min read', publishedDate: '2025-05-12', excerpt: 'Prana is the Sanskrit word for life force — the invisible, vital energy that breathes through every living being.', body: toPortableText([
      { type: 'paragraph', content: 'Prana is the Sanskrit word for life force — the invisible, vital energy that breathes through every living being. Ancient healing traditions across cultures have recognized this energy by different names: chi in Chinese medicine, ki in Japanese practice, and mana in Polynesian tradition.' },
      { type: 'heading', content: 'Where Does Prana Come From?' },
      { type: 'paragraph', content: 'According to pranic healing teachings, prana is absorbed into the body from three primary sources: the sun, the air, and the ground. Solar prana enters through sunlight and is the most potent form. Air prana is absorbed through breathing. Ground prana enters through the soles of the feet.' },
      { type: 'quote', content: 'Prana or vital energy is the very substratum of life itself. Without it, the physical body would be inert.' },
      { type: 'heading', content: 'How Prana Flows Through Your Body' },
      { type: 'paragraph', content: 'Prana circulates through a network of subtle energy channels called nadis. When this flow is abundant and unobstructed, you feel energetic, clear-headed, emotionally balanced, and physically well.' },
      { type: 'heading', content: 'Signs That Your Prana Is Low' },
      { type: 'list', items: ['Persistent fatigue even after adequate sleep', 'Difficulty concentrating or mental fog', 'Feeling emotionally flat or unmotivated', 'Recurring minor illnesses or slow recovery', 'A general sense of heaviness or disconnection from life'] },
      { type: 'heading', content: 'Working with Prana' },
      { type: 'paragraph', content: 'Pranic healing practitioners are trained to sense, cleanse, and replenish the energy body, restoring its natural vitality. Understanding prana is the first step toward taking a more active role in your own wellbeing.' },
    ]) },
    { slug: 'how-pranic-healing-works', title: 'How Pranic Healing Works: A Step-by-Step Look at an Energy Session', subtitle: 'Curious what actually happens during a pranic healing session? Here is a clear, grounded look at the process from beginning to end.', category: 'How It Works', readTime: '8 min read', publishedDate: '2025-04-28', excerpt: 'Many people come to pranic healing with a mix of curiosity and healthy skepticism.', body: toPortableText([
      { type: 'paragraph', content: 'Many people come to pranic healing with a mix of curiosity and healthy skepticism. What does a healer actually do? How can working with an invisible energy field produce real results? This article walks you through a typical session so you can know exactly what to expect.' },
      { type: 'heading', content: 'The Three Core Steps' },
      { type: 'subheading', content: 'Step 1: Scanning' },
      { type: 'paragraph', content: "The practitioner begins by gently scanning the client's energy body, moving their hands a few inches above the physical body to sense the aura's condition. They are looking for areas of congestion and depletion." },
      { type: 'subheading', content: 'Step 2: Cleansing' },
      { type: 'paragraph', content: 'Before fresh, healthy energy can flow in, diseased or congested energy must be removed. Using specific hand movements and mental intention, the practitioner systematically sweeps away energetic contaminants.' },
      { type: 'subheading', content: 'Step 3: Energizing' },
      { type: 'paragraph', content: 'With the space cleared, the healer projects fresh prana into the depleted areas. Different colors of prana are used for different purposes.' },
      { type: 'quote', content: 'Healing is not something done to you. It is something that happens through you, when energy is given space to move freely.' },
      { type: 'heading', content: 'What the Client Experiences' },
      { type: 'paragraph', content: 'Most clients sit or lie comfortably in their clothes throughout the session. Common sensations include gentle warmth, a tingling feeling, a sense of deep relaxation, and sometimes an emotional release.' },
      { type: 'heading', content: 'How Many Sessions Are Needed?' },
      { type: 'paragraph', content: "Acute issues often respond quickly, sometimes within one to three sessions. Chronic or complex issues may require a series of regular sessions over weeks or months, ideally combined with complementary medical care." },
    ]) },
    { slug: 'chakras-and-healing', title: "The Eleven Major Chakras: Your Body's Energy Command Centers", subtitle: 'Pranic healing works with eleven major chakras, each governing specific organs, emotions, and aspects of wellbeing.', category: 'Energy Anatomy', readTime: '9 min read', publishedDate: '2025-04-10', excerpt: 'Most people have heard of the seven chakras from yoga traditions. Pranic healing works with eleven major chakras.', body: toPortableText([
      { type: 'paragraph', content: "Most people have heard of the seven chakras from yoga traditions. Pranic healing works with eleven major chakras, offering a more detailed map of the body's energy anatomy." },
      { type: 'heading', content: 'The Eleven Major Chakras' },
      { type: 'list', items: ['Crown Chakra — Spiritual connection, higher consciousness, divine will', 'Forehead Chakra — Higher intuition, clairvoyance, memory', 'Ajna (Brow) Chakra — Willpower, concentration, higher intelligence', 'Throat Chakra — Communication, creativity, higher concreteness', 'Heart Chakra — Higher emotions, compassion, love, joy', 'Solar Plexus Chakra — Emotions, vitality, digestive organs', 'Spleen Chakra — Energy assimilation, blood vitality, immune defense', 'Navel Chakra — Lower emotions, kundalini energy, vitality', 'Sex Chakra — Sexual energy, creative vitality, lower concreteness', 'Basic (Root) Chakra — Grounding, survival instinct, physical vitality', 'Meng Mein Chakra — Kidney function, blood pressure, vitality distribution'] },
      { type: 'heading', content: 'What Happens When a Chakra Is Imbalanced?' },
      { type: 'paragraph', content: 'Each chakra can be in one of three states: balanced, congested, or depleted. Both extremes produce symptoms. A congested solar plexus chakra may manifest as irritability, anxiety, or digestive problems.' },
      { type: 'quote', content: 'The chakras are not merely spiritual metaphors. They are functional energy centers that have measurable effects on the organs and systems they govern.' },
      { type: 'heading', content: 'Daily Practices for Chakra Health' },
      { type: 'list', items: ['Spend time in morning sunlight to naturally energize the entire field', 'Practice rhythmic breathing to activate the spleen chakra', 'Use loving-kindness meditation to keep the heart chakra expansive', 'Spend time in nature and walk barefoot when possible', 'Minimize prolonged exposure to negativity and excessive screen time'] },
    ]) },
    { slug: 'pranic-healing-for-stress-and-anxiety', title: 'Pranic Healing for Stress and Anxiety: What the Research Tells Us', subtitle: 'Stress and anxiety are among the most common reasons people seek pranic healing.', category: 'Conditions', readTime: '7 min read', publishedDate: '2025-03-22', excerpt: 'Pranic healing offers a complementary approach that addresses anxiety at its energetic root.', body: toPortableText([
      { type: 'paragraph', content: 'We are living through an epidemic of anxiety. Pranic healing offers a complementary approach that addresses anxiety at its energetic root.' },
      { type: 'heading', content: 'The Energetic Signature of Anxiety' },
      { type: 'paragraph', content: 'Pranic healers consistently observe: severe congestion in the solar plexus chakra, combined with depletion in the crown and heart chakras. This creates the physical and mental symptoms we call anxiety — racing thoughts, a tight chest, digestive distress, inability to relax.' },
      { type: 'heading', content: 'What a Healing Session Addresses' },
      { type: 'list', items: ['Deep cleansing of the solar plexus chakra', 'Stabilizing and energizing the ajna to restore calm clarity', 'Energizing the heart chakra with soothing blue prana', 'Revitalizing the crown to reconnect with wellbeing', 'Grounding through the basic chakra'] },
      { type: 'quote', content: 'After my first session I slept more deeply than I had in three years. The constant hum of worry was simply quieter.' },
      { type: 'paragraph', content: 'Many clients notice a significant reduction in baseline anxiety after two to four sessions. Pranic healing works beautifully alongside therapy, medication management, and lifestyle practices.' },
    ]) },
    { slug: 'distance-healing-explained', title: 'Distance Healing: How Can Healing Work Across Space and Time?', subtitle: 'Remote pranic healing is one of the most surprising aspects of the practice.', category: 'How It Works', readTime: '6 min read', publishedDate: '2025-03-05', excerpt: 'How can a healer help someone they cannot see or touch, sometimes from thousands of miles away?', body: toPortableText([
      { type: 'paragraph', content: 'Of all the aspects of pranic healing, distance or remote healing is the one that most challenges conventional assumptions about how the world works. The answer lies in understanding the true nature of the energy body.' },
      { type: 'heading', content: 'Energy Is Not Limited by Physical Space' },
      { type: 'paragraph', content: 'The energy body does not have the same rigid edges as the physical body. Consciousness and energy can meet, regardless of where physical bodies happen to be located.' },
      { type: 'heading', content: 'How a Distance Session Works' },
      { type: 'paragraph', content: "The healer uses a photograph or mental representation of the client to locate and interact with the client's energy body. The same three-step protocol of scanning, cleansing, and energizing is applied." },
      { type: 'quote', content: "I was skeptical about the distance session. But I felt warmth moving across my back during the exact window he was working. I couldn't explain it, but I couldn't deny it either." },
      { type: 'heading', content: 'What to Do During Your Distance Session' },
      { type: 'list', items: ['Find a quiet room and lie down or sit comfortably', 'Set an intention for what you would like support with', 'Breathe slowly and allow yourself to rest — no effort is required', 'Keep a glass of water nearby to drink after the session', 'Spend a few minutes grounded before returning to your day'] },
    ]) },
    { slug: 'pranic-healing-for-children', title: 'Pranic Healing for Children: Gentle Support for Little Energy Bodies', subtitle: 'Children respond to energy healing with remarkable speed.', category: 'Special Topics', readTime: '5 min read', publishedDate: '2025-02-18', excerpt: 'Children are energetically sensitive and highly receptive, benefiting from pranic healing quickly and noticeably.', body: toPortableText([
      { type: 'paragraph', content: "Children are energetically sensitive and highly receptive. Their energy bodies are bright and responsive, which means they tend to benefit from pranic healing quickly and noticeably." },
      { type: 'heading', content: 'Why Children Respond So Well' },
      { type: 'paragraph', content: "Children have not yet developed the energetic armoring that adults build up over years of stress and accumulated trauma. Their fields are generally more fluid and less congested." },
      { type: 'heading', content: 'What Conditions Can Be Supported?' },
      { type: 'list', items: ['Childhood anxiety and worry, including school-related stress', 'Behavioral difficulties and emotional regulation challenges', 'Frequent minor illnesses such as colds and ear infections', 'Sleep disturbances and nightmares', 'Attention and focus challenges', 'Physical complaints such as growing pains and headaches', 'Grief, loss, or transition (new sibling, moving, parental divorce)'] },
      { type: 'quote', content: "My eight-year-old had night terrors almost every night for two years. After three sessions, they stopped. I'm deeply grateful." },
      { type: 'paragraph', content: 'Pranic healing is always offered as a complement to medical care, never a replacement for it.' },
    ]) },
    { slug: 'building-your-daily-energy-practice', title: 'Building a Daily Energy Practice: Simple Habits That Keep Your Prana Flowing', subtitle: "You don't need to be a healer to tend your own energy.", category: 'Self-Care', readTime: '7 min read', publishedDate: '2025-02-02', excerpt: 'Pranic healing sessions provide powerful restoration, but what happens in between sessions matters enormously.', body: toPortableText([
      { type: 'paragraph', content: 'Pranic healing sessions provide powerful restoration, but what happens in between sessions matters enormously. The good news is that effective energy hygiene does not require special training — just intention and a few simple habits.' },
      { type: 'heading', content: '1. Rhythmic Breathing Upon Waking' },
      { type: 'paragraph', content: 'Begin each morning with five minutes of slow, rhythmic breathing. A simple ratio — inhale four counts, hold one, exhale four — activates the spleen chakra and draws fresh solar prana into your field.' },
      { type: 'heading', content: '2. The Salt Shower Protocol' },
      { type: 'paragraph', content: 'Salt is a powerful natural cleanser of energetic contaminants. Adding sea salt to your bath or rinsing your hands and forearms in a salt water solution helps clear the low-grade energetic debris that accumulates through a normal day.' },
      { type: 'heading', content: '3. Mindful Sun Exposure' },
      { type: 'paragraph', content: 'Spend at least 10 to 15 minutes in morning sunlight when possible. Sunlight is the richest source of solar prana and noticeably elevates energy levels and mood.' },
      { type: 'heading', content: '4. Evening Energy Hygiene' },
      { type: 'paragraph', content: 'Before sleep, spend a few minutes consciously releasing the energy of the day. Imagine gently shaking off the energetic impressions gathered from other people and environments.' },
      { type: 'heading', content: '5. Gratitude as Energy Practice' },
      { type: 'paragraph', content: 'Gratitude generates heart chakra energy. Ending each day by naming three things you are genuinely grateful for keeps the heart chakra expanded and the overall energy field elevated.' },
    ]) },
  ];

  for (const a of articles) {
    await create({ _type: 'article', ...a });
    console.log(`  + ${a.title.slice(0, 55)}...`);
  }

  console.log('\nAll content seeded successfully!');
}

seed().catch(err => { console.error('Failed:', err.message); process.exit(1); });
