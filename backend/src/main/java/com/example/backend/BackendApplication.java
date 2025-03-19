package com.example.backend;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.backend.domain.ingredient.Ingredient;
import com.example.backend.domain.ingredient.IngredientRepository;
import com.example.backend.domain.recipe.Recipe;
import com.example.backend.domain.recipe.RecipeRepository;
import com.example.backend.domain.recipe_type.RecipeType;
import com.example.backend.domain.recipe_type.RecipeTypeRepository;
import com.example.backend.domain.role.UserRole;
import com.example.backend.domain.role.UserRoleRepository;
import com.example.backend.domain.user.AppUser;
import com.example.backend.domain.user.AppUserRepository;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner clr(RecipeRepository recipeRepository, RecipeTypeRepository recipeTypeRepository,
            AppUserRepository appUserRepository, UserRoleRepository userRoleRepository,
            IngredientRepository ingredientRepository) {
        return (args) -> {

            recipeRepository.deleteAll();
            ingredientRepository.deleteAll();
            recipeTypeRepository.deleteAll();
            appUserRepository.deleteAll();
            userRoleRepository.deleteAll();

            Ingredient ingredient1 = new Ingredient("Eggs", "grams");
            Ingredient ingredient2 = new Ingredient("Milk", "liters");
            Ingredient ingredient3 = new Ingredient("Chicken breast", "grams");
            Ingredient ingredient4 = new Ingredient("Beef", "grams");
            Ingredient ingredient5 = new Ingredient("Water", "cups");

            ingredientRepository.save(ingredient1);
            ingredientRepository.save(ingredient2);
            ingredientRepository.save(ingredient3);
            ingredientRepository.save(ingredient4);

            ingredientRepository.save(ingredient5);

            for (Ingredient ingredient : ingredientRepository.findAll()) {
                System.out.println(ingredient.toString());
            }

            UserRole user = new UserRole("user");
            UserRole admin = new UserRole("admin");

            userRoleRepository.save(user);
            userRoleRepository.save(admin);

            for (UserRole userRole : userRoleRepository.findAll()) {
                System.out.println(userRole.toString());
            }

            AppUser appUser1 = new AppUser("Jarno", "Jarno.ryhanen@haaga-helia.fi",
                    admin, "password");
            AppUser appUser2 = new AppUser("Matti", "matti.pohjanoksa@haaga-helia.fi",
                    user, "password2");
            AppUser appUser3 = new AppUser("Valtteri", "valtteri.vuokila@haaga-helia.fi",
                    user, "password3");
            AppUser appUser4 = new AppUser("Sami", "Sami.santasalo@haaga-helia.fi", user,
                    "password4");
            AppUser appUser5 = new AppUser("JarnoKakkonen",
                    "Jarno2.ryhanen@haaga-helia.fi", user, "password5");

            appUserRepository.save(appUser1);
            appUserRepository.save(appUser2);
            appUserRepository.save(appUser3);
            appUserRepository.save(appUser4);
            appUserRepository.save(appUser5);

            for (AppUser appUser : appUserRepository.findAll()) {
                System.out.println(appUser.toString());
            }

            RecipeType recipeType1 = new RecipeType("egg dish");
            RecipeType recipeType2 = new RecipeType("soup");
            RecipeType recipeType3 = new RecipeType("breakfast");
            RecipeType recipeType4 = new RecipeType("noodles");

            recipeTypeRepository.save(recipeType1);
            recipeTypeRepository.save(recipeType2);
            recipeTypeRepository.save(recipeType3);
            recipeTypeRepository.save(recipeType4);

            for (RecipeType recipeType : recipeTypeRepository.findAll()) {
                System.out.println(recipeType.toString());
            }

            AppUser eggCreator = appUserRepository.findByUsername("Jarno");
            List<Ingredient> eggDish = new ArrayList<>(Arrays.asList(ingredient1, ingredient5));

            Recipe recipe1 = new Recipe("Eggs benedict",
                    "https://example.com/eggs_benedict.jpg",
                    "Delicious egg dish",
                    0,
                    "This is how you make this dish",
                    recipeType1,
                    eggCreator,
                    eggDish);

            List<Ingredient> soupIngredients = new ArrayList<>(Arrays.asList(ingredient2, ingredient3));

            Recipe recipe2 = new Recipe("Chicken Soup",
                    "https://example.com/chicken_soup.jpg",
                    "Hearty chicken soup",
                    0,
                    "This is how you make chicken soup",
                    recipeType2,
                    eggCreator,
                    soupIngredients);

            // Create and save a third recipe
            List<Ingredient> breakfastIngredients = new ArrayList<>(
                    Arrays.asList(ingredient1, ingredient2, ingredient3));

            Recipe recipe3 = new Recipe("Breakfast Burrito",
                    "https://example.com/breakfast_burrito.jpg",
                    "Tasty breakfast burrito",
                    0,
                    "This is how you make a breakfast burrito",
                    recipeType3,
                    eggCreator,
                    breakfastIngredients);

            recipeRepository.save(recipe1);
            recipeRepository.save(recipe2);
            recipeRepository.save(recipe3);

            for (Recipe recipe : recipeRepository.findAll()) {
                System.out.println(recipe.toString());
            }
        };
    }
}