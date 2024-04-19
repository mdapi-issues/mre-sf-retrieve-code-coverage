#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";

const NUMBER_OF_CLASSES = parseInt(process.env.NUMBER_OF_CLASSES ?? "5");

const APEX_CLS_META = `<?xml version="1.0" encoding="UTF-8"?>
<ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>60.0</apiVersion>
    <status>Active</status>
</ApexClass>
`;

function generateClass(i = 0) {
  return `public class Layer_${i} {
  public static String greet(String name) {
    ${i == 0 ? `return 'Hello ' + name;` : `return Layer_${i - 1}.greet(name);`}
  }
}
`;
}

mkdirSync("force-app/main/default/classes", { recursive: true });

for (let i = 0; i < NUMBER_OF_CLASSES; i++) {
  writeFileSync(
    `force-app/main/default/classes/Layer_${i}.cls`,
    generateClass(i)
  );
  writeFileSync(
    `force-app/main/default/classes/Layer_${i}.cls-meta.xml`,
    APEX_CLS_META
  );
}
