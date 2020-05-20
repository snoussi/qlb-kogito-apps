import * as React from 'react';
import { PageSection } from '@patternfly/react-core';
import PreApprovalCheckForm from './PreApprovalCheckForm';
const PreApproval: React.FunctionComponent<{}> = () => (
  <PageSection>
    <PreApprovalCheckForm/>
  </PageSection>
)

export { PreApproval };