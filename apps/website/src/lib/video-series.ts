export type VideoStatus = "ready" | "in-production" | "planned";

export type VideoEpisode = {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  industry:
    | "Business"
    | "Restaurants"
    | "Hotels"
    | "Real Estate"
    | "Car Rental"
    | "Operations";
  summary: string;
  hook: string;
  duration: string;
  status: VideoStatus;
  youtubeId?: string;
  youtubeUrl?: string;
  shortId?: string;
  shortUrl?: string;
};

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@InnovationByAttaf";
export const WHATSAPP_URL = "https://wa.me/59995230683";

export function getYouTubeThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export const VIDEO_EPISODES: readonly VideoEpisode[] = [
  {
    number: 1,
    slug: "practical-ai-curacao-business",
    title: "Practical AI for Caribbean Businesses | Start Small, Save Time",
    shortTitle: "AI for real business",
    industry: "Business",
    summary:
      "Three useful ways AI can support everyday work without removing human approval.",
    hook: "AI should save your team time—not create more confusion.",
    duration: "4:58",
    status: "ready",
    youtubeId: "26vz2tGKAlk",
    youtubeUrl: "https://youtu.be/26vz2tGKAlk",
  },
  {
    number: 2,
    slug: "repetitive-tasks-caribbean-business",
    title: "Five Repetitive Tasks Caribbean Businesses Can Automate",
    shortTitle: "Stop doing this manually",
    industry: "Business",
    summary:
      "A practical review of repeat work that may be ready for an AI-assisted workflow.",
    hook: "If your team repeats it every day, it may be ready for a better workflow.",
    duration: "5:00",
    status: "ready",
    youtubeId: "mkIj0Ulnf9g",
    youtubeUrl: "https://youtu.be/mkIj0Ulnf9g",
  },
  {
    number: 3,
    slug: "simple-ai-discovery-workflow",
    title: "Build a Simple AI Discovery Workflow",
    shortTitle: "Find your best AI use case",
    industry: "Operations",
    summary:
      "A privacy-aware walkthrough from business problem to an owner-controlled next step.",
    hook: "The best AI project starts with one expensive business problem.",
    duration: "4:43",
    status: "ready",
    youtubeId: "-hUVW8BBq5w",
    youtubeUrl: "https://youtu.be/-hUVW8BBq5w",
  },
  {
    number: 4,
    slug: "ai-restaurant-operations",
    title: "AI for Restaurants: From Repeated Questions to Better Operations",
    shortTitle: "AI for restaurant operations",
    industry: "Restaurants",
    summary:
      "Five restaurant workflows where verified information and manager review matter.",
    hook: "The same answer should not live in five different places.",
    duration: "Full episode",
    status: "ready",
    youtubeId: "FdmVwhnunlc",
    youtubeUrl: "https://youtu.be/FdmVwhnunlc",
  },
  {
    number: 5,
    slug: "ai-hotel-guest-service",
    title: "AI for Hotels: A Better Guest-Service Workflow",
    shortTitle: "Smarter hotel service",
    industry: "Hotels",
    summary:
      "Multilingual guest support, handovers and reporting with authorized human review.",
    hook: "Fast guest service begins before the guest repeats the question.",
    duration: "Full episode",
    status: "ready",
    youtubeId: "yC_zqVd5xQQ",
    youtubeUrl: "https://youtu.be/yC_zqVd5xQQ",
    shortId: "gGNKZCbhzew",
    shortUrl: "https://youtube.com/shorts/gGNKZCbhzew",
  },
  {
    number: 6,
    slug: "ai-real-estate-inquiries",
    title: "AI for Real Estate: From Inquiry to Qualified Conversation",
    shortTitle: "Qualify property leads",
    industry: "Real Estate",
    summary:
      "Organize inquiries and follow-up without inventing availability, prices or returns.",
    hook: "More inquiries do not automatically mean better buyers.",
    duration: "4:34",
    status: "ready",
    youtubeId: "bv7iZ2SBtNw",
    youtubeUrl: "https://youtu.be/bv7iZ2SBtNw",
    shortId: "mCryDosbiI0",
    shortUrl: "https://youtube.com/shorts/mCryDosbiI0",
  },
  {
    number: 7,
    slug: "ai-car-rental-workflow",
    title: "AI for Car Rental: From Booking Inquiry to Vehicle Return",
    shortTitle: "Smarter car-rental service",
    industry: "Car Rental",
    summary:
      "Organize booking questions, renter details and vehicle-return follow-up with human approval.",
    hook: "A faster rental response should still be accurate, reviewed and controlled.",
    duration: "4:38",
    status: "ready",
    youtubeId: "ll_YpSKriXw",
    youtubeUrl: "https://youtu.be/ll_YpSKriXw",
    shortId: "Wb0OxhrVe5Y",
    shortUrl: "https://youtube.com/shorts/Wb0OxhrVe5Y",
  },
  {
    number: 8,
    slug: "notion-owner-command-center",
    title: "Turn Notion into an Owner Command Center",
    shortTitle: "Your business command center",
    industry: "Operations",
    summary:
      "Organize trusted decisions, tasks, risks, SOPs and KPIs in one operating view.",
    hook: "A dashboard is useful only when the information can be trusted.",
    duration: "4:35",
    status: "ready",
    youtubeId: "cv9IefEpplA",
    youtubeUrl: "https://youtu.be/cv9IefEpplA",
    shortId: "mdSLRDSO0Cs",
    shortUrl: "https://youtube.com/shorts/mdSLRDSO0Cs",
  },
  {
    number: 9,
    slug: "30-day-ai-plan",
    title: "Your First 30 Days with AI: 4 Simple Steps",
    shortTitle: "Your 30-day AI plan",
    industry: "Business",
    summary:
      "A four-week path to identify, prototype, test and evaluate one useful workflow.",
    hook: "Do not automate everything. Fix one workflow that matters.",
    duration: "3:41",
    status: "ready",
    youtubeId: "T9OXpXyWgh4",
    youtubeUrl: "https://youtu.be/T9OXpXyWgh4",
    shortId: "TAP4DxsZsGY",
    shortUrl: "https://youtube.com/shorts/TAP4DxsZsGY",
  },
] as const;
