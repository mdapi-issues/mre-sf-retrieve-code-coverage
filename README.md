# mre-sf-retrieve-code-coverage

> Minimum Reproduction Example for this issue:
>
> [Issues retrieving code coverage for a large codebase](https://github.com/forcedotcom/cli/issues/2844)

## Reproduction

```console
sf org create scratch -f config/project-scratch-def.json -a cc -d
sf project deploy start
```

Get a stop watch.

Run `sf org open --path /one/one.app#/setup/ApexTestQueue/home`

Now start the tests

```console
sf apex run test -l RunLocalTests --output-dir test-results --wait 60 --code-coverage --dev-debug
```

Go back to the web browser and wait for the unit tests to be finished.

Then start your stop watch and wait until you get the code coverage results in your terminal.

## Obvervations

> A large codebase can easily produce 200.000 `ApexCodeCoverage` records.
>
> Querying this amount of records in batches of 2.000 records when each request takes around 20 seconds, it will take 30 minutes in total and consume a lot of RAM.

Example: The generated code here in this repository has 10.000 test methods (100 test classes per 100 test methods).

Each test method calls a layered method of 5 classes (`Layer_4.greet` -> `Layer_3.greet` -> ... -> `Layer_4.greet`).

This produces 50.000 `ApexCodeCoverage` records.

`50.000 ApexCodeCoverage / 2.000 records * 20 seconds per API call / 60 seconds ~= 8 minutes`

`50000/2000*20/60`

It will take around 8 minutes to retrieve the code coverage after the unit tests have finished.

## Real data

We have a large and apparently complex codebase with a lot of tests.

- 1.800 classes (600 of them being test classes)

After running the unit tests, I can see that this produced:

- 6.000 `ApexTestResult` records
  - `sf data query -q 'SELECT COUNT() FROM ApexTestResult'`
  - -> we have 6.000 test methods
- 250.000 `ApexCodeCoverage` records
  - `sf data query -q 'SELECT COUNT() FROM ApexCodeCoverage' -t`
  - -> in average every test method called 40 different classes?!

```

```
