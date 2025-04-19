package com.example.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Ingredient")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id", nullable = false, updatable = false)
    private Long ingredientId;

    @Column(name = "ingredient_name", nullable = false, length = 100)
    private String ingredientName;

    @Column(name = "unit", nullable = true)
    private String unit;

    @ManyToMany(mappedBy = "ingredients")
    private List<Recipe> recipes;

    public Ingredient() {
        super();
    }

    public Ingredient(String ingredientName, String unit) {
        this.ingredientName = ingredientName;
        this.unit = unit;
    }

    public Long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Long ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getIngredientName() {
        return ingredientName;
    }

    public void setIngredientName(String ingredientName) {
        this.ingredientName = ingredientName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @Override
    public String toString() {
        return "Ingredient [ingredientId=" + ingredientId + ", ingredientName=" + ingredientName + ", unit=" + unit
                + ", recipes=" + "]";
    }
}