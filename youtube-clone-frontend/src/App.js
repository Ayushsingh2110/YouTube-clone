import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { BottomNav, Navbar, Sidebar } from './components';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from './utils/fetchFromAPI';
import { ChannelDetail, Feed, SearchFeed, SignIn, SignUp, VideoDetail } from './pages';


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
    if (ShowSidebar) {
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
            <Box sx={{ backgroundColor: '#0f0f0f' }}>
                <Navbar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar} />
                <div className="homeContainer">

                    {sidebar}

                    <Box sx={{ flex: 0.85 }}>

                        <Routes>
                            <Route path="/">
                                <Route index element={<Feed type="random" />} />
                                <Route path="trends" element={<Feed type="trend" />} />
                                <Route path="subscriptions" element={<Feed type="sub" />} />
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