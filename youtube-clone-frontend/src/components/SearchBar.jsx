import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Input, Search } from '@mui/icons-material';

const SearchBar = ({ searchTerm, setSearchterm}) => {

  const navigate = useNavigate();

  //const [searchTerm, setSearchterm] = useState()

  const submitSearch = (e) => {
    e.preventDefault();

    if(searchTerm){
      navigate(`/search/${searchTerm}`);

      setSearchterm('');
    }
  }
  return (
    <>
    <Paper
    component="form"
    onSubmit={submitSearch}
    className="searchForm"
    sx={{
        borderRadius: '2rem',
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        display: 'flex',
        alignContent: "center",
        height: '30px',
        mr: { sm: 5 },
        background: "slate"
    }}
    >
        <input
        className="search-bar"
        placeholder="Search YouTube clone"
        value={searchTerm}
        onChange={(e) => { setSearchterm(e.target.value)}}/>
        <IconButton
        type="submit"
        sx={{p: {xs:'3px',md:'10px'}}}>
            <Search />
        </IconButton>
        
    </Paper>
    
    </>
    
  )
}

export default SearchBar