import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { BottomNav, Navbar, Sidebar } from './components';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from './utils/fetchFromAPI';
import { ChannelDetail, Feed, SearchFeed, SignIn, SignUp, VideoDetail } from './pages';
import ExplorePage from './pages/Explore';


const App = () => {
    const isMobile = useMediaQuery('(max-width: 480px)');
    
    const [selectedCategory, setSelectedCategory] = useState("New");

    let [ShowSidebar, setShowSidebar] = useState(true);
    /*useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
            setVideos(data.items)
        );
    }, [selectedCategory]);*/

    let sidebar;
    if (ShowSidebar && !isMobile) {
        sidebar =
            <Box sx={{ flex: 0.15 }} >
                <Box
                    sx={{
                        height: { sx: "auto", md: "92vh" },
                    }}
                >
                    <Sidebar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </Box>
            </Box>
    }

    return (
        <BrowserRouter>
            <Box sx={{ backgroundColor: '#0f0f0f', height:"100vh", width:"100%" }}>
                <Navbar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar} />
                <div className="homeContainer">
                    <div className="sidebar_container">
                       {sidebar} 
                    </div>

                    <Box sx={{ flex: 1, height: '100%' }}>

                        <Routes>
                            <Route path="/">
                                <Route index element={<Feed type="random" />} />
                                <Route path="explore">
                                    <Route index element={<ExplorePage />}/>
                                    <Route path="trending" element={<Feed type="trending" />}/>
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

                    </Box>
                    
                </div>
                {isMobile && <BottomNav />}

            </Box>
        </BrowserRouter>
    )
}

export default App