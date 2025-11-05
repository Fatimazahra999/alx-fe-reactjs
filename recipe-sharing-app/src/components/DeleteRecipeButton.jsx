import React from 'react'
import useRecipeStore from '../components/recipeStore.js'
import { useNavigate } from 'react-router-dom'

const DeleteRecipeButton = ({recipeId}) => {
    const deleteRecipe = useNavigate(state => state.deleteRecipe)

    const handleDelete =() => {
        deleteRecipe(recipeId);
    }
  return (
    <div>
      <button onClick={handleDelete}> Delete Recipe</button>
    </div>
  )
}

export default DeleteRecipeButton