import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Nav, NavItem} from "react-bootstrap";
import {withContentRect} from 'react-measure';

import {getTextWidth} from './utils';
import MoreButton from './MoreButton'

const propTypes = {
	setCurrentTab: PropTypes.func,
	tabsArray: PropTypes.array,
	currentTab: PropTypes.number,
	buttonText: PropTypes.string
};

const defaultProps = {
	buttonText: 'More',
	font: '14px Helvetica Neue',
	margins: 40
};

class TabsView extends Component {
	state = {
		showedTabs: [],
		hiddenTabs: [],
		currentTab: 1
	};

	render() {
		const {currentTab, measureRef, buttonText, setCurrentTab} = this.props;
		const {showedTabs, hiddenTabs} = this.state;

		return (
			<div ref={measureRef} style={{flex: 1}}>
				<Nav bsStyle="tabs" activeKey="1">
					{showedTabs.map(({id, name}) => (
						<NavItem onClick={(e) => {
							e.currentTarget.blur();
							this.setCurrentTab(id)
						}}
								 key={id}
								 active={id === currentTab}
								 eventKey={id}
								 href="#">
							{name}
						</NavItem>
					))}

					<MoreButton
						hiddenTabs={hiddenTabs}
						buttonText={buttonText}
						setCurrentTab={setCurrentTab}
						currentTab={currentTab}
					/>
				</Nav>
			</div>
		);
	}

	componentDidMount() {
		this.hideTabs();
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.contentRect.bounds.width !== this.props.contentRect.bounds.width ||
			prevProps.tabsArray.length !== this.props.tabsArray.length
		) {
			this.hideTabs();
		}
	}

	hideTabs = () => {
		const {
			contentRect: {bounds},
			tabsArray,
			font,
			buttonText,
			margins
		} = this.props;
		const hiddenTabs = [];

		const moreButtonWidth = getTextWidth(buttonText, font) + margins;
		let tabsWidth = 0 + moreButtonWidth;

		const showedTabs = tabsArray.filter(tab => {
			tabsWidth = tabsWidth + getTextWidth(tab.name, font) + margins;
			const tabFits = tabsWidth < bounds.width;
			if (!tabFits) {
				hiddenTabs.push(tab);
			}
			return tabFits;
		});

		this.setState({
			showedTabs,
			hiddenTabs
		});
	};

	setCurrentTab = (tabId) => {
		this.setState({currentTab: tabId})
	};

}


TabsView.propTypes = propTypes;
TabsView.defaultProps = defaultProps;


export default withContentRect('bounds')(TabsView);
