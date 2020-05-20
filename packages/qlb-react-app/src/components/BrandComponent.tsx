import React from 'react';
import { Brand } from '@patternfly/react-core';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import qlbLogo from '../static/qlb_logo.png';

const BrandComponent: React.FC<RouteComponentProps> = ({ history }) => {
    const onLogoClick = () => {
        history.push('/');
    };
    return (
        <Brand
            src={qlbLogo}
            alt="Quick Loan Bank Logo"
            onClick={onLogoClick}
        />
    );
};

export default withRouter(BrandComponent);