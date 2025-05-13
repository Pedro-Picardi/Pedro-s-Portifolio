interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    title: "App Aya",
    description: "Mobile-first application for Yoga and Ayurveda practice and guides guided by Nayara Lofgren.",
    image: "/assets/logos/app_aya.avif",
    tags: ["Flutter", "RevenueCat", "Firebase", "OneSignal"],
    liveUrl: "https://caminhoaya.com"
  },
  {
    title: "Yangflow LLC",
    description: "Venture Builder Company that offers a full working team and strategy to build your business.",
    image: "/assets/logos/yangflow.svg",
    tags: ["N8N", "Firebase", "Supabase", "Webflow", "Shopify"],
    liveUrl: "https://yangflow.us"
  },
  {
    title: "Venator",
    description: "International American E-commerce platform that seels a wide range of products from the USA to Europe and China.",
    image: "/assets/logos/venator.webp",
    tags: ["Automations", "Stripe", "Shopify", "P2P"],
    liveUrl: "https://venatorcommerce.com"
  },
  {
    title: "Sintropio",
    description: "A Software House driven by a team of developers with a passion for creating innovative solutions.",
    image: "/assets/logos/sintropio.png",
    tags: ["IoT", "React", "Node.js", "Webflow", "Shopify"],
    liveUrl: "https://sintrop-io.webflow.io/"
  }
];

export type { Project }; 