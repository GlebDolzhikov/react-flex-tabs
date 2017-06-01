import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";

const propTypes = {
    setCurrentTab: PropTypes.func,
    tabsArray: PropTypes.array,
    currentTab: PropTypes.number,
    buttonText: PropTypes.string
};

const defaultProps = {
    buttonText: 'More'
};

class TabsView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showedTabs: [],
            hiddenTabs: [],
            currentTab: 1
        };
    }

    handlingTabKey = (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
            const {tabsArray} = this.props;
            const setCurrentTab = this.props.setCurrentTab || this.setCurrentTab;
            const currentTab = this.props.currentTab || this.state.currentTab;

            let currentIndex = 0;
            tabsArray.forEach((tab, index) => {
                if (tab.id === currentTab) {
                    currentIndex = index;
                }
            });

            const nextTabId = getNextTabId(currentIndex, tabsArray);
            setCurrentTab(nextTabId)
        }
    };

    setCurrentTab = (tabId)=>{
        this.setState({currentTab: tabId})
    };

    render() {
        const setCurrentTab = this.props.setCurrentTab || this.setCurrentTab;
        const currentTab = this.props.currentTab || this.state.currentTab;

        return (
            <Nav bsStyle="tabs" activeKey="1">
                {this.state.showedTabs.map((tab, index) => (
                    <NavItem onClick={(e) => {
                                e.currentTarget.blur();
                                setCurrentTab(tab.id)
                             }}
                             key={index}
                             active={tab.id == currentTab}
                             eventKey={index}
                             href="#">
                        {tab.name}
                    </NavItem>
                ))}

                {this.state.hiddenTabs.length > 0 &&
                <NavDropdown id='nav-dropdown' title={this.props.buttonText} key={1} pullRight={true}>
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

    componentWillMount(){
        document.addEventListener("keydown", this.handlingTabKey, false);
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
        document.removeEventListener("keydown", this.handlingTabKey, false);
    }
}

function hideTabs (component){
    const navTabs = document.getElementsByClassName('nav-tabs')[0];
    const tabElement = navTabs.childNodes[0];
    const doubleHeight = tabElement ? (tabElement.offsetHeight*2) - 3 : 80; // bootstrap margin
    if(navTabs.clientHeight > doubleHeight) { // check if tabs goes in two rows...
        const hiddenTabs = component.state.hiddenTabs;
        const showedTabs = component.state.showedTabs.slice(0, -1);
        hiddenTabs.unshift(component.state.showedTabs[component.state.showedTabs.length - 1]);
        component.setState({showedTabs, hiddenTabs})
    }
}

function getNextTabId(i, arr) {
    i = i + 1;
    i = i % arr.length;
    return arr[i].id;
}


TabsView.propTypes = propTypes;
TabsView.defaultProps = defaultProps;

export default TabsView;
