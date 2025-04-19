package com.example.backend.dto;

import java.util.List;

import com.example.backend.model.Ingredient;

public class RecipeDto {

    private Long recipeId;

    private String title;

    private String thumbnail_url;

    private String recipeDescription;

    private int likes;

    private String guide;

    private String recipeType;

    private String creator;

    private List<Ingredient> ingredients;

    public RecipeDto(Long recipeId, String title, String thumbnail_url, String recipeDescription, int likes,
            String guide,
            String recipeType, String creator, List<Ingredient> ingredients) {
        this.recipeId = recipeId;
        this.title = title;
        this.thumbnail_url = thumbnail_url;
        this.recipeDescription = recipeDescription;
        this.likes = likes;
        this.guide = guide;
        this.recipeType = recipeType;
        this.creator = creator;
        this.ingredients = ingredients;
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

    public String getRecipeDescription() {
        return recipeDescription;
    }

    public void setRecipeDescription(String recipeDescription) {
        this.recipeDescription = recipeDescription;
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

    public String getRecipeType() {
        return recipeType;
    }

    public void setRecipeType(String recipeType) {
        this.recipeType = recipeType;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    @Override
    public String toString() {
        return "RecipeDto [recipeId=" + recipeId + ", title=" + title + ", thumbnail_url="
                + ", recipeDescription=" + recipeDescription + ", likes=" + likes + ", guide=" + guide + ", recipeType="
                + recipeType + ", creator=" + creator + ", ingredients=" + ingredients + "]";
    }



    public Long getRecipeId() {
        return recipeId;
    }

}
