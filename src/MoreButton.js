import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, NavDropdown} from "react-bootstrap";

const propTypes = {
	setCurrentTab: PropTypes.func,
	hiddenTabs: PropTypes.array,
	currentTab: PropTypes.number,
	buttonText: PropTypes.string
};

const MoreButton = ({hiddenTabs, buttonText, setCurrentTab, currentTab}) => {
	if (hiddenTabs.length < 1) {
		return null;
	}
	return (
		<NavDropdown id='nav-dropdown' title={buttonText} pullRight>
			{hiddenTabs.map(({id, name}) => (
				<MenuItem
					onClick={() => setCurrentTab(id)}
					eventKey={id}
					active={id === currentTab}
					key={id}>
					{name}
				</MenuItem>
			))}
		</NavDropdown>
	);
};

MoreButton.propTypes = propTypes;

export default MoreButton;