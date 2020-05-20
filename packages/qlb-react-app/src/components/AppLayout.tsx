import * as React from 'react';
import {NavLink, Route, RouteComponentProps, Switch} from 'react-router-dom';
import {
    Nav,
    NavList,
    NavItem,
    NavVariants,
    Page,
    PageHeader,
    PageSidebar,
    SkipToContent
} from '@patternfly/react-core';
import BrandComponent from './BrandComponent';
import PageToolbarComponent from './PageToolbarComponent';
import {useDocumentTitle} from "./utils/useDocumentTitle";
import {NotFound} from "./notFound/NotFound";
import {Home} from "./home/Home";
import {PreApproval} from "./preApproval/PreApproval";

export interface IAppRoute {
    label?: string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    exact?: boolean;
    path: string;
    title: string;
    isAsync?: boolean;
}

const routes: IAppRoute[] = [
    {
        component: Home,
        exact: true,
        label: 'Home',
        path: '/',
        title: 'Quick Loan Bank | Home'
    },
    {
        component: PreApproval,
        exact: true,
        isAsync: true,
        label: 'Pre-approval',
        path: '/pre-approval',
        title: 'Quick Loan Bank | Pre-approval'
    }
];


const AppLayout: React.FC<{}> = (props: any) => {
    const logoProps = {
        href: '/',
        target: '_blank'
    };
    const [isNavOpen, setIsNavOpen] = React.useState(true);
    const [isMobileView, setIsMobileView] = React.useState(true);
    const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
    const onNavToggleMobile = () => {
        setIsNavOpenMobile(!isNavOpenMobile);
    };
    const onNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    }
    const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
        setIsMobileView(props.mobileView);
    };
    const Header = (
        <PageHeader
            logo={<BrandComponent />}
            logoProps={logoProps}
            toolbar={<PageToolbarComponent />}
            showNavToggle
            isNavOpen={isNavOpen}
            onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
        />
    );

    const Navigation = (
        <Nav id="nav-primary-simple" theme="dark">
            <NavList id="nav-list-simple" variant={NavVariants.default}>
                {routes.map((route, idx) => route.label && (
                    <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
                        <NavLink exact to={route.path} activeClassName="pf-m-current">{route.label}</NavLink>
                    </NavItem>
                ))}
            </NavList>
        </Nav>
    );
    const Sidebar = (
        <PageSidebar
            theme="dark"
            nav={Navigation}
            isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
    );
    const PageSkipToContent = (
        <SkipToContent href="#primary-app-container">
            Skip to Content
        </SkipToContent>
    );
    const PageNotFound = ({ title }: { title: string }) => {
        useDocumentTitle(title);
        return <Route component={NotFound} />;
    };
    return (
        <Page
            mainContainerId="primary-app-container"
            header={Header}
            sidebar={Sidebar}
            onPageResize={onPageResize}
            skipToContent={PageSkipToContent}>
            <Switch>
                {routes.map(({ path, exact, component, title, isAsync }, idx) => (
                    <Route
                        path={path}
                        exact={exact}
                        component={component}
                        key={idx}
                        title={title}
                    />
                ))}
                <PageNotFound title="404 Page Not Found" />
            </Switch>
        </Page>
    );
}

export { AppLayout };