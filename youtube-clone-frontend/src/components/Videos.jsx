import { Box, Stack } from '@mui/material';
import React from 'react';
import {VideoCard, ChannelCard } from './';

const Videos = ( { videos, direction } ) => {

  if (videos === null || !Array.isArray(videos)) {
    return <div>No videos available.</div>;
  } 

  return (
    <Stack
    direction={ direction || "row"} flexWrap="wrap"
    justifyContent="center" gap={2}
    sx={{overflowY:"auto"}}>
        {videos.map((item, idx) => (
            <Box key={idx}>
                {item.id.videoId && <VideoCard video={item}/>}
                { item.id.channelId && <ChannelCard channelDetail={item} flex_Direction="column"/>}
            </Box>
        ))}
    </Stack>
  )
}

export default Videos