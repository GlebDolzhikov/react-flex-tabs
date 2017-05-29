import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";

const propTypes = {
    setCurrentTab: PropTypes.func,
    tabsArray: PropTypes.array,
    currentTab: PropTypes.number
};

const defaultProps = {};

class TabsView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showedTabs: [],
            hiddenTabs: []
        };
    }

    setCurrentTab = (tabId)=>{
        this.setState({currentTab: tabId})
    };

    render() {
        const setCurrentTab = this.props.setCurrentTab || this.setCurrentTab;
        const currentTab = this.props.currentTab || this.state.currentTab;

        return (
            <Nav bsStyle="tabs" activeKey="1">
                {this.state.showedTabs.map((tab, index) => (
                    <NavItem onClick={() => setCurrentTab(tab.id)}
                             key={index}
                             active={tab.id == currentTab}
                             eventKey={index}
                             href="#">
                        {tab.name}
                    </NavItem>
                ))}

                {this.state.hiddenTabs.length > 0 &&
                <NavDropdown id='nav-dropdown' title="More" key={1} pullRight={true}>
                    {this.state.hiddenTabs.map((tab, index) => (
                        <MenuItem
                            onClick={() => setCurrentTab(tab.id)}
                            eventKey={index}
                            active={tab.id == currentTab}
                            key={index}>
                            {tab.name}
                        </MenuItem>
                    ))}
                </NavDropdown>
                }
            </Nav>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.rerenderMe !== this.state.rerenderMe){ // refresh tabs in state from props in case of if width of screen became bigger
            this.setState({
                showedTabs: this.props.tabsArray,
                hiddenTabs: []
            })
        }
        hideTabs(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tabsArray && this.props.tabsArray.length < nextProps.tabsArray.length){
            this.setState({
                showedTabs: nextProps.tabsArray,
                hiddenTabs: []
            })
        }
    }

    componentWillMount(nextProps){
        this.setState({
            showedTabs: this.props.tabsArray,
            hiddenTabs: []
        })
    }

    fireRerender = () => {
        this.setState({
            rerenderMe: Date.now()
        });
    };

    componentDidMount() {
        hideTabs(this);
        window.addEventListener("resize", this.fireRerender);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.fireRerender);
    }
}

function hideTabs (component){
    const navTabs = document.getElementsByClassName('nav-tabs')[0];
    const tabElement = navTabs.childNodes[0];
    const doubleHeight = (tabElement.offsetHeight*2) - 3; // bootstrap margin
    if(navTabs.clientHeight > doubleHeight) { // check if tabs goes in two rows...
        const hiddenTabs = component.state.hiddenTabs;
        const showedTabs = component.state.showedTabs.slice(0, -1);
        hiddenTabs.push(component.state.showedTabs[component.state.showedTabs.length - 1]);
        component.setState({showedTabs, hiddenTabs})
    }
}

TabsView.propTypes = propTypes;
TabsView.defaultProps = defaultProps;

export default TabsView;
