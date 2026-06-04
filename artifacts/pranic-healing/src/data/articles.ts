export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedDate: string;
  heroImage: string;
  excerpt: string;
  body: Section[];
}

export interface Section {
  type: "paragraph" | "heading" | "subheading" | "quote" | "list";
  content?: string;
  items?: string[];
}

export const articles: Article[] = [
  {
    slug: "what-is-prana-life-force-energy",
    title: "What is Prana? Understanding the Life Force That Sustains Us",
    subtitle: "An exploration of the invisible energy that animates every living thing — and how learning to work with it can transform your health.",
    category: "Foundations",
    readTime: "6 min read",
    publishedDate: "May 12, 2025",
    heroImage: "../assets/hero.png",
    excerpt: "Prana is the Sanskrit word for life force — the invisible, vital energy that breathes through every living being. Ancient healing traditions across cultures have recognized this energy by different names: chi in Chinese medicine, ki in Japanese practice, and mana in Polynesian tradition.",
    body: [
      { type: "paragraph", content: "Prana is the Sanskrit word for life force — the invisible, vital energy that breathes through every living being. Ancient healing traditions across cultures have recognized this energy by different names: chi in Chinese medicine, ki in Japanese practice, and mana in Polynesian tradition. What they all describe is the same fundamental truth: life is not merely physical." },
      { type: "heading", content: "Where Does Prana Come From?" },
      { type: "paragraph", content: "According to pranic healing teachings, prana is absorbed into the body from three primary sources: the sun, the air, and the ground. Solar prana enters through sunlight and is the most potent form. Air prana is absorbed through breathing — which is why slow, conscious breathwork is so deeply revitalizing. Ground prana enters through the soles of the feet, which is one reason walking barefoot on the earth feels so grounding." },
      { type: "quote", content: "Prana or vital energy is the very substratum of life itself. Without it, the physical body would be inert." },
      { type: "heading", content: "How Prana Flows Through Your Body" },
      { type: "paragraph", content: "Prana circulates through a network of subtle energy channels called nadis. When this flow is abundant and unobstructed, you feel energetic, clear-headed, emotionally balanced, and physically well. When the flow is depleted or blocked — due to stress, illness, negative emotions, or environmental factors — you may notice fatigue, mental fog, mood disturbances, or physical discomfort." },
      { type: "paragraph", content: "Energy centers called chakras act as transformers, stepping up or stepping down the frequency of prana as it moves through different levels of the body's energy field. There are eleven major chakras in pranic healing, each governing a cluster of organs and emotional states." },
      { type: "heading", content: "Signs That Your Prana Is Low" },
      { type: "list", items: [
        "Persistent fatigue even after adequate sleep",
        "Difficulty concentrating or mental fog",
        "Feeling emotionally flat or unmotivated",
        "Recurring minor illnesses or slow recovery",
        "A general sense of heaviness or disconnection from life"
      ]},
      { type: "heading", content: "Working with Prana" },
      { type: "paragraph", content: "The good news is that prana can be intentionally cultivated and directed. Pranic healing practitioners are trained to sense, cleanse, and replenish the energy body, restoring its natural vitality. Even in daily life, simple practices — conscious breathing, spending time in nature, meditation, and maintaining positive emotions — all help sustain a robust pranic field." },
      { type: "paragraph", content: "Understanding prana is the first step toward taking a more active role in your own wellbeing. When you begin to see yourself as an energetic being as much as a physical one, a whole new dimension of health and healing becomes available to you." }
    ]
  },
  {
    slug: "how-pranic-healing-works",
    title: "How Pranic Healing Works: A Step-by-Step Look at an Energy Session",
    subtitle: "Curious what actually happens during a pranic healing session? Here is a clear, grounded look at the process from beginning to end.",
    category: "How It Works",
    readTime: "8 min read",
    publishedDate: "April 28, 2025",
    heroImage: "../assets/what-is-1.png",
    excerpt: "Many people come to pranic healing with a mix of curiosity and healthy skepticism. What does a healer actually do? How can working with an invisible energy field produce real results? This article walks you through a typical session so you can know exactly what to expect.",
    body: [
      { type: "paragraph", content: "Many people come to pranic healing with a mix of curiosity and healthy skepticism. What does a healer actually do? How can working with an invisible energy field produce real results? This article walks you through a typical session so you can know exactly what to expect." },
      { type: "heading", content: "The Three Core Steps" },
      { type: "paragraph", content: "Every pranic healing session, whether in person or at a distance, follows a three-part protocol refined over decades of practice and research by Grand Master Choa Kok Sui." },
      { type: "subheading", content: "Step 1: Scanning" },
      { type: "paragraph", content: "The practitioner begins by gently scanning the client's energy body, moving their hands a few inches above the physical body to sense the aura's condition. They are looking for areas of congestion (excess, stagnant energy) and depletion (areas where energy is too thin or deficient). This step gives the healer a map of the work that needs to be done." },
      { type: "subheading", content: "Step 2: Cleansing" },
      { type: "paragraph", content: "Before fresh, healthy energy can flow in, diseased or congested energy must be removed. This is perhaps the most important step and one that makes pranic healing distinct from practices that only add energy. Using specific hand movements and mental intention, the practitioner systematically sweeps away energetic contaminants from the affected areas and chakras." },
      { type: "subheading", content: "Step 3: Energizing" },
      { type: "paragraph", content: "With the space cleared, the healer projects fresh prana into the depleted areas. Different colors of prana are used for different purposes — white prana for general revitalization, electric violet for strong cleansing, orange-red for activating, and light blue for soothing and cooling." },
      { type: "quote", content: "Healing is not something done to you. It is something that happens through you, when energy is given space to move freely." },
      { type: "heading", content: "What the Client Experiences" },
      { type: "paragraph", content: "Most clients sit or lie comfortably in their clothes throughout the session. Common sensations include gentle warmth, a tingling feeling, a sense of deep relaxation, and sometimes an emotional release such as tears or a feeling of lightness. Some clients feel nothing during the session but notice significant changes in the hours or days that follow." },
      { type: "heading", content: "The Role of the Salt-Water Protocol" },
      { type: "paragraph", content: "After the session, practitioners typically instruct clients to wash their hands and arms in salt water, or have them soak their feet in a salt-water solution. Salt is a natural energetic cleanser and helps ground the client and stabilize the freshly balanced energy field." },
      { type: "heading", content: "How Many Sessions Are Needed?" },
      { type: "paragraph", content: "This depends on the nature of the condition, its duration, and the client's own vitality. Acute issues — a recent injury, a sudden onset of anxiety, a fresh emotional upset — often respond quickly, sometimes within one to three sessions. Chronic or complex issues may require a series of regular sessions over weeks or months, ideally combined with complementary medical care and lifestyle support." }
    ]
  },
  {
    slug: "chakras-and-healing",
    title: "The Eleven Major Chakras: Your Body's Energy Command Centers",
    subtitle: "Pranic healing works with eleven major chakras, each governing specific organs, emotions, and aspects of wellbeing. Learn what they are and what happens when they go out of balance.",
    category: "Energy Anatomy",
    readTime: "9 min read",
    publishedDate: "April 10, 2025",
    heroImage: "../assets/what-is-2.png",
    excerpt: "Most people have heard of the seven chakras from yoga traditions. Pranic healing works with eleven major chakras, offering a more detailed map of the body's energy anatomy. Understanding these centers can help you recognize patterns in your own health and emotional life.",
    body: [
      { type: "paragraph", content: "Most people have heard of the seven chakras from yoga traditions. Pranic healing works with eleven major chakras, offering a more detailed map of the body's energy anatomy. Understanding these centers can help you recognize patterns in your own health and emotional life." },
      { type: "heading", content: "The Eleven Major Chakras" },
      { type: "list", items: [
        "Crown Chakra — Spiritual connection, higher consciousness, divine will",
        "Forehead Chakra — Higher intuition, clairvoyance, memory",
        "Ajna (Brow) Chakra — Willpower, concentration, higher intelligence",
        "Throat Chakra — Communication, creativity, higher concreteness",
        "Heart Chakra — Higher emotions, compassion, love, joy",
        "Solar Plexus Chakra — Emotions, vitality, digestive organs",
        "Spleen Chakra — Energy assimilation, blood vitality, immune defense",
        "Navel Chakra — Lower emotions, kundalini energy, vitality",
        "Sex Chakra — Sexual energy, creative vitality, lower concreteness",
        "Basic (Root) Chakra — Grounding, survival instinct, physical vitality",
        "Meng Mein Chakra — Kidney function, blood pressure, vitality distribution"
      ]},
      { type: "heading", content: "What Happens When a Chakra Is Imbalanced?" },
      { type: "paragraph", content: "Each chakra can be in one of three states: balanced, congested (over-activated with stagnant energy), or depleted (under-active with insufficient energy). Both extremes produce symptoms. A congested solar plexus chakra, for instance, may manifest as irritability, anxiety, or digestive problems. A depleted solar plexus may show up as low energy, poor self-esteem, or emotional flatness." },
      { type: "quote", content: "The chakras are not merely spiritual metaphors. They are functional energy centers that have measurable effects on the organs and systems they govern." },
      { type: "heading", content: "The Heart Chakra and Emotional Health" },
      { type: "paragraph", content: "In pranic healing, the heart chakra is given particular attention because it governs the emotional body. Grief, heartbreak, prolonged stress, and unexpressed emotions all create congestion here. When the heart chakra is cleansed and energized, clients often report a profound sense of emotional relief — as if a weight they had been carrying for years has finally been set down." },
      { type: "heading", content: "Daily Practices for Chakra Health" },
      { type: "list", items: [
        "Spend time in morning sunlight to naturally energize the entire field",
        "Practice rhythmic breathing (inhale 6 counts, hold 1, exhale 6) to activate the spleen chakra",
        "Use loving-kindness meditation to keep the heart chakra expansive",
        "Spend time in nature and walk barefoot when possible to ground the basic chakra",
        "Minimize prolonged exposure to negativity, conflict, and excessive screen time"
      ]},
      { type: "paragraph", content: "Working with a trained pranic healer provides the most direct way to restore chakra balance, but these daily practices create the energetic conditions in which healing can take hold and last." }
    ]
  },
  {
    slug: "pranic-healing-for-stress-and-anxiety",
    title: "Pranic Healing for Stress and Anxiety: What the Research Tells Us",
    subtitle: "Stress and anxiety are among the most common reasons people seek pranic healing. Here is what we know about why it works so well for these conditions.",
    category: "Conditions",
    readTime: "7 min read",
    publishedDate: "March 22, 2025",
    heroImage: "../assets/gallery-1.png",
    excerpt: "We are living through an epidemic of anxiety. Globally, hundreds of millions of people struggle with chronic stress and anxiety disorders, and the tools of conventional medicine — though often helpful — leave many people still searching for relief. Pranic healing offers a complementary approach that addresses anxiety at its energetic root.",
    body: [
      { type: "paragraph", content: "We are living through an epidemic of anxiety. Globally, hundreds of millions of people struggle with chronic stress and anxiety disorders, and the tools of conventional medicine — though often helpful — leave many people still searching for relief. Pranic healing offers a complementary approach that addresses anxiety at its energetic root." },
      { type: "heading", content: "The Energetic Signature of Anxiety" },
      { type: "paragraph", content: "Pranic healers who have worked with anxious clients consistently observe the same pattern: severe congestion in the solar plexus chakra, combined with depletion in the crown and heart chakras. The solar plexus governs the emotional body and, when overloaded with unprocessed fear or worry, creates the physical and mental symptoms we call anxiety — racing thoughts, a tight chest, digestive distress, inability to relax." },
      { type: "paragraph", content: "Simultaneously, the ajna chakra (which governs will and mental focus) becomes erratic, explaining why anxious people often experience difficulty concentrating and feel as though their thoughts are spinning out of control." },
      { type: "heading", content: "What a Healing Session Addresses" },
      { type: "list", items: [
        "Deep cleansing of the solar plexus chakra to remove accumulated emotional congestion",
        "Stabilizing and energizing the ajna to restore calm, focused clarity",
        "Energizing the heart chakra with soothing, cool blue prana to promote inner peace",
        "Revitalizing the crown to reconnect the client with a sense of wellbeing",
        "Grounding through the basic chakra to bring the client back to the present moment"
      ]},
      { type: "quote", content: "After my first session I slept more deeply than I had in three years. I woke up and the constant hum of worry was simply quieter." },
      { type: "heading", content: "What Clients Typically Report" },
      { type: "paragraph", content: "Many clients notice a significant reduction in baseline anxiety after two to four sessions. The racing-thought quality of anxiety often softens first, followed by improved sleep, a greater sense of groundedness, and eventually a shift in the emotional reactivity that was fueling the anxiety cycle." },
      { type: "paragraph", content: "It is important to understand that pranic healing is most effective as part of a holistic approach. For moderate to severe anxiety, it works beautifully alongside therapy, medication management, and lifestyle practices such as regular movement and reduced caffeine." },
      { type: "heading", content: "A Simple Self-Care Practice for Anxious Days" },
      { type: "paragraph", content: "Place both hands over your solar plexus (the area just below the sternum). Breathe slowly and imagine that with each exhale you are releasing dense, heavy energy from this center. With each inhale, draw in calm golden light. Even five minutes of this practice can meaningfully shift an anxious state." }
    ]
  },
  {
    slug: "distance-healing-explained",
    title: "Distance Healing: How Can Healing Work Across Space and Time?",
    subtitle: "Remote pranic healing is one of the most surprising aspects of the practice. This article explains the energetic principles that make it possible — and what clients can expect.",
    category: "How It Works",
    readTime: "6 min read",
    publishedDate: "March 5, 2025",
    heroImage: "../assets/video-thumb-1.png",
    excerpt: "Of all the aspects of pranic healing, distance or remote healing is the one that most challenges conventional assumptions about how the world works. How can a healer help someone they cannot see or touch, sometimes from thousands of miles away? The answer lies in understanding the true nature of the energy body.",
    body: [
      { type: "paragraph", content: "Of all the aspects of pranic healing, distance or remote healing is the one that most challenges conventional assumptions about how the world works. How can a healer help someone they cannot see or touch, sometimes from thousands of miles away? The answer lies in understanding the true nature of the energy body." },
      { type: "heading", content: "Energy Is Not Limited by Physical Space" },
      { type: "paragraph", content: "The physical body has edges. The energy body does not — at least not in the same rigid way. The aura extends around and beyond the physical form, and the subtle energy that animates us is not confined by the laws that govern matter. This is why prayer, intention, and love can be felt across vast distances. Distance healing works within this same framework: consciousness and energy can meet, regardless of where physical bodies happen to be located." },
      { type: "paragraph", content: "Quantum physics, while not a direct explanation of pranic healing, has demonstrated that entangled particles influence one another instantaneously regardless of the distance between them. Many researchers and practitioners see this as a pointer toward a deeper interconnectedness that energy healing has worked with intuitively for centuries." },
      { type: "heading", content: "How a Distance Session Works" },
      { type: "paragraph", content: "Before a distance session, the client agrees to a scheduled time and finds a quiet, comfortable place to rest. The healer, working from their own space, uses a surrogate — often a photograph or a mental representation of the client — to locate and interact with the client's energy body. The same three-step protocol of scanning, cleansing, and energizing is applied. Many clients report feeling warmth, tingling, or a deep relaxation during the session itself, even without knowing which moment the healer was working on them." },
      { type: "quote", content: "I was skeptical about the distance session. But I felt warmth moving across my back during the exact window he was working. I couldn't explain it, but I couldn't deny it either." },
      { type: "heading", content: "What to Do During Your Distance Session" },
      { type: "list", items: [
        "Find a quiet room and lie down or sit comfortably",
        "Set an intention for what you would like support with",
        "Breathe slowly and allow yourself to rest — no effort is required from you",
        "Keep a glass of water nearby to drink after the session",
        "After the session, spend a few minutes grounded before returning to your day"
      ]},
      { type: "heading", content: "Is Distance Healing as Effective as In-Person?" },
      { type: "paragraph", content: "Many experienced practitioners and their clients report that well-conducted distance sessions can be equally effective as in-person work. For clients who are bedridden, living in a remote area, or dealing with conditions that make travel difficult, distance healing makes this modality accessible in ways that in-person sessions cannot always be. If you are new to pranic healing, we recommend starting with an in-person session if possible, simply because the direct energetic contact between healer and client can be a powerful first experience." }
    ]
  },
  {
    slug: "pranic-healing-for-children",
    title: "Pranic Healing for Children: Gentle Support for Little Energy Bodies",
    subtitle: "Children respond to energy healing with remarkable speed. Here is what parents need to know about bringing this gentle practice to their families.",
    category: "Special Topics",
    readTime: "5 min read",
    publishedDate: "February 18, 2025",
    heroImage: "../assets/video-thumb-2.png",
    excerpt: "Children are energetically sensitive and highly receptive. Their energy bodies are bright and responsive, which means they tend to benefit from pranic healing quickly and noticeably. Many parents who have experienced healing themselves begin wondering how this gentle modality might support their children's health and emotional wellbeing.",
    body: [
      { type: "paragraph", content: "Children are energetically sensitive and highly receptive. Their energy bodies are bright and responsive, which means they tend to benefit from pranic healing quickly and noticeably. Many parents who have experienced healing themselves begin wondering how this gentle modality might support their children's health and emotional wellbeing." },
      { type: "heading", content: "Why Children Respond So Well" },
      { type: "paragraph", content: "Children have not yet developed the energetic 'armoring' that adults build up over years of stress, suppressed emotion, and accumulated trauma. Their fields are generally more fluid and less congested, which means that when you introduce fresh, clean prana, the body accepts and integrates it quickly. Even very young children often show visible relaxation during a session, settling into a calm, sometimes sleepy state." },
      { type: "heading", content: "What Conditions Can Be Supported?" },
      { type: "list", items: [
        "Childhood anxiety and worry, including school-related stress",
        "Behavioral difficulties and emotional regulation challenges",
        "Frequent minor illnesses such as colds and ear infections",
        "Sleep disturbances and nightmares",
        "Attention and focus challenges",
        "Physical complaints such as growing pains and headaches",
        "Grief, loss, or transition (new sibling, moving, parental divorce)"
      ]},
      { type: "heading", content: "What a Session Looks Like for a Child" },
      { type: "paragraph", content: "Sessions with children are typically shorter — around 20 to 30 minutes — and are adapted to the child's comfort and attention span. The child remains fully clothed and can sit, lie down, or even move around gently. No touch is involved. Many practitioners keep a gentle, playful energy in the session space, sometimes using imagery (asking the child to imagine breathing in golden light) to help younger children engage with the experience." },
      { type: "quote", content: "My eight-year-old had night terrors almost every night for two years. After three sessions, they stopped. I still don't fully understand why, but I am deeply grateful." },
      { type: "heading", content: "A Note on Parental Presence" },
      { type: "paragraph", content: "For children under twelve, a parent or guardian is always present during the session. This not only ensures the child's comfort and safety but often allows the parent to observe the session and learn simple supportive practices they can use at home between sessions. Parental involvement tends to deepen the child's response to treatment." },
      { type: "paragraph", content: "If your child is receiving medical treatment for any condition, pranic healing is always offered as a complement to that care, never a replacement for it. Always keep your child's medical team informed of any complementary approaches you are exploring." }
    ]
  },
  {
    slug: "building-your-daily-energy-practice",
    title: "Building a Daily Energy Practice: Simple Habits That Keep Your Prana Flowing",
    subtitle: "You don't need to be a healer to tend your own energy. Here are seven accessible practices that keep the pranic body vibrant between healing sessions.",
    category: "Self-Care",
    readTime: "7 min read",
    publishedDate: "February 2, 2025",
    heroImage: "../assets/video-thumb-3.png",
    excerpt: "Pranic healing sessions provide powerful restoration, but what happens in between sessions matters enormously. Just as a car needs regular fuel, your energy body needs consistent daily care. The good news is that effective energy hygiene does not require special training — just intention and a few simple habits.",
    body: [
      { type: "paragraph", content: "Pranic healing sessions provide powerful restoration, but what happens in between sessions matters enormously. Just as a car needs regular fuel, your energy body needs consistent daily care. The good news is that effective energy hygiene does not require special training — just intention and a few simple habits." },
      { type: "heading", content: "1. Rhythmic Breathing Upon Waking" },
      { type: "paragraph", content: "Begin each morning with five minutes of slow, rhythmic breathing before you reach for your phone. A simple ratio of inhale four counts, hold one, exhale four, hold one — activates the spleen chakra and draws fresh solar prana into your field. Morning sunlight on the skin enhances this effect significantly." },
      { type: "heading", content: "2. The Salt Shower Protocol" },
      { type: "paragraph", content: "Salt is one of nature's most effective energetic cleansers. Before your morning shower, briefly scrub your arms, legs, and the soles of your feet with coarse sea salt. This physical act corresponds to an energetic one, helping slough off accumulated emotional and environmental energies from the previous day. Rinse thoroughly." },
      { type: "heading", content: "3. Conscious Time in Nature" },
      { type: "paragraph", content: "Walking barefoot on grass, soil, or sand connects the basic chakra to ground prana — one of the most stabilizing and revitalizing forms of energy available. Even fifteen minutes in a park or garden, with shoes off, has a measurable grounding effect that most people feel as a reduction in mental chatter and physical tension." },
      { type: "heading", content: "4. The Twin Hearts Meditation" },
      { type: "paragraph", content: "This meditation, developed by Grand Master Choa Kok Sui, activates the heart and crown chakras simultaneously, flooding the entire energy body with divine energy. It takes approximately twenty minutes and is available as a free guided recording. Many dedicated practitioners report that consistent practice over several months produces remarkable changes in emotional resilience, mental clarity, and physical wellbeing." },
      { type: "heading", content: "5. Protecting Your Energy in Difficult Environments" },
      { type: "paragraph", content: "Some environments are energetically depleting — hospitals, areas of conflict, highly stressed workplaces, and crowded urban spaces. Before entering these environments, take a moment to visualize a cocoon of golden light around your entire aura. This simple intention, held for even thirty seconds, provides meaningful protection throughout your time in the space." },
      { type: "heading", content: "6. Evening Energy Release" },
      { type: "paragraph", content: "At the end of the day, sit quietly for five minutes and scan your body for any areas of tension, heaviness, or emotional residue. Place your hands over each area in turn and breathe slowly, imagining that you are releasing dense energy on each exhale. Follow this with a brief self-blessing — hands over the heart, and a simple acknowledgment of what went well in the day." },
      { type: "heading", content: "7. Maintaining Your Inner Environment" },
      { type: "paragraph", content: "What you think and feel shapes your energy field more powerfully than almost anything external. Cultivating gratitude, practicing forgiveness (especially toward yourself), limiting exposure to violent or highly negative media, and keeping your physical environment clean and organized all have direct positive effects on your pranic body. The outer world reflects the inner one — and so does the energy field." },
      { type: "quote", content: "Small daily acts of energetic care compound over time. A year of these practices produces a person who is noticeably more vital, clear, and resilient." }
    ]
  },
  {
    slug: "pranic-healing-and-conventional-medicine",
    title: "Pranic Healing and Conventional Medicine: Partners, Not Competitors",
    subtitle: "A clear-eyed look at how pranic healing fits responsibly alongside medical care — and why the best healers always insist on this partnership.",
    category: "Foundations",
    readTime: "5 min read",
    publishedDate: "January 20, 2025",
    heroImage: "../assets/video-thumb-4.png",
    excerpt: "One of the most important things to understand about pranic healing is that it is designed to work alongside conventional medicine, not in opposition to it. Grand Master Choa Kok Sui himself was emphatic on this point: responsible healers never advise clients to discontinue medical treatment or medications.",
    body: [
      { type: "paragraph", content: "One of the most important things to understand about pranic healing is that it is designed to work alongside conventional medicine, not in opposition to it. Grand Master Choa Kok Sui himself was emphatic on this point: responsible healers never advise clients to discontinue medical treatment or medications." },
      { type: "heading", content: "What Pranic Healing Can and Cannot Do" },
      { type: "paragraph", content: "Pranic healing works on the energy body — the template that underlies and interpenetrates the physical body. By restoring energetic health, it creates conditions that support the physical body's own remarkable capacity for healing. It can accelerate recovery, reduce the side effects of medical treatments, support emotional resilience during illness, and significantly improve quality of life." },
      { type: "paragraph", content: "What it cannot do is replace a broken bone, remove a tumor, or substitute for insulin in a diabetic patient. The physical body sometimes requires physical intervention, and that is entirely appropriate. The question is not whether energy healing or medicine is better — it is how both can be used wisely together." },
      { type: "heading", content: "A Complementary, Not Alternative, Approach" },
      { type: "list", items: [
        "Always continue prescribed medications unless advised otherwise by your doctor",
        "Inform your medical team that you are exploring complementary energy work",
        "Never delay seeking medical diagnosis or treatment because of healing sessions",
        "Use pranic healing to support recovery, manage stress, and improve overall resilience",
        "Be wary of any practitioner who discourages you from medical care — this is not responsible practice"
      ]},
      { type: "quote", content: "The body heals itself. Medicine, surgery, and energy healing all create the conditions in which that natural intelligence can do its finest work." },
      { type: "heading", content: "Areas Where the Partnership Shines" },
      { type: "paragraph", content: "Some of the most compelling results from pranic healing are seen when it is integrated alongside conventional treatment. Cancer patients undergoing chemotherapy often experience reduced nausea and fatigue when receiving regular sessions. Post-surgical clients heal faster. Patients with chronic pain conditions report measurable improvements in pain scores. Psychiatric clients find that pranic healing sessions complement their therapy and medication, accelerating emotional processing and stabilization." },
      { type: "paragraph", content: "We live in an era where the divide between conventional and complementary medicine is, thankfully, beginning to narrow. More and more healthcare professionals are open to — or even enthusiastic about — integrative approaches. Bring your whole self to your healing journey, which means bringing every resource available to you." }
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export const categories = [...new Set(articles.map(a => a.category))];
