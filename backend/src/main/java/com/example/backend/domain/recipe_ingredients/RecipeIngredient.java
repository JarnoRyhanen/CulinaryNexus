package com.example.backend.domain.recipe_ingredients;

import com.example.backend.domain.ingredient.Ingredient;
import com.example.backend.domain.recipe.Recipe;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Recipe_ingredients")
public class RecipeIngredient {

    @EmbeddedId
    private RecipeIngredientsId id;

    @Column(name = "quantity", length = 20)
    private String quantity;

    @ManyToOne
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", insertable = false, updatable = false)
    private Ingredient ingredient;

    public RecipeIngredient() {
    }

    public RecipeIngredient(Recipe recipe, Ingredient ingredient, String quantity) {
        this.id = new RecipeIngredientsId(recipe.getRecipe_id(), ingredient.getIngredientId());
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.quantity = quantity;
    }

    public RecipeIngredientsId getId() {
        return id;
    }

    public void setId(RecipeIngredientsId id) {
        this.id = id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    @Override
    public String toString() {
        return "RecipeIngredients [quantity=" + quantity + ", recipe=" + recipe + ", ingredient=" + ingredient + "]";
    }

}
