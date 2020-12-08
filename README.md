# Quick Loan Bank Apps - demo

## Description

This demo showcases [Kogito](https://kogito.kie.org/) and [Quarkus](https://quarkus.io/) feautres for Cloud Native Business Automation Applications.

## Quick start

```bash
# Build Projects
mvn package

# Start pre-approval dmn decision service
java -jar  qlb-loan-preapproval-dmn/target/qlb-loan-preapproval-dmn-1.0-runner.jar

# Start QLB UI
java -jar  qlb-ui/target/qlb-ui-1.0-runner.jar
```

Open [http://localhost:8082](http://localhost:8082) to view it in the browser.

![QLB home](qlb-ui/docs/qlb-ui-home.png)

![QLB pre-approval](qlb-ui/docs/qlb-ui-preapproval.png)

> [!TIP]
> For detailed instructions on how to deploy and run this demo, please check the instructions available with each module
