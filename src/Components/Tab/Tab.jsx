import { useEffect, useState, useCallback, useRef } from 'react';
import './Tab.css';

const Tab = ({ data, id }) => {
    const [selectedTab, setSelectedTab] = useState(null);
    const [focusedTab, setFocusedTab] = useState(null);
    const [currentURL, setCurrentURL] = useState(window.location.href);
    const inputRef = useRef([]);
    const hostURL = currentURL && currentURL.split('#')[0];

    /* for browser back and forward button */
    useEffect(() => {
        window.onpopstate = e => {
            setCurrentURL(window.location.href);
        }
        window.onpushstate = e => {
            setCurrentURL(window.location.href);
        }
    })

    /*on right arrow click - get the next focused tab*/
    const getNextFocusedTab = useCallback(() => {
        const focusedTabIndex = data.findIndex(item => item.link === focusedTab);
        return (focusedTabIndex === data.length - 1) ? data[0] : data[focusedTabIndex + 1];
    }, [data, focusedTab]);

     /*on left arrow click - get the previous focused tab*/
    const getPrevFocusedTab = useCallback(() => {
        const focusedTabIndex = data.findIndex(item => item.link === focusedTab);
        return (focusedTabIndex === 0) ? data[data.length - 1] : data[focusedTabIndex - 1];
    }, [data, focusedTab]);

    /* handle left right arrow key press */
    const handleUserKeyPress = useCallback(event => {
        const { keyCode } = event;
        if (keyCode === 39) {//right arrow key 
            const nextTab = getNextFocusedTab();
            inputRef.current[nextTab.link].focus();
            setFocusedTab(nextTab.link);
        } else if (keyCode === 37) {//left arrow key 
            const prevTab = getPrevFocusedTab();
            inputRef.current[prevTab.link].focus();
            setFocusedTab(prevTab.link);
        }
    }, [getNextFocusedTab, getPrevFocusedTab]);

    /* set the selected tab - considering query param */
    const setSelectedCurrentTab = () => {
        const currentURL = window.location.href;
        const splittedURL = currentURL.split('#');
        const queryParam = splittedURL && splittedURL[1];
        const splittedqueryParams = queryParam.split("=");
        const selectedTabLink = splittedqueryParams[1];
        setSelectedTab(selectedTabLink);
    }

    /*handle event for key down*/
        useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    /*for the first time - show first tab as selected*/
    useEffect(() => {
        inputRef.current[data[0].link].focus();
        setCurrentURL(hostURL + `#${id}=${data[0].link}`);
        setSelectedTab(data[0].link);
        setFocusedTab(data[0].link);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* set the selected tab if current url changes */
    useEffect(() => {
        const currentURL = window.location.href;
        if (currentURL && currentURL.includes(id)) {
            setSelectedCurrentTab();
        }
    }, [currentURL, id]);

    /* set focus on change of selected tab */
    useEffect(() => {
        selectedTab && inputRef.current[selectedTab].focus();
        setFocusedTab(selectedTab);
    }, [selectedTab]);

    const updateLocationURL = (link) => {
        window.location.href = hostURL + `#${id}=${link}`;
        inputRef.current[link] && inputRef.current[link].focus();
        setFocusedTab(link);
    }

    /* hanlde tab click - by selecting tab and updating location URL*/
    const handleTabClick = (link) => {
        setSelectedTab(link);
        updateLocationURL(link);
    };

    /* display tabs*/
    const TabLinks = () => {
        return data.map((item) => {
            return <div key={`${item.link}-tabLink`} role="tablist" aria-label="States">
                <button
                    role="tab"
                    aria-selected={selectedTab === item.link}
                    aria-controls={`${item.link}+"-tab"`}
                    id={item.link}
                    ref={el => inputRef.current[item.link] = el}
                    className={`${selectedTab === item.link ? "active" : ""}`}
                    onClick={(e) => handleTabClick(item.link)}>{item.link}</button>
            </div>
        })
    }

    /* display tab panel*/
    const TabContent = () => {
        return data.map((item) => {
            return <div
                key={item.link}
                role="tabpanel"
                id={`${item.link}-tab`}
                aria-labelledby={item.link}
                className={`tabcontent ${selectedTab === item.link ? "tabContentDisplay" : "tabContentNoDisplay"}`}>
                <h3>{item.details.header}</h3>
                <p>{item.details.text}</p>
            </div>
        })
    }

    return (
        <>
            <div className="tab">{TabLinks()}</div>
            {TabContent()}

        </>
    );
}

export default Tab;
