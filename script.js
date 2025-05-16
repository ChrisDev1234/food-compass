console.log("meal.js loaded");

async function loadMealDetails() {
  console.log("loadMealDetails called");
  const params = new URLSearchParams(window.location.search);
  const mealId = params.get("id");
  const container = document.getElementById("mealDetails");

  if (!mealId) {
    container.innerText = "No meal selected. Please go back and select a meal.";
    return;
  }

  try {
    console.log("Fetching meal with ID:", mealId);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);

    if (!data.meals) {
      container.innerText = "Meal not found.";
      return;
    }

    const meal = data.meals[0];

    container.innerHTML = `
      <h2 class="text-2xl font-semibold mb-4">${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full rounded mb-6" />
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <p class="mt-4 whitespace-pre-wrap">${meal.strInstructions}</p>
      ${meal.strYoutube ? `<p class="mt-4"><a href="${meal.strYoutube}" target="_blank" class="text-blue-600 underline">Watch on YouTube</a></p>` : ""}
      <p class="mt-6"><a href="explore.html" class="text-orange-600 hover:underline">← Back to search</a></p>
    `;
  } catch (error) {
    console.error("Error loading meal:", error);
    container.innerText = "Failed to load meal details. Please try again later.";
  }
}

loadMealDetails();
