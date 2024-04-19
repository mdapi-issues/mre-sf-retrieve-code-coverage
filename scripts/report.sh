#!/usr/bin/env bash
set -eo pipefail
set -x

sf data query -q "SELECT Id, CreatedDate, AsyncApexJobId FROM ApexTestRunResult"
sf data query -q "SELECT COUNT() FROM ApexTestResult"
sf data query -q "SELECT COUNT() FROM ApexCodeCoverage" -t
sf data query -q "SELECT COUNT() FROM ApexCodeCoverageAggregate" -t
