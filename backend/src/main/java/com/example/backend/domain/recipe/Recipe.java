package com.example.backend.domain.recipe;

import com.example.backend.domain.ingredient.Ingredient;
import com.example.backend.domain.recipe_ingredients.RecipeIngredient;
import com.example.backend.domain.recipe_type.RecipeType;
import com.example.backend.domain.user.AppUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "Recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id", nullable = false, updatable = false)
    private Long recipeId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(length = 100)
    private String thumbnail_url;

    @Column(name = "recipe_description", nullable = false, columnDefinition = "TEXT")
    private String recipeDescription;

    @Column(name = "likes", columnDefinition = "INT DEFAULT 0")
    private int likes;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String guide;

    @ManyToOne
    @JoinColumn(name = "recipe_type", nullable = false)
    private RecipeType recipeType;

    @ManyToOne
    @JoinColumn(name = "creator", nullable = false)
    private AppUser creator;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "Recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private List<Ingredient> ingredients;

    public Recipe() {
    }

    public Recipe(String title, String thumbnail_url, String recipe_description, int likes, String guide,
            RecipeType recipeType, AppUser creator, List<Ingredient> ingredients) {
        this.title = title;
        this.thumbnail_url = thumbnail_url;
        this.recipeDescription = recipe_description;
        this.likes = likes;
        this.guide = guide;
        this.recipeType = recipeType;
        this.creator = creator;
        this.ingredients = ingredients;
    }

    public Long getRecipe_id() {
        return recipeId;
    }

    public void setRecipe_id(Long recipe_id) {
        this.recipeId = recipe_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnail_url() {
        return thumbnail_url;
    }

    public void setThumbnail_url(String thumbnail_url) {
        this.thumbnail_url = thumbnail_url;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getGuide() {
        return guide;
    }

    public void setGuide(String guide) {
        this.guide = guide;
    }

    public RecipeType getRecipeType() {
        return recipeType;
    }

    public void setRecipeType(RecipeType recipeType) {
        this.recipeType = recipeType;
    }

    public AppUser getCreator() {
        return creator;
    }

    public void setCreator(AppUser creator) {
        this.creator = creator;
    }


    public String getRecipeDescription() {
        return recipeDescription;
    }

    public void setRecipeDescription(String recipeDescription) {
        this.recipeDescription = recipeDescription;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    @Override
    public String toString() {
        return "Recipe [recipeId=" + recipeId + ", title=" + title + ", thumbnail_url=" + thumbnail_url
                + ", recipeDescription=" + recipeDescription + ", likes=" + likes + ", guide=" + guide + ", recipeType="
                + recipeType + ", creator=" + creator + ", recipeIngredients=" + ingredients + "]";
    }

}
