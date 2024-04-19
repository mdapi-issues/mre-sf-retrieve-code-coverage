#!/usr/bin/env bash
set -eo pipefail

export SF_ORG_MAX_QUERY_LIMIT="100000"

mkdir -p .tmp

until sf data query -q "SELECT COUNT() FROM ApexTestRunResult" | grep "Total number of records retrieved: 0."; do
    sf data query -q "SELECT Id FROM ApexTestRunResult" -r csv > .tmp/ApexTestRunResult.csv
    sf data bulk delete -s ApexTestRunResult -f .tmp/ApexTestRunResult.csv
done

until sf data query -q "SELECT COUNT() FROM ApexTestResult" | grep "Total number of records retrieved: 0."; do
    sf data query -q "SELECT Id FROM ApexTestResult" -r csv > .tmp/ApexTestResult.csv
    sf data bulk delete -s ApexTestResult -f .tmp/ApexTestResult.csv
done
