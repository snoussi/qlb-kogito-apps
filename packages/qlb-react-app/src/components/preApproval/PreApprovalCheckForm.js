import React from "react";
import {
  Bullseye,
  Stack,
  StackItem,
  Form,
  Title,
  FormGroup,
  TextInput,
  ActionGroup,
  FormSelect,
  FormSelectOption,
  Button,
  Alert,
  AlertGroup,
  AlertVariant,
  EmptyState,
  EmptyStateVariant,
  EmptyStateBody,
  Divider,
  Card,
  CardHeader,
  CardBody,
} from "@patternfly/react-core";
import axios from "axios";

class PreApprovalCheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicantName: "",
      applicantAge: "",
      applicantMonthlyIncome: "",
      applicantCreditScore: "",
      loanAmount: "",
      loanDuration: "",
      result: "",
      rejectionReasons: [],
      interestRate: "",
      checked: false,
      isValidAge: false,
      isValidIncome: false,
      isValidCreditScore: false,
      isValidAmount: false,
      isValidDuration: false,
    };
    this.handleApplicantName = (applicantName) => {
      this.setState({ applicantName });
    };
    this.handleApplicantAge = (applicantAge) => {
      this.setState({
        applicantAge: Number(applicantAge),
        isValidAge: /^([1-9][0-9]*)/.test(applicantAge),
      });
    };
    this.handleApplicantMonthlyIncome = (applicantMonthlyIncome) => {
      this.setState({
        applicantMonthlyIncome: Number(applicantMonthlyIncome),
        isValidIncome: /^([1-9][0-9]*)/.test(applicantMonthlyIncome),
      });
    };
    this.handleApplicantCreditScore = (applicantCreditScore) => {
      this.setState({
        applicantCreditScore: Number(applicantCreditScore),
        isValidCreditScore: /^\d{3}$/.test(applicantCreditScore),
      });
    };
    this.handleLoanAmount = (loanAmount) => {
      this.setState({
        loanAmount: Number(loanAmount),
        isValidAmount: /^([1-9][0-9]*)/.test(loanAmount),
      });
    };
    this.handleLoanDuration = (loanDuration) => {
      this.setState({
        loanDuration: Number(loanDuration),
        isValidDuration: loanDuration !== "",
      });
    };

    this.options = [
      { value: "", label: "Please Choose", disabled: true },
      { value: 5, label: "5 years", disabled: false },
      { value: 7, label: "7 years", disabled: false },
      { value: 10, label: "10 years", disabled: false },
      { value: 12, label: "12 years", disabled: false },
      { value: 15, label: "15 years", disabled: false },
      { value: 20, label: "20 years", disabled: false },
      { value: 25, label: "25 years", disabled: false },
    ];
    this.handleCheckPreApproval = this.handleCheckPreApproval.bind(this);
  }

  handleCheckPreApproval(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("form is invalid!!");
      return;
    }
    console.log(this.state);
    axios
      .post(`http://localhost:8081/loan-preapproval`, {
        Applicant: {
          "Monthly Income": this.state.applicantMonthlyIncome,
          "Credit Score": this.state.applicantCreditScore,
          Name: this.state.applicantName,
          Age: this.state.applicantAge,
        },
        Loan: {
          Amount: this.state.loanAmount,
          Duration: this.state.loanDuration,
        },
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data["Pre Approval"]["Rejection Reasons"]);
        this.setState({
          result: res.data["Pre Approval"].Result,
          interestRate: res.data["Interest Rate"],
          rejectionReasons: res.data["Pre Approval"]["Rejection Reasons"],
          checked: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      applicantName,
      applicantAge,
      applicantMonthlyIncome,
      applicantCreditScore,
      loanAmount,
      loanDuration,
      result,
      rejectionReasons,
      interestRate,
      checked,
      isValidAge,
      isValidIncome,
      isValidCreditScore,
      isValidAmount,
      isValidDuration,
    } = this.state;

    let alert;
    if (checked) {
      if (result) {
        var title = "Pre-approved with an interest rate of " + interestRate;
        alert = (
          <Card>
            <CardHeader>
              <Title headingLevel="h2" size="xl">
                Result
              </Title>
              <Divider />
            </CardHeader>
            <CardBody>
              <AlertGroup>
                <Alert
                  title={title}
                  variant={AlertVariant["success"]}
                  isInline
                />
              </AlertGroup>
            </CardBody>
          </Card>
        );
      } else {
        alert = (
          <Card>
            <CardHeader>
              <Title headingLevel="h2" size="xl">
                Result
              </Title>
              <Divider />
            </CardHeader>
            <CardBody>
              <AlertGroup>
                <Alert
                  title="Pre-approval failed"
                  variant={AlertVariant["danger"]}
                  isInline
                />
                {rejectionReasons.map((reason, id) => (
                  <Alert
                    key={id}
                    title={reason}
                    variant={AlertVariant["warning"]}
                    isInline
                  />
                ))}
              </AlertGroup>
            </CardBody>
          </Card>
        );
      }
    }

    return (
      <Bullseye>
        <Stack gutter="md">
          <StackItem>
            <Title headingLevel="h1" size="4xl">
              Loan Pre-Approval Check
            </Title>
          </StackItem>
          <StackItem isFilled>
            <Form isHorizontal onSubmit={this.handleCheckPreApproval}>
              <Title headingLevel="h2" size="xl">
                Applicant
              </Title>
              <Divider />
              <FormGroup
                label="Name"
                fieldId="form-name"
                helperText="Please provide your full name"
              >
                <TextInput
                  type="text"
                  id="form-name"
                  value={applicantName}
                  onChange={this.handleApplicantName}
                />
              </FormGroup>

              <FormGroup
                label="Age"
                type="number"
                helperTextInvalid="Age has to be a number"
                isRequired
                fieldId="form-age"
                validated={isValidAge ? "default" : "error"}
              >
                <TextInput
                  isRequired
                  type="number"
                  id="form-age"
                  value={applicantAge}
                  maxLength="3"
                  validated={isValidAge ? "default" : "error"}
                  onChange={this.handleApplicantAge}
                />
              </FormGroup>

              <FormGroup
                label="Monthly Income"
                helperTextInvalid="Income has to be a number"
                isRequired
                fieldId="form-income"
                validated={isValidIncome ? "default" : "error"}
              >
                <TextInput
                  isRequired
                  type="number"
                  id="form-income"
                  value={applicantMonthlyIncome}
                  validated={isValidIncome ? "default" : "error"}
                  onChange={this.handleApplicantMonthlyIncome}
                />
              </FormGroup>

              <FormGroup
                label="Credit Score"
                helperTextInvalid="Credit Score is invalid"
                isRequired
                fieldId="form-score"
                validated={isValidCreditScore ? "default" : "error"}
              >
                <TextInput
                  isRequired
                  type="number"
                  id="form-score"
                  placeholder="Example, 765"
                  value={applicantCreditScore}
                  validated={isValidCreditScore ? "default" : "error"}
                  onChange={this.handleApplicantCreditScore}
                />
              </FormGroup>

              <Title headingLevel="h2" size="xl">
                Loan
              </Title>
              <Divider />
              <FormGroup
                label="Amount"
                helperTextInvalid="Amount has to be a number"
                isRequired
                fieldId="form-amount"
                validated={isValidAmount ? "default" : "error"}
              >
                <TextInput
                  isRequired
                  type="number"
                  id="form-amount"
                  value={loanAmount}
                  validated={isValidAmount ? "default" : "error"}
                  onChange={this.handleLoanAmount}
                />
              </FormGroup>

              <FormGroup
                label="Duration"
                helperTextInvalid="Select a duration"
                isRequired
                fieldId="form-duration"
                validated={isValidDuration ? "default" : "error"}
              >
                <FormSelect
                  value={loanDuration}
                  onChange={this.handleLoanDuration}
                  id="form-duration"
                  validated={isValidDuration ? "default" : "error"}
                >
                  {this.options.map((option, index) => (
                    <FormSelectOption
                      isDisabled={option.disabled}
                      key={index}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </FormSelect>
              </FormGroup>

              <ActionGroup>
                <Button isBlock variant="primary" type="submit">
                  Check
                </Button>
              </ActionGroup>
            </Form>
          </StackItem>
          <StackItem isFilled>{alert}</StackItem>
          <StackItem>
            <EmptyState variant={EmptyStateVariant.full}>
              <EmptyStateBody>QLB Bank Demo</EmptyStateBody>
            </EmptyState>
          </StackItem>
        </Stack>
      </Bullseye>
    );
  }
}

export default PreApprovalCheckForm;
