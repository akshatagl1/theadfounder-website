// Tweet data — newest first. To add new tweets, add to the top of this array.
// For tweets with images, put the image in /tweet-images/ and set image field.
const TWEETS = [
  {
    text: "Meta keeps shipping AI touch-ups and text overlays nobody asked for.\n\nWhat is actually needed?\n\nPredicted creative lifecycle.\n\nYou have billions of data points. Tell me this ad has ~7 days before fatigue so I can prep the next one.",
    date: "Jun 22, 2026",
    image: "creative-lifecycle.png"
  },
  {
    text: "I rarely care about CPM.\n\nCheap impressions don't automatically mean better performance. The quality of those impressions matters just as much.\n\nThe metric I care about most is CPC. If your website CTR stays similar, paying less per click is what actually moves the needle.",
    date: "Jun 20, 2026",
    image: null
  },
  {
    text: "Simple example:\n\nCampaign A: \u20B9500 CPM, 5% CTR = \u20B910 CPC\n\nCampaign B: \u20B9250 CPM, 2.5% CTR = \u20B910 CPC\n\nOne has double the CPM, but both deliver clicks at the same cost.\n\nHigh CPM isn't bad if it comes with proportionally higher CTR. Optimize for outcomes, not vanity metrics.",
    date: "Jun 20, 2026",
    image: null
  },
  {
    text: "We Killed Retargeting. ROAS Went Up.\n\nWe were running a retargeting campaign alongside our prospecting campaigns. Same creatives. Felt smart \u2014 \"catch people who didn't convert the first time.\"\n\nOur best prospecting creative (2.88x ROAS) got Rs.14 of spend in retargeting. Fourteen rupees. Meta was telling us the retargeting audience didn't want it.\n\nWhat was actually happening: both campaigns were hitting the same people. Retargeting was just re-showing ads to people who'd already seen them in prospecting. The campaigns were cannibalizing each other.\n\nWe killed retargeting. Prospecting ROAS went up. We saved Rs.2,000/day.\n\nSometimes the smartest move is removing something from the account, not adding to it.",
    date: "Jun 19, 2026",
    image: null
  },
  {
    text: "We gave Meta Rs.15K/day in a CBO campaign. 5 ad sets.\n\nMeta's algorithm was supposed to find the winners. It put Rs.12K on one ad set. That ad set did 0.7x. The two ad sets it starved at Rs.800 each? Both above 2.5x.\n\nCBO doesn't optimize for your margins. How to fix this?",
    date: "Jun 18, 2026",
    image: null
  },
  {
    text: "We moved everything to ABO \u2014 one creative per ad set, fixed budget. Immediately saw where money was actually going. If you're running CBO and wondering why results are inconsistent \u2014 this is why.\n\nManual control instead of fate in Meta's hands.",
    date: "Jun 18, 2026",
    image: null
  },
  {
    text: "We sold two versions of the same product. Diamond Dust \u2014 a plain sheet of rhinestones you cut yourself. And pre-cut shapes \u2014 hearts, stars, ready to apply. Pre-cut shapes flopped. Every single creative. Diamond Dust carried the entire category for months. Why?",
    date: "Jun 15, 2026",
    image: null
  },
  {
    text: "A heart is a yes/no decision. A sheet you cut yourself is an open door. The customer sees a sheet and thinks: \"I could do my pocket... my collar... my bag...\" You're not selling a product in your ad. You're selling what the customer imagines doing with it. Open-ended beats closed.",
    date: "Jun 15, 2026",
    image: null
  },
  {
    text: "Best CRO uplift? Social Proof.\n\nInstead of chasing polished websites, use raw photos, reviews, testimonials as much as you can.\n\nNothing builds more buying confidence than real social proof.",
    date: "Jun 14, 2026",
    image: null
  },
  {
    text: "Last 3 audits I did showed the same story.\n\nBrands were looking at frequency of their creatives and judging fatigue. If above 2.5 and 3, time for new creative.\n\nYet they were unable to identify why ROAS was dipping even at 1.2\u20131.4 frequency levels.\n\nHere is the answer \uD83D\uDC47",
    date: "Jun 12, 2026",
    image: null
  },
  {
    text: "Frequency is essentially average how many times a user is seeing your ad.\n\nIt doesn't show Meta's ability to find more similar converting audience.\n\nKeep an eye on CPM. If CPM is going up and ROAS down, creative is going to die soon. CPA will go up.",
    date: "Jun 12, 2026",
    image: null
  },
  {
    text: "Don't add shipping fee!\n\nIndian customers in 2026 are not happy about paying more than what they see at the Landing page/product page.\n\nAdditional GST and shipping fee at checkout is a big NO NO. Hurts conversion.",
    date: "Jun 11, 2026",
    image: null
  },
  {
    text: "CM2 = Net Revenue \u2212 COGS \u2212 Shipping costs \u2212 Marketing spend\n\nEssentially the margin you are making above overhead costs.\n\nThis is my main metric to track when I work with scaling accounts. Not ROAS.",
    date: "Jun 10, 2026",
    image: null
  },
  {
    text: "Performance Marketing in 2026 \u2260 Meta ads management\n\n4 things need to work in tandem:\n1. Creative Strategy\n2. Ads management\n3. CRO optimization\n4. Retention funnel\n\nAny agency/consultant working on less than 3 of these is fooling brands for retainer.",
    date: "Jun 9, 2026",
    image: null
  }
];
