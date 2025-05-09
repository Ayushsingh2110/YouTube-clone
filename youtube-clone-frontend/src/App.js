import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { BottomNav, Navbar, Sidebar } from './components';
import { useEffect, useRef, useState } from 'react';
import { fetchFromAPI } from './utils/fetchFromAPI';
import { ChannelDetail, Feed, SearchFeed, SignIn, SignUp, VideoDetail } from './pages';
import ExplorePage from './pages/Explore';
import { Offline, Online } from "react-detect-offline";
import { NoConnection } from './utility_pages';

const App = () => {
    const isMobile = useMediaQuery('(max-width: 480px)');
    const isTab = useMediaQuery('(max-width: 768px)');

    const [selectedCategory, setSelectedCategory] = useState("New");

    let initSideBarView = isTab ? false : true; //in tab and mobile view set sidebar hidden initially otherwise show
    const [ShowSidebar, setShowSidebar] = useState(initSideBarView);

    const [MainBox_Height, setMainBoxHeight] = useState("100vh");

    useEffect(() => {
        function handleResize() {
            const homeContainerHeight = document.querySelector(".homeContainer").scrollHeight

            if (homeContainerHeight > window.innerHeight) {
                setMainBoxHeight("fit-content");
            } else {
                setMainBoxHeight("100vh");
            }
        }
        handleResize();

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <BrowserRouter>
            <Box sx={{ backgroundColor: '#0f0f0f', height: MainBox_Height, width: "100%" }} className="main-box">
                <Navbar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar} />
                <div className="main-container">
                    {!isMobile && (
                        <div className={`sidebar_container ${ShowSidebar && !isTab ? `show` : ShowSidebar && isTab ? `open` : !ShowSidebar && !isTab ? `hide` : `close`}`}>
                            <Sidebar
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                setShowSidebar={setShowSidebar}
                            />
                        </div>
                    )

                    }
                    <div className="homeContainer">
                        <Box sx={{ flex: 1, minHeight: '100vh' }}>
                            <Online>
                                <Routes>
                                    <Route path="/">
                                        <Route index element={<Feed type="random" />} />
                                        <Route path="explore">
                                            <Route index element={<ExplorePage />} />
                                            <Route path="trending" element={<Feed type="trending" />} />
                                            <Route path="music" element={<Feed type="music" />} />
                                            <Route path="movies" element={<Feed type="movies" />} />
                                            <Route path="news" element={<Feed type="news" />} />
                                        </Route>
                                        <Route path="subscriptions" element={<Feed type="subscription" />} />
                                        <Route path={selectedCategory} element={<Feed selectedCategory={selectedCategory} />} />
                                        <Route
                                            path="signin"
                                            element={false ? <Feed /> : <SignIn />}
                                        />
                                        <Route
                                            path="signup"
                                            element={false ? <Feed /> : <SignUp />}
                                        />{/*
                                <Route path="video">
                                    <Route path=":id" element={<Video />} />
                                </Route>*/}
                                    </Route>
                                    <Route path="/video/:id" element={<VideoDetail setShowSidebar={setShowSidebar} />} />
                                    <Route path="/channel/:id" element={<ChannelDetail />} />
                                    <Route path="/search/:searchTerm" element={<SearchFeed />} />
                                </Routes>
                            </Online>
                            <Offline>
                                <NoConnection />
                            </Offline>
                        </Box>

                    </div>
                </div>

                {isMobile && <BottomNav />}

            </Box>
        </BrowserRouter>
    )
}

export default App