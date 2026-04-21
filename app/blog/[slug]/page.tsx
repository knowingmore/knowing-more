import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Article data ───────────────────────────────────────────────── */
const articles: Record<string, {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  img: string;
  body: React.ReactNode;
}> = {

  "nmn-nad-longevity-science": {
    slug: "nmn-nad-longevity-science",
    category: "Science",
    title: "Your energy drops by half between 25 and 60 - and there's more you can do about it than you think",
    date: "March 2025",
    readTime: "8 min read",
    img: "/images/website/blog-longevity-woman.jpeg",
    body: (
      <>
        <p className="text-xl leading-relaxed text-[#111111]/75 font-medium mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          At 25, your cells are flush with a molecule that powers almost everything - from how fast you recover after a hard workout to how clearly you think at 4pm. By 60, you&apos;ll have half as much of it. The question isn&apos;t whether that decline matters. The question is what, if anything, you can do about it.
        </p>
        <p>Nicotinamide adenine dinucleotide is not a wellness trend. It is a coenzyme present in every living cell, essential to over 500 enzymatic reactions - including the ones that govern DNA repair, mitochondrial electron transport, and the activation of sirtuins, the longevity-associated proteins first identified in Guarente&apos;s lab at MIT in the 1990s.</p>
        <p>The decline is not disputed. Massudi et al. (2012) established a roughly linear fall in whole-blood NAD+ levels with age, with a 50% reduction measurable between the third and seventh decade of life. The mechanism is well-understood: as we age, the enzyme CD38 - a glycohydrolase involved in immune signalling - becomes progressively more active and consumes NAD+ faster than the salvage pathway can replenish it. Simultaneously, NAMPT activity, the rate-limiting enzyme in NAD+ biosynthesis, declines.</p>

        <h2>The precursor question</h2>
        <p>NAD+ cannot be supplemented directly - it does not survive oral delivery intact. The question has therefore always been which precursor provides the most efficient and bioavailable route to intracellular NAD+ repletion.</p>
        <p>Three candidates dominate the literature: nicotinic acid (NA), nicotinamide riboside (NR), and nicotinamide mononucleotide (NMN). Nicotinic acid, the oldest, causes flushing at therapeutic doses via prostaglandin D2 release and is poorly tolerated. NR and NMN have become the focus of modern research precisely because they lack this side effect profile.</p>
        <p>NMN sits one enzymatic step closer to NAD+ than NR in the salvage pathway. It is converted directly to NAD+ via NMNAT enzymes without the intermediate NR step. This theoretical advantage in conversion efficiency has been supported by the kinetic data: Mills et al. (2016) showed that oral NMN in mice was detectable in blood within 2.5 minutes and elevated hepatic NAD+ levels within 15 minutes - faster than equivalent NR supplementation in the same model.</p>

        <h2>What the human trials actually show</h2>
        <p>The first rigorous human pharmacokinetic study of NMN was published by Irie et al. (2020) in npj Aging and Mechanisms of Disease. Ten healthy men received a single oral dose of 100, 250, or 500 mg NMN. All doses elevated blood NMN levels significantly. At 500 mg, plasma NAD+ metabolites increased measurably within two hours. No adverse effects were reported at any dose.</p>
        <p>Yoshino et al. (2021) in Science provided the first placebo-controlled RCT examining metabolic effects. Postmenopausal women with prediabetes received 250 mg/day NMN or placebo for 10 weeks. NMN significantly increased skeletal muscle NAD+ levels and improved insulin signalling - specifically, it enhanced muscle&apos;s ability to respond to insulin and upregulated the expression of genes involved in muscle remodelling. Fasting glucose and body composition did not change significantly, but the insulin sensitivity data was robust.</p>
        <p>Liao et al. (2021) examined NMN in healthy middle-aged and older adults over 60 days. The 300 mg/day group showed significant improvements in telomere length - a proxy for biological age - compared to placebo. This was a secondary endpoint and requires replication, but the direction is consistent with the mechanistic hypothesis.</p>
        <p>Huang et al. (2022) conducted a 12-week RCT in recreational runners aged 40–65. The 600 mg/day group showed significantly improved aerobic capacity (VO2 max) and muscle endurance compared to placebo. This is, to date, the best performance-relevant human data on NMN.</p>

        <h2>The dose-response evidence</h2>
        <p>Across the human trial literature, doses below 250 mg/day consistently show attenuated or negligible effects on NAD+ metabolites in blood. Doses of 500–600 mg/day appear to maximise intracellular repletion based on the current data. The effective window appears to be 300–600 mg/day, with diminishing returns above that threshold suggested by the pharmacokinetic curves in Irie et al.</p>
        <p>Our Performance formula contains 500 mg NMN - at the upper end of the range supported by human trial data.</p>

        <h2>Bioavailability: the sublingual question</h2>
        <p>Sublingual NMN delivery has been proposed on the basis that it bypasses first-pass hepatic metabolism. Bhatt et al. (2023) found that sublingual administration in healthy adults produced higher peak plasma NMN concentrations than oral capsules at the same dose. However, the clinical significance of this difference on tissue-level NAD+ repletion remains to be established in longer-term trials. Oral delivery at sufficient dose remains the most-studied and validated approach.</p>

        <h2>What the evidence does not support</h2>
        <p>NMN is not a longevity guarantee. The human data on ageing endpoints - telomere length, epigenetic clocks, all-cause mortality - is preliminary. What the evidence supports is: NAD+ precursor supplementation at clinically-dosed levels reliably elevates intracellular NAD+ in humans, improves insulin sensitivity in at-risk populations, and shows promising signals in aerobic capacity. The mechanistic case for why this matters for long-term healthspan is strong. The direct human evidence that it extends lifespan is not yet available - and any brand claiming otherwise is not being honest with you.</p>
      </>
    ),
  },

  "cortisol-ashwagandha-clinical-evidence": {
    slug: "cortisol-ashwagandha-clinical-evidence",
    category: "Ingredients",
    title: "Cortisol is quietly wrecking your sleep, weight, and recovery - 22 trials point to the same fix",
    date: "February 2025",
    readTime: "6 min read",
    img: "/images/website/lab-scale.jpg",
    body: (
      <>
        <p className="text-xl leading-relaxed text-[#111111]/75 font-medium mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          You&apos;ve felt it. The moment a stressful week starts affecting your sleep, your hunger, your patience. What you might not know is that the hormone orchestrating all of it - cortisol - can be measurably, reliably reduced. Not by meditating more. By choosing the right plant extract at the right dose, backed by two decades of clinical trials.
        </p>
        <p>Withania somnifera has been used in Ayurvedic medicine for over 3,000 years. The modern clinical literature on it is, by supplement standards, unusually rigorous - there are now 22 published randomised controlled trials examining its effects on cortisol, stress, thyroid function, testosterone, and cognitive performance. The problem is that most of what is sold as &quot;ashwagandha&quot; bears almost no resemblance to what was tested in those trials.</p>

        <h2>The standardisation problem</h2>
        <p>Ashwagandha root powder is not a standardised ingredient. The concentration of active withanolides - the steroidal lactones responsible for the adaptogenic effects - varies by a factor of 10 to 20 between raw root preparations depending on soil, climate, harvest timing, and processing. A product containing 500 mg of unstandardised root powder may contain as little as 0.5–1% withanolides by mass.</p>
        <p>KSM-66 is a full-spectrum root extract standardised to a minimum 5% withanolides by HPLC verification, developed by Ixoreal Biomed and used in the majority of the high-quality RCTs. Sensoril is a root-and-leaf extract standardised to 10% withanolides but uses a different extraction pathway that may alter the withanolide profile.</p>
        <p>When we review the ashwagandha literature, we are - if we are being precise - reviewing the KSM-66 literature, because that is the extract used in the majority of the trials that produced positive results.</p>

        <h2>Cortisol: the mechanistic case</h2>
        <p>Ashwagandha&apos;s primary mechanism of action on cortisol appears to operate at the level of the hypothalamic-pituitary-adrenal (HPA) axis. Withanolides are believed to modulate GABA-A receptor activity - mimicking the inhibitory signalling that attenuates the stress response - and to directly inhibit the expression of heat shock proteins (Hsp70 and Hsp90) that support glucocorticoid receptor activity. The net effect is a blunting of cortisol output in response to psychological and physiological stressors.</p>

        <h2>The RCT evidence on cortisol</h2>
        <p>Chandrasekhar et al. (2012) in the Indian Journal of Psychological Medicine conducted the trial that established the benchmark. 64 adults with chronic stress were randomised to 300 mg KSM-66 twice daily (600 mg total) or placebo for 60 days. The ashwagandha group showed a 27.9% reduction in serum cortisol versus 7.9% in placebo. The PSS stress score fell by 44% versus 5.5%. This is the most-cited ashwagandha RCT and the one most brands reference - frequently without disclosing that the dose was 600 mg/day of KSM-66 specifically.</p>
        <p>Pratte et al. (2014) used the same extract at 300 mg twice daily (600 mg total) in a naturopathic care setting and replicated the cortisol reduction findings with an additional signal on fatigue and concentration.</p>
        <p>Salve et al. (2019) is notable because it used a lower dose (240 mg/day) and still showed significant cortisol reduction - suggesting the dose-response curve does not require 600 mg to be effective, though the magnitude of effect was smaller.</p>
        <p>Across the 12 RCTs specifically examining cortisol as a primary or secondary endpoint, 11 reported statistically significant reductions. The outlier used a different, unstandardised extract.</p>

        <h2>Testosterone and physical performance</h2>
        <p>Wankhede et al. (2015) randomised 57 male subjects undergoing resistance training to 300 mg KSM-66 twice daily or placebo. The ashwagandha group showed significantly greater gains in muscle strength (bench press: +46.9 kg vs +26.4 kg), muscle recovery, and testosterone levels (+96.2 ng/dL vs +18.0 ng/dL) after 8 weeks. This is the primary trial cited for ashwagandha&apos;s effects on testosterone - and it used 600 mg/day KSM-66.</p>

        <h2>What the dose-response data shows</h2>
        <p>The threshold for measurable cortisol effects appears to be approximately 240–300 mg/day KSM-66. The range used in the majority of positive trials is 300–600 mg/day. There is no human trial data suggesting meaningful additional benefit above 600 mg/day. Our Balance formula contains 600 mg KSM-66 - the dose used in the highest-quality efficacy trials, from the extract specifically studied in those trials.</p>
      </>
    ),
  },

  "gut-microbiome-immune-connection": {
    slug: "gut-microbiome-immune-connection",
    category: "Science",
    title: "70% of your immune system lives in your gut - and most people are quietly damaging it without knowing",
    date: "February 2025",
    readTime: "7 min read",
    img: "/images/website/lab-scientists.jpg",
    body: (
      <>
        <p className="text-xl leading-relaxed text-[#111111]/75 font-medium mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          Every time you get sick, you probably think about your immune system. You probably don&apos;t think about your intestines. But the two are inseparable - and researchers have understood this for decades while the rest of us were still treating the gut as a digestion machine and nothing more.
        </p>
        <p>The figure - 70% of immune cells residing in the gut - is frequently cited and just as frequently misunderstood. It does not mean the gut &quot;is&quot; the immune system. It means that the gut-associated lymphoid tissue (GALT) is the largest single reservoir of immune cells in the body, and that the crosstalk between the luminal microbiome and these immune populations determines, in large part, the inflammatory setpoint of the entire organism.</p>

        <h2>The anatomy of gut immunity</h2>
        <p>The GALT comprises several distinct structures: Peyer&apos;s patches (lymphoid aggregates in the small intestinal mucosa), isolated lymphoid follicles, the lamina propria (which contains the largest population of IgA-secreting plasma cells in the body), and the intraepithelial lymphocyte layer. These structures are in continuous, dynamic communication with the luminal contents via specialised epithelial cells called M cells, which sample antigens and present them to the underlying immune tissue.</p>
        <p>Secretory IgA (sIgA) is the dominant immunoglobulin at mucosal surfaces and is produced at a rate of 3–5 grams per day in healthy adults - more than all other immunoglobulin classes combined. Its primary function is immune exclusion: coating luminal antigens and microorganisms to prevent translocation across the epithelial barrier. Dysbiosis - disruption of microbial community composition - reduces sIgA output, compromising this first line of defence.</p>

        <h2>The microbiome-immunity axis</h2>
        <p>The mechanistic link between microbiome composition and systemic immune function operates primarily through two pathways: short-chain fatty acid (SCFA) production and pattern recognition receptor (PRR) signalling.</p>
        <p>SCFAs - principally butyrate, propionate, and acetate - are produced by the fermentation of dietary fibre by anaerobic bacteria including Faecalibacterium prausnitzii, Roseburia intestinalis, and Bifidobacterium species. Butyrate is the primary energy source for colonocytes and also acts as a histone deacetylase (HDAC) inhibitor, directly regulating the differentiation of T-regulatory (Treg) cells in the colon. Treg cells suppress excessive inflammatory responses and are essential for immune tolerance - the ability to distinguish self from non-self and commensal bacteria from pathogens.</p>
        <p>Reduced SCFA production - caused by low fibre intake, antibiotic exposure, or loss of SCFA-producing species - decreases Treg cell populations, which has been linked to increased susceptibility to autoimmune conditions, allergic disease, and chronic inflammatory states in both animal models and human epidemiological data.</p>

        <h2>L-Glutamine and barrier integrity</h2>
        <p>The single-layer epithelial barrier between the gut lumen and the systemic circulation is maintained by tight junction proteins including claudin, occludin, and zonulin. Disruption of these junctions - &quot;leaky gut&quot; in clinical shorthand - permits the translocation of bacterial lipopolysaccharide (LPS) and other immunogenic molecules into the portal circulation, triggering systemic low-grade inflammation via TLR4-NF-κB signalling.</p>
        <p>L-Glutamine is the primary fuel for enterocytes and is essential for tight junction synthesis. Multiple RCTs have shown that L-Glutamine supplementation (typically 0.5–2 g/day) significantly reduces intestinal permeability markers including urinary lactulose/mannitol ratio and serum zonulin in populations with compromised barrier function. Our Gut Health formula contains 2 g L-Glutamine - at the upper end of the clinically-studied range.</p>

        <h2>Probiotic strain selection</h2>
        <p>Not all probiotic strains interact with immune tissue identically. The evidence for immune modulation is strain-specific, not genus-specific. Lactobacillus rhamnosus GG has the strongest data for reducing upper respiratory tract infection incidence. Bifidobacterium longum BB536 has specific evidence for reducing allergic inflammation markers. A multi-strain formula targeting both Lactobacillus and Bifidobacterium populations with documented colonisation capacity provides broader coverage than single-strain products - which is why our formulation uses a 50B CFU multi-strain complex rather than a single-species approach.</p>
      </>
    ),
  },

  "proprietary-blends-problem": {
    slug: "proprietary-blends-problem",
    category: "Industry",
    title: "Most supplement brands are legally hiding how little active ingredient is in your capsule - checking takes 60 seconds",
    date: "January 2025",
    readTime: "5 min read",
    img: "/images/website/lab-scientists-2.jpg",
    body: (
      <>
        <p className="text-xl leading-relaxed text-[#111111]/75 font-medium mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          The supplement you&apos;re taking might contain a tenth of the dose shown on the label. Legally. The manufacturer isn&apos;t lying - they&apos;re exploiting a loophole so widely used it has its own industry term. Here&apos;s how it works, and how to never fall for it again.
        </p>
        <p>In the European Union and the United States, food supplement regulations require that manufacturers list all ingredients and their quantities on the label. There is, however, a widely exploited exemption: if a manufacturer designates a group of ingredients as a &quot;proprietary blend&quot; or &quot;complex,&quot; they are required only to disclose the total weight of the blend - not the individual ingredient quantities within it.</p>
        <p>This is not a minor technical detail. It is the primary mechanism by which the supplement industry sells underdosed products at a premium.</p>

        <h2>The mathematics of a proprietary blend</h2>
        <p>Consider a label listing: &quot;Cognitive Performance Blend: 750 mg - Lion&apos;s Mane Extract, Bacopa Monnieri, Phosphatidylserine, Huperzine A.&quot; The clinically-effective dose of Bacopa Monnieri from the RCT literature is 300–450 mg/day. The effective dose of Phosphatidylserine is 100–300 mg/day. Together, these two ingredients require at least 400 mg at minimum effective doses. The total blend is 750 mg.</p>
        <p>This sounds like it might work. But Lion&apos;s Mane is listed first - under EU regulations, ingredients within a blend must be listed in descending order of weight. If the manufacturer has used 600 mg of Lion&apos;s Mane (the cheapest ingredient), that leaves 150 mg for the remaining three actives. Bacopa is now at perhaps 80 mg - less than a quarter of the dose used in the trials that showed cognitive effects. Phosphatidylserine may be present at 30 mg - a tenth of the clinical dose.</p>
        <p>The consumer has no way to know this from the label. Everything disclosed is technically accurate.</p>

        <h2>Four ways to identify underdosing</h2>
        <p><strong>1. Look for disclosed individual doses.</strong> If a product lists each ingredient with its specific quantity (e.g., &quot;Bacopa Monnieri Extract 300 mg, Phosphatidylserine 200 mg&quot;), the manufacturer is being transparent. This is the baseline standard.</p>
        <p><strong>2. Cross-reference total blend weight against known clinical doses.</strong> If you know the effective dose of each ingredient in a blend and the total weight cannot accommodate all of them at minimum effective levels, at least some are underdosed.</p>
        <p><strong>3. Check for standardisation disclosures.</strong> &quot;Ashwagandha Root Extract&quot; is not the same as &quot;KSM-66 Ashwagandha Root Extract, standardised to 5% withanolides.&quot; Standardisation to a specific active compound percentage is how you verify that the extract resembles what was tested in clinical trials.</p>
        <p><strong>4. Be sceptical of very long ingredient lists at low total weights.</strong> A 300 mg blend listing 12 ingredients cannot contain any of them at a clinically-meaningful dose. Formulas with fewer, precisely-dosed actives are almost always better than those with impressive-looking but underdosed lists.</p>

        <h2>Why we disclose everything</h2>
        <p>Every ingredient in every knowing more. formula is listed individually with its exact dose. We do not use proprietary blends. We do not hide behind &quot;complexes&quot; or &quot;matrices.&quot; If you cannot verify that our doses match the clinical literature, we have failed at transparency - and transparency is the only meaningful standard in this category.</p>
      </>
    ),
  },

  "sleep-architecture-performance": {
    slug: "sleep-architecture-performance",
    category: "Performance",
    title: "Your body repairs itself in one 90-minute window each night. What's stealing it - and how to get it back",
    date: "January 2025",
    readTime: "9 min read",
    img: "/images/website/lab-room.jpg",
    body: (
      <>
        <p className="text-xl leading-relaxed text-[#111111]/75 font-medium mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          Most people think they&apos;re solving their sleep problem when they hit 8 hours. They&apos;re not. Eight hours of fragmented, alcohol-affected, or late-shift sleep can deliver less physiological recovery than six hours of clean, deep sleep. The number of hours is almost irrelevant compared to what happens inside them.
        </p>
        <p>Sleep is not a single state. It is a cyclical succession of distinct neurological phases with radically different physiological functions. The failure to understand this - to treat sleep as a binary on/off variable rather than a structured biological process - underlies most of what is misunderstood about recovery, hormonal health, and cognitive performance.</p>

        <h2>The architecture of a night</h2>
        <p>A typical sleep cycle lasts 90–110 minutes and repeats 4–6 times per night. Each cycle contains proportions of N1 (light NREM), N2 (intermediate NREM), N3 (slow-wave sleep, SWS), and REM sleep that shift across the night. SWS dominates in the first two cycles - the first 3–4 hours. REM sleep dominates in the final two cycles - the last 3–4 hours. This means that an 8-hour sleep opportunity is not equivalent to a 5-hour one that &quot;feels the same&quot;: the lost time disproportionately removes REM sleep, not SWS.</p>

        <h2>What happens during slow-wave sleep</h2>
        <p>N3 - characterised by delta waves at 0.5–4 Hz - is when the most metabolically significant recovery processes occur. Growth hormone (GH) secretion is pulsatile and almost entirely nocturnal: Van Cauter et al. (2000) demonstrated that approximately 70% of daily GH secretion occurs during the first SWS episode. GH drives protein synthesis, lipolysis, and tissue repair. Impaired SWS directly attenuates GH output - and this effect is measurable even with a single night of sleep fragmentation.</p>
        <p>The glymphatic system - the brain&apos;s waste-clearance mechanism - is most active during SWS. Xie et al. (2013) in Science showed that the interstitial space in the mouse brain expands by 60% during sleep, dramatically increasing the convective flow of cerebrospinal fluid that clears metabolic waste including amyloid-beta and tau proteins. The implication for long-term cognitive health is significant: chronic SWS impairment may contribute to the accumulation of neurotoxic proteins associated with neurodegenerative disease.</p>

        <h2>What reduces slow-wave sleep</h2>
        <p>The three most potent suppressors of SWS in healthy adults are alcohol, late-day training, and age. Alcohol is particularly misunderstood: it causes faster sleep onset (which users interpret as a benefit) while suppressing N3 in the first half of the night and causing rebound arousal in the second half. Even a single drink within three hours of sleep onset measurably reduces SWS by 6–9%.</p>
        <p>High-intensity training within four hours of sleep onset elevates core body temperature and cortisol - both of which signal wakefulness to the circadian system and delay the transition into SWS. Training earlier in the day, ideally before 5pm, minimises this effect.</p>
        <p>Age-related SWS decline is well-documented and significant. Between the ages of 20 and 60, SWS decreases by approximately 2% of total sleep time per decade. A 60-year-old sleeping 8 hours may obtain 40–50 minutes of SWS; a 25-year-old sleeping the same duration typically obtains 90–110 minutes.</p>

        <h2>The magnesium-GABA connection</h2>
        <p>GABA (gamma-aminobutyric acid) is the primary inhibitory neurotransmitter responsible for the neurological transition from wakefulness to sleep. Magnesium is a required cofactor for GABA-A receptor function - it acts as a natural NMDA receptor antagonist, reducing neuronal excitability and promoting the low-frequency delta activity that characterises SWS. Magnesium deficiency is associated with higher rates of insomnia and reduced sleep quality in epidemiological data; supplementation with magnesium glycinate (the most bioavailable form) at 300–400 mg/day has been shown in RCTs to increase SWS duration and reduce sleep onset latency. Our Balance formula contains 400 mg magnesium glycinate - at the dose supported by the clinical evidence.</p>
      </>
    ),
  },

  "healthspan-wearables-whoop-garmin": {
    slug: "healthspan-wearables-whoop-garmin",
    category: "Science",
    title: "Your recovery score dropped again. Here's what's actually happening inside your cells",
    date: "April 2025",
    readTime: "7 min read",
    img: "/images/website/lab-room.jpg",
    body: (
      <>
        <p className="text-xl leading-relaxed text-[#111111]/75 font-medium mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          Millions of people wake up every morning, look at their wrist, and get a number. Recovery score: 64%. Body battery: 41. HRV: 38ms. The number feels meaningful - and it is. But most people have no idea what&apos;s actually setting it. The answer is not your sleep duration. It&apos;s what&apos;s happening inside your cells while you sleep.
        </p>

        <h2>Lifespan vs healthspan - and why your wearable measures the second one</h2>
        <p>Lifespan is how long you live. Healthspan is how long you live well - with full cognitive function, physical capacity, and metabolic health intact. These are not the same thing, and the gap between them is where most of the suffering happens. The average person in developed countries now lives around 10-15 years beyond their healthspan - years marked by declining function, chronic disease, and reduced quality of life.</p>
        <p>Your Whoop, Garmin, or Oura ring is not measuring lifespan. It is measuring healthspan - in real time, every day. Heart rate variability, recovery score, body battery, sleep stages, resting heart rate: these are all proxies for the same underlying biological state. That state is determined by three systems. And all three are measurable, addressable, and malleable.</p>

        <h2>What HRV is actually measuring</h2>
        <p>Heart rate variability - the millisecond variation between consecutive heartbeats - is the most information-dense metric your wearable captures. High HRV indicates that your autonomic nervous system is in a parasympathetic (rest-and-repair) state. Low HRV means the sympathetic (fight-or-flight) system is dominant - whether from unresolved psychological stress, systemic inflammation, poor sleep architecture, or metabolic insufficiency.</p>
        <p>HRV declines with age. This is not inevitable fate - it is a reflection of three compounding biological processes: mitochondrial dysfunction, dysregulated cortisol, and low-grade systemic inflammation. Intervening on any one of these improves HRV. Intervening on all three moves it substantially.</p>

        <h2>System 1: mitochondrial energy production</h2>
        <p>Your cardiac tissue - which generates your HRV signal - is among the most mitochondria-dense tissue in the body. Cardiomyocytes contain up to 5,000 mitochondria per cell, accounting for roughly 30% of cell volume. When mitochondrial function declines, the heart&apos;s ability to modulate beat-to-beat interval variation diminishes. This shows up as suppressed HRV.</p>
        <p>Mitochondrial function is tightly coupled to intracellular NAD+ levels. As NAD+ declines with age - roughly 50% reduction between the third and seventh decade - the enzymes that govern mitochondrial electron transport (Complex I, III) become less efficient. The result is reduced ATP output per oxygen molecule consumed: your cells are burning fuel but generating less usable energy. Your wearable sees this as low recovery, suppressed HRV, and extended time to baseline after training loads.</p>
        <p>NMN supplementation at clinically-effective doses (300-600mg/day) has been shown in human RCTs to elevate intracellular NAD+ and improve markers of mitochondrial function. In the Huang et al. (2022) trial in recreational runners, 600mg/day NMN improved VO2 max and muscular endurance over 12 weeks - both metrics that correlate directly with mitochondrial capacity.</p>

        <h2>System 2: cortisol rhythm and HRV suppression</h2>
        <p>Cortisol is the primary physiological antagonist of parasympathetic tone. Chronically elevated cortisol - whether from psychological stress, poor sleep, or HPA axis dysregulation - maintains sympathetic dominance and directly suppresses HRV. This is one of the most reproducible findings in psychophysiology: show us your cortisol curve and we can predict your HRV with reasonable accuracy.</p>
        <p>The mechanism is direct: cortisol activates the locus coeruleus, the brain&apos;s primary norepinephrine hub, which increases sympathetic outflow to the sinoatrial node. The sinoatrial node is where your heart rate is set - and where HRV originates. Elevated cortisol literally narrows the beat-to-beat variation your wearable records.</p>
        <p>KSM-66 ashwagandha at 600mg/day - the dose used in the Chandrasekhar et al. (2012) RCT - produced a 27.9% reduction in serum cortisol over 60 days. L-theanine at 200mg has been shown to reduce sympathetic nervous activity in response to acute stressors. Both operate on the same downstream effect: restoring parasympathetic dominance and the HRV that reflects it.</p>

        <h2>System 3: gut inflammation and the vagus nerve</h2>
        <p>The least intuitive driver of HRV suppression is gut-derived inflammation - but it is among the most significant. The gut and the heart are connected via the vagus nerve, the primary conduit of parasympathetic signalling in the body. Roughly 80% of vagal fibres are afferent - they carry information from the gut to the brain, not the other way around.</p>
        <p>When gut barrier integrity is compromised - a state called intestinal hyperpermeability or &quot;leaky gut&quot; - lipopolysaccharides (LPS) from gram-negative bacteria translocate into systemic circulation. LPS is a potent endotoxin that activates Toll-like receptor 4 (TLR4) signalling, triggering a systemic inflammatory cascade. This inflammatory state suppresses vagal tone and HRV measurably.</p>
        <p>Microbiome diversity correlates positively with HRV in multiple human studies. Christoph Trepel et al. (2021) found that gut microbiome composition predicted cardiac autonomic function independently of other cardiovascular risk factors. Restoring microbiome diversity and barrier integrity - through clinically-dosed probiotics and butyrate precursors - is one of the most underrated interventions for wearable-tracked recovery metrics.</p>

        <h2>What your wearable is telling you</h2>
        <p>When your Whoop recovery score is 52% on a Wednesday morning after eight hours in bed, it is not random noise. It is a signal from three biological systems operating below their potential. Mitochondria generating less ATP than they should. A cortisol curve that didn&apos;t fully reset overnight. A gut-vagal axis sending low-grade inflammatory signals upward. Your wearable sees the output. The cause is one level deeper - and it is addressable.</p>
        <p>Healthspan is not an abstract concept. It is the number on your wrist every morning. And unlike lifespan, it is something you can actively move.</p>
      </>
    ),
  },

  "gmp-manufacturing-what-it-means": {
    slug: "gmp-manufacturing-what-it-means",
    category: "Standards",
    title: "Your supplement passed every safety test and might still not work. What the label isn't telling you",
    date: "December 2024",
    readTime: "5 min read",
    img: "/images/website/capsules-marble.jpg",
    body: (
      <>
        <p className="text-xl leading-relaxed text-[#111111]/75 font-medium mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          When a supplement brand tells you their product is &quot;GMP certified,&quot; they&apos;re telling you something true and nearly meaningless at the same time. It&apos;s like saying a restaurant has a clean kitchen - necessary, but no guarantee of what ends up on your plate.
        </p>
        <p>Good Manufacturing Practice (GMP) certification is the most frequently cited quality credential in the supplement industry. It is also the most frequently misunderstood. GMP tells you that a facility passed a regulatory audit of its processes at the time of certification. It tells you almost nothing about what is in a specific product batch.</p>

        <h2>What GMP actually verifies</h2>
        <p>EU GMP certification (and the equivalent US FDA cGMP) audits manufacturing facilities against a set of process standards: documentation systems, personnel training, equipment calibration, environmental controls (temperature, humidity, contamination), and quality management procedures. A certified facility has demonstrated that it has the systems in place to manufacture consistently. It has not demonstrated that any specific product contains what the label claims.</p>
        <p>The distinction is important. A GMP-certified facility could theoretically produce a supplement containing a fraction of the labelled active ingredient concentration - and that batch would still have been manufactured in a &quot;GMP-compliant&quot; way, provided the process documentation was in order.</p>

        <h2>What actually matters: batch-level testing</h2>
        <p>The only way to verify that a specific product batch contains what the label states is independent, third-party analytical testing of that batch. This requires:</p>
        <p><strong>Identity testing</strong> confirms that the ingredient is what it claims to be. Adulteration - substituting a cheaper or structurally similar compound - is a documented problem in botanical supplements. HPLC or mass spectrometry can confirm identity with high specificity.</p>
        <p><strong>Potency testing</strong> verifies that the active compound is present at the labelled quantity. The accepted tolerance is typically ±10% for supplements. Testing consistently outside this range indicates either poor manufacturing control or intentional underfilling.</p>
        <p><strong>Contaminant screening</strong> checks for heavy metals (lead, cadmium, arsenic, mercury), microbial contaminants (E. coli, Salmonella, Staphylococcus aureus), and pesticide residues. These are independent of whether the ingredient itself is correctly identified or dosed.</p>

        <h2>The Certificate of Analysis</h2>
        <p>A Certificate of Analysis (CoA) is the document that records the results of batch-level testing. A genuine CoA comes from an accredited independent laboratory, carries a batch number traceable to a specific manufacturing run, and reports results against reference standards with instrument data. An internal CoA - produced by the manufacturer&apos;s own quality control - provides a lower level of assurance than one from an independent third party.</p>
        <p>We retain CoA documents for every batch of every knowing more. product and make them available on request. If a supplement brand cannot or will not provide a third-party CoA for a specific batch, that is a meaningful gap in quality assurance - regardless of what certifications appear on the label.</p>
      </>
    ),
  },
};

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const categoryColor: Record<string, string> = {
    Science: "#1B2A4A",
    Ingredients: "#A0784A",
    Performance: "#111111",
    Industry: "#1B2A4A",
    Standards: "#888",
  };

  const color = categoryColor[article.category] ?? "#1B2A4A";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero image */}
      <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 560px)" }}>
        <Image src={article.img} alt={article.title} fill
          className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Article content */}
      <article className="max-w-[720px] mx-auto px-6 md:px-8 pb-24 -mt-20 relative z-10">

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[8px] font-mono tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: `${color}18`, color }}>
            {article.category}
          </span>
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/30">{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#111111]/15" />
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#111111]/30">{article.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#111111] mb-10 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}>
          {article.title}<span style={{ color: "#1B2A4A" }}>.</span>
        </h1>

        {/* Body prose */}
        <div className="prose-article">
          {article.body}
        </div>

        {/* Divider */}
        <div className="mt-16 mb-10 h-px bg-[#111111]/[0.07]" />

        {/* Back link */}
        <Link href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#111111]/40 hover:text-[#1B2A4A] transition-colors duration-200">
          ← Back to Journal
        </Link>
      </article>

      <Footer />
    </main>
  );
}
