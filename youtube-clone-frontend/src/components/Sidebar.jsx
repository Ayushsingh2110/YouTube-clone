import { Stack } from "@mui/material";
import { categories } from '../utils/constant';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedCategory, setSelectedCategory}) => {

    const navigate = useNavigate();

    return(
    <div
    className="Sidebar_main"
    >
        {categories.map((category)=> (
            <button
             className="category-btn"
             onClick={() => {
                setSelectedCategory(category.name);
                navigate('/');
            }}
             style={{
                background: category.name === selectedCategory && '#FC1503',
                color: 'white'
             }}
             key={category.name}
             >
                <span style={{ color: category.name === selectedCategory ? 'white' : 'red',
                marginRight: '10px'}}
                >
                    {category.icon}
                </span>
                <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8'}}>
                    {category.name}

                </span>

            </button>
        ))}

    </div>
)
}
export default Sidebar