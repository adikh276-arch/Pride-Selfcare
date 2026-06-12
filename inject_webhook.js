const fs = require('fs');
const path = require('path');

const injections = [
  {
    file: "src/features/pride/dynamic/identity-reflection/pages/Index.tsx",
    target: "await saveDynamicMiniEntry('identity_reflection_entries', userId, newConstellation);",
    replace: "await saveDynamicMiniEntry('identity_reflection_entries', userId, newConstellation);\n      triggerActivityWebhook();"
  },
  {
    file: "src/features/pride/dynamic/pride-spectrum/components/ExplorerFlow.tsx",
    target: "await saveDynamicMiniEntry('pride_spectrum_entries', userId, entry);",
    replace: "await saveDynamicMiniEntry('pride_spectrum_entries', userId, entry);\n      triggerActivityWebhook();"
  },
  {
    file: "src/features/pride/dynamic/identity-exploration/components/explore/ExploreIdentity.tsx",
    target: "await saveDynamicMiniEntry('identity_exploration_entries', userId, answers);",
    replace: "await saveDynamicMiniEntry('identity_exploration_entries', userId, answers);\n      triggerActivityWebhook();"
  },
  {
    file: "src/features/pride/dynamic/identity-journey/pages/Index.tsx",
    target: "await saveDynamicMiniEntry('identity_journey_entries', userId, { week_start: todayWeekStart, week_data: updatedToSave });",
    replace: "await saveDynamicMiniEntry('identity_journey_entries', userId, { week_start: todayWeekStart, week_data: updatedToSave });\n        triggerActivityWebhook();"
  }
];

let successCount = 0;

for (const { file, target, replace } of injections) {
  try {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${file}`);
      continue;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    if (content.includes('triggerActivityWebhook')) {
      console.log(`Already injected: ${file}`);
      continue;
    }

    if (!content.includes(target)) {
      console.warn(`Target not found in ${file}:\nTarget: ${target}`);
      continue;
    }

    // Replace the target
    content = content.replace(target, replace);

    // Add import statement at the top (after 'use client' if present)
    const importStmt = `import { triggerActivityWebhook } from "@/lib/webhook";\n`;
    if (content.startsWith('"use client";') || content.startsWith("'use client';")) {
      content = content.replace(/^(["']use client["'];?\s*)/, `$1\n${importStmt}`);
    } else {
      content = `${importStmt}${content}`;
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Successfully injected into ${file}`);
    successCount++;
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
  }
}

console.log(`\nFinished! Injected webhook into ${successCount} files.`);
