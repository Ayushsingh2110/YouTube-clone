import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed, Sidebar } from './components';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from './utils/fetchFromAPI';

const App = () => {

    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState([]);
    let [ShowSidebar, setShowSidebar] = useState(true);
    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
            setVideos(data.items)
        );
    }, [selectedCategory]);

    let sidebar;
    if(ShowSidebar){
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
                <Navbar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar}/>
                <div className="homeContainer">
    
                    {sidebar}
                   
                    <Box sx={{ flex: 0.85 }}>

                        <Routes>
                            <Route path="/" exact element={<Feed videos={videos} selectedCategory={selectedCategory} setShowSidebar={setShowSidebar}/>} />
                            <Route path="/video/:id" element={<VideoDetail setShowSidebar={setShowSidebar}/>} />
                            <Route path="/channel/:id" element={<ChannelDetail />} />
                            <Route path="/search/:searchTerm" element={<SearchFeed />} />
                        </Routes>


                    </Box>

                </div>

            </Box>
        </BrowserRouter>
    )
}

export default App