# Quick Loan Bank - Loan Pre-Approval DMN on Kogito Decision Service

DMN implementation of qlb loan application demo.
Demonstrates DMN on Kogito capabilities, including REST interface code generation.

## Decision Service definition

![DMN model](docs/loan-preapproval_dmn.png)

## Installing and Running

### Prerequisites

You will need:

- Java 11+ installed
- Environment variable JAVA_HOME set accordingly
- Maven 3.6.2+ installed

When using native image compilation, you will also need:

- [GraalVM 19.3.1](https://github.com/oracle/graal/releases/tag/vm-19.3.1) installed
- Environment variable GRAALVM_HOME set accordingly
- Note that GraalVM native image compilation typically requires other packages (glibc-devel, zlib-devel and gcc) to be installed too. You also need 'native-image' installed in GraalVM (using 'gu install native-image'). Please refer to [GraalVM installation documentation](https://www.graalvm.org/docs/reference-manual/aot-compilation/#prerequisites) for more details.

### Compile and Run in Local Dev Mode

```
mvn clean compile quarkus:dev
```

### Package and Run in JVM mode

```
mvn clean package
java -jar target/kjt-qlb-loan-preapproval-dmn-1.0-runner.jar
```

or on Windows

```
mvn clean package
java -jar target\kjt-qlb-loan-preapproval-dmn-1.0-runner.jar
```

### Package and Run using Local Native Image

Note that this requires GRAALVM_HOME to point to a valid GraalVM installation

```
mvn clean package -Pnative
```

To run the generated native executable, generated in `target/`, execute

```
./target/kjt-qlb-loan-preapproval-dmn-1.0-runner
```

Note: This does not yet work on Windows, GraalVM and Quarkus should be rolling out support for Windows soon.

## OpenAPI (Swagger) documentation

The exposed service [OpenAPI specification](https://swagger.io/docs/specification) is generated at
[/docs/openapi.json](http://localhost:8081/docs/openapi.json).

You can visualize and interact with the generated specification using the embbeded [Swagger UI](http://localhost:8081/swagger-ui) or importing the generated specification file on [Swagger Editor](https://editor.swagger.io).

In addition client application can be easily generated from the swagger definition to interact with this service.

## Demo Usage

Once the service is up and running, you can use the following example to interact with the service.

### POST /loan-preapproval

Returns check QLB loan pre-approval

Given inputs:

```json
{
  "Applicant": {
    "Monthly Income": 4000,
    "Credit Score": 300,
    "Name": "Lucien Bramard",
    "Age": 16
  },
  "Loan": {
    "Amount": 300000,
    "Duration": 20
  }
}
```

Curl command (using the JSON object above):

```sh
curl -X POST "http://localhost:8081/loan-preapproval" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"Applicant\":{\"Monthly Income\":4000,\"Credit Score\":300,\"Name\":\"Lucien Bramard\",\"Age\":16},\"Loan\":{\"Amount\":300000,\"Duration\":20}}"
```

or on Windows:

```sh
curl -X POST "http://localhost:8081/loan-preapproval" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"Applicant\":{\"Monthly Income\":4000,\"Credit Score\":300,\"Name\":\"Lucien Bramard\",\"Age\":16},\"Loan\":{\"Amount\":300000,\"Duration\":20}}"
```

As response, pre-approval result is returned.

Example response:

```json
{
  "Pre Approval": {
    "Rejection Reasons": [
      "Non eligible age",
      "High debt ratio (31.68%)",
      "Insufficient credit score (min required is 500)"
    ],
    "Result": false
  },
  "Interest Rate": 1.39,
  "Loan": {
    "Amount": 300000,
    "Duration": 20
  },
  "Debt Ratio": "function Debt Ratio( loanAmount, loanDuration, interestRate, monthlyIncome )",
  "Applicant": {
    "Monthly Income": 4000,
    "Age": 16,
    "Credit Score": 300,
    "Name": "Lucien Bramard"
  }
}
```
