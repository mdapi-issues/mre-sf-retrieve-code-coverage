#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";

const NUMBER_OF_CLASSES = parseInt(process.env.NUMBER_OF_CLASSES ?? "100");
const NUMBER_OF_TEST_METHODS = parseInt(
  process.env.NUMBER_OF_TEST_METHODS ?? "100"
);
const CLASS_NAME = process.env.CLASS_NAME ?? "Layer_4";

const APEX_CLS_META = `<?xml version="1.0" encoding="UTF-8"?>
<ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>60.0</apiVersion>
    <status>Active</status>
</ApexClass>
`;

function generateTestMethod(i = 0) {
  return `  @isTest
  static void greet_${i}() {
    System.assertEquals(${CLASS_NAME}.greet('John'), 'Hello John');
  }`;
}

function generateTestClass(i = 0, numTestMethods = 10) {
  return `@isTest
private class Test_Greeter_${i} {
${Array.from({ length: numTestMethods }, (_, i) => generateTestMethod(i)).join(
  "\n"
)}
}`;
}

mkdirSync("force-app/main/default/classes", { recursive: true });

for (let i = 0; i < NUMBER_OF_CLASSES; i++) {
  writeFileSync(
    `force-app/main/default/classes/Test_Greeter_${i}.cls`,
    generateTestClass(i, NUMBER_OF_TEST_METHODS)
  );
  writeFileSync(
    `force-app/main/default/classes/Test_Greeter_${i}.cls-meta.xml`,
    APEX_CLS_META
  );
}
