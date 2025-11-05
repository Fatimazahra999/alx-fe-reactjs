import useRecipeStore from "../components/recipeStore.js";
import { Link } from "react-router-dom";

const RecipeList = () => {
    const {recipes, filteredRecipes}= useRecipeStore(
        state => ({recipes: state.recipes, filteredRecipes: state.filteredRecipes})
    );
    const filteredList = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))

    return(
        <div>
            {recipes.map(recipe => (
                <div key ={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>

                    <ul>
                        <li key = {recipe.id}>
                            <Link to={`/recipes/ ${recipe.id}`} >{recipe.title}</Link>
                        </li>
                    </ul>

                </div>
                
            ))}


        </div>
    )
}
export default RecipeList