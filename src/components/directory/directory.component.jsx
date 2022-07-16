import CategoryItem from "../category-item/category-item.component";
import './directory.styles.scss'

const Directory = ({catagories}) =>{
    return(
        <div className="directory-container">
        {catagories.map(( category) => (
         <CategoryItem  key={category.id} category= {category} />
          ))}  
        </div>
    )
}

export default Directory;