# Quick Loan Bank Apps - demo

## Description

This demo showcases [Kogito](https://kogito.kie.org/) and [Quarkus](https://quarkus.io/) feautres for Cloud Native Business Automation Applications.

## Quick start

```bash
# Build Projects
mvn package

# Start pre-approval dmn decision service
java -jar  qlb-loan-preapproval-dmn/target/qlb-loan-preapproval-dmn-1.0-runner.jar

# In another console, start the QLB UI
java -jar  qlb-ui/target/qlb-ui-1.0-runner.jar
```

Open [http://localhost:8082](http://localhost:8082) to view it in the browser.

![QLB home](qlb-ui/docs/qlb-ui-home.png)

![QLB pre-approval](qlb-ui/docs/qlb-ui-preapproval.png)

## Openshift deployment

### Prerequisites

- The RHPAM Kogito Operator is installed in a new project
- The `oc` OpenShift CLI is installed and you are logged in to the relevant OpenShift cluster. For oc installation and login instructions, see the OpenShift documentation.
- You have access to the OpenShift web console with the necessary permissions to create and edit `KogitoBuild` and `KogitoRuntime`.

```bash
# Build all projects
mvn package

# Create KogitoBuilds and KogitoRuntime for a binary deployment
oc create -f qlb-loan-preapproval-dmn/operator/qlb-loan-preapproval-dmn.yml

# Upload the built binary using the following command
oc start-build qlb-loan-preapproval-dmn --from-dir=qlb-loan-preapproval-dmn/target/

# Wait for the pods to be up & running, then locate the service route using this command
echo http://$(oc get route qlb-loan-preapproval-dmn --template='{{ .spec.host }}')/swagger-ui
```

> [!TIP]
> For detailed instructions on how to deploy and run this demo, please check the instructions available with each module
