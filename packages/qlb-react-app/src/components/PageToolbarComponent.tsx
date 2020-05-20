import React from 'react';
import {
    Dropdown,
    DropdownToggle,
    Toolbar,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import { css } from '@patternfly/react-styles';

const PageToolbarComponent: React.FunctionComponent = () => {
    let userName = 'Anonymous';

    return (
        <React.Fragment>
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarItem
                        className={css(
                            accessibleStyles.screenReader,
                            accessibleStyles.visibleOnMd
                        )}
                    >
                        <Dropdown
                            isPlain
                            position="right"
                            toggle={
                                <DropdownToggle>
                                    {userName}
                                </DropdownToggle>
                            }
                        />
                    </ToolbarItem>
                </ToolbarGroup>
            </Toolbar>
        </React.Fragment>
    );
};

export default PageToolbarComponent;