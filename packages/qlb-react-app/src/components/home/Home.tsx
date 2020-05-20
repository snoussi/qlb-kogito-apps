import * as React from 'react';
import {Brand, Bullseye, PageSection} from '@patternfly/react-core';
import qlbLogo from '../../static/qlb_logo_w.png';

const Home: React.FunctionComponent<{}> = () => (
    <PageSection>
        <Bullseye>
            <Brand src={qlbLogo} alt="Quick Loan Bank"/>
        </Bullseye>
    </PageSection>
)

export {Home};