const fs = require('fs');
const path = require('path');

const routes = [
  // Hub Suite
  { path: 'lgbtq-hub', component: '@/features/pride/hub/LGBTQSelfCare' },
  { path: 'menu', component: '@/features/pride/hub/LGBTQSelfCare' }, // Index -> menu
  { path: 'lgbtq-tips', component: '@/features/pride/hub/LGBTQTips' },
  { path: 'lgbtq-myths-facts', component: '@/features/pride/hub/LGBTQMythsFacts' },
  { path: 'lgbtq-myth/[mythId]', component: '@/features/pride/hub/LGBTQMythDetail' },
  { path: 'lgbtq-articles', component: '@/features/pride/hub/LGBTQArticles' },
  { path: 'lgbtq-article/[articleId]', component: '@/features/pride/hub/LGBTQArticleDetail' },
  { path: 'lesbian-guide', component: '@/features/pride/hub/LesbianGuide' },
  { path: 'gay-guide', component: '@/features/pride/hub/GayGuide' },
  { path: 'bisexual-guide', component: '@/features/pride/hub/BisexualGuide' },
  { path: 'trans-guide', component: '@/features/pride/hub/TransGuide' },
  { path: 'lgbtq-assessments', component: '@/features/pride/hub/LGBTQAssessments' },
  { path: 'find-your-community', component: '@/features/pride/hub/FindYourCommunity' },
  { path: 'set-gentle-boundaries', component: '@/features/pride/hub/SetGentleBoundaries' },
  { path: 'honor-your-identity', component: '@/features/pride/hub/HonorYourIdentity' },
  { path: 'affirming-self-talk', component: '@/features/pride/hub/AffirmingSelfTalk' },
  { path: 'create-safe-spaces', component: '@/features/pride/hub/CreateSafeSpaces' },
  { path: 'process-grief-loss', component: '@/features/pride/hub/ProcessGriefLoss' },

  // Dynamic Minis
  { path: 'find-your-right-time', component: '@/features/pride/dynamic/find-your-right-time' },
  { path: 'gentle-check-in', component: '@/features/pride/dynamic/gentle-check-in' },
  { path: 'identity-exploration', component: '@/features/pride/dynamic/identity-exploration' },
  { path: 'identity-reflection', component: '@/features/pride/dynamic/identity-reflection' },
  { path: 'identity-journey', component: '@/features/pride/dynamic/identity-journey' },
  { path: 'pride-journal', component: '@/features/pride/dynamic/pride-journal' },
  { path: 'pride-mirror-moments', component: '@/features/pride/dynamic/pride-mirror-moments' },
  { path: 'pride-spectrum', component: '@/features/pride/dynamic/pride-spectrum' },

  // Static Minis
  { path: 'bi-identity-affirmations', component: '@/features/pride/static/bi-identity-affirmations' },
  { path: 'bi-family-friends-convo', component: '@/features/pride/static/bi-family-friends-convo' },
  { path: 'bisexual-stories', component: '@/features/pride/static/bisexual-stories' },
  { path: 'bi-mental-health', component: '@/features/pride/static/bi-mental-health' },
  { path: 'bi-coming-out', component: '@/features/pride/static/bi-coming-out' },
  { path: 'dealing-with-dysphoria', component: '@/features/pride/static/dealing-with-dysphoria' },
  { path: 'joy-pride-trans', component: '@/features/pride/static/joy-pride-trans' },
  { path: 'medical-transition', component: '@/features/pride/static/medical-transition' },
  { path: 'trans-and-mental-health', component: '@/features/pride/static/trans-and-mental-health' },
  { path: 'trans-coming-out', component: '@/features/pride/static/trans-coming-out' },
  { path: 'content/lgbtq-stories', component: '@/features/pride/static/lgbtq-stories' },
  
  // Trackers
  { path: 'trackers/daily-care', component: '@/features/pride/trackers/DailyCareTracker' },
  { path: 'trackers/mood', component: '@/features/pride/trackers/MoodTracker' },
  { path: 'trackers/sleep', component: '@/features/pride/trackers/SleepTracker' },
  { path: 'trackers/gratitude', component: '@/features/pride/trackers/GratitudeTracker' },
  { path: 'trackers/vibe', component: '@/features/pride/trackers/VibeTracker' },
  { path: 'db-setup', component: '@/features/pride/trackers/DbSetup' }
];

const appDir = path.join(__dirname, 'src', 'app', 'pride');

routes.forEach(route => {
  const routeDir = path.join(appDir, route.path);
  fs.mkdirSync(routeDir, { recursive: true });

  const componentNameMatch = route.component.match(/\/([^\/]+)$/);
  const componentName = componentNameMatch ? componentNameMatch[1].replace(/[^a-zA-Z0-9]/g, '') : 'Component';

  const isDynamic = route.path.includes('[');

  let pageContent = `"use client";

import Component from '${route.component}';

export default function Page(${isDynamic ? '{ params }: { params: any }' : ''}) {
  return <Component />;
}
`;
  
  fs.writeFileSync(path.join(routeDir, 'page.tsx'), pageContent);
  console.log('Created route:', route.path);
});

// Create the dynamic static viewer route
const slugDir = path.join(appDir, 'content', '[slug]');
fs.mkdirSync(slugDir, { recursive: true });
const slugContent = `"use client";

import { PrideStaticViewer } from '@/features/pride/components/PrideStaticViewer';

export default function Page() {
  return <PrideStaticViewer />;
}
`;
fs.writeFileSync(path.join(slugDir, 'page.tsx'), slugContent);
console.log('Created route: content/[slug]');
