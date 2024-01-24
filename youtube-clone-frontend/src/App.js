import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { BottomNav, Navbar, Sidebar } from './components';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from './utils/fetchFromAPI';
import { ChannelDetail, Feed, SearchFeed, SignIn, SignUp, VideoDetail } from './pages';
import ExplorePage from './pages/Explore';
import { Offline, Online } from "react-detect-offline";
import { NoConnection } from './utility_pages';

const App = () => {
    const isMobile = useMediaQuery('(max-width: 480px)');

    const [selectedCategory, setSelectedCategory] = useState("New");

    const [ShowSidebar, setShowSidebar] = useState(false);

    return (
        <BrowserRouter>
            <Box sx={{ backgroundColor: '#0f0f0f', height: "100vh", width: "100%" }}>
                <Navbar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar} />
                {ShowSidebar && !isMobile && (
                    <div className="sidebar_container">
                        <Sidebar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                )

                }
                <div className="homeContainer">
                    <Box sx={{ flex: 1, height: '100%' }}>
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
                {isMobile && <BottomNav />}

            </Box>
        </BrowserRouter>
    )
}

export default App