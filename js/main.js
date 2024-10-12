// ! meals
const loadMeals = async (status) => {
    // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`

    // fetch(url)
    //     .then(res => res.json())
    //     // .then(data => console.log(data.meals))
    //     .then(data => displayMeals(data.meals))
    //     .catch(error => console.log(error))

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    const data = await res.json();
    if (status) {
        displayMeals(data.meals);
    }
    else {
        displayMeals(data.meals.slice(0, 6));
    }
}
loadMeals(false);           // false = 6 info

const displayMeals = (meals) => {

    const mealsContainer = document.getElementById('card_container');
    mealsContainer.innerHTML = '';


    document.getElementById('btn_show_all').addEventListener('click', () => {
        loadMeals(true);
    })


    meals.forEach(meal => {
        console.log(meal);

        const div = document.createElement('div');
        div.classList.add('flex', 'border-2', 'gap-8', 'rounded-lg', 'p-4');
        div.innerHTML = `
            <div class="w-1/2">
                <img class='rounded-lg' src="${meal.strMealThumb}" alt="">
            </div>
            <div class="w-1/2 flex justify-center items-start flex-col gap-4 text-center space-y-4">
                <h1 class="text-xl font-bold">Name: ${meal.strMeal}</h1>
                <p class="text-center">Category: ${meal.strCategory}</p>
                <p class="text-center">Region: ${meal.strArea}</p>
                <p class="text-center w-80 truncate">${meal.strInstructions}</p>
                
                <button onclick="loadDetails('${meal.idMeal}')" class="btn btn-warning">Details</button>
            </div>
        `
        mealsContainer.appendChild(div);
    });
}


// ! categories
const loadCategories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
        .then(res => res.json())
        // .then(data => console.log(data.meals))
        .then(data => displayCategories(data.meals))
        .catch(error => console.log(error))
}
loadCategories();

const displayCategories = (categories) => {

    const categoryContainer = document.getElementById('category_container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick="loadCategoriesWiseData()" id="btn_category_wise_data" class="btn btn-outline hover:bg-yellow-400 hover:text-black hover:border-none">${category.strCategory}</button>
        `
        categoryContainer.appendChild(div);
    });
}


// ! areas
const loadArea = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`

    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => displayArea(data.meals))
        .catch(error => console.log(error))
}
loadArea();

const displayArea = (areas) => {

    const areaContainer = document.getElementById('area_container');
    areas.forEach(area => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button class="btn btn-outline hover:bg-yellow-400 hover:text-black hover:border-none">${area.strArea}</button>
        `
        areaContainer.appendChild(div);
    });
}

// ! ingredients
// const loadIngredients = () => {
//     const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`

//     fetch(url)
//         .then(res => res.json())
//         // .then(data => console.log(data))
//         .then(data => displayIngredients(data.meals))
//         .catch(error => console.log(error))
// }
// loadIngredients();

// const displayIngredients = (ingredients) => {

//     const ingredientContainer = document.getElementById('ingredient_container');
//     ingredients.forEach(ingredient => {
//         const div = document.createElement('div');
//         div.innerHTML = `
//             <button class="btn btn-outline hover:bg-yellow-400 hover:text-black hover:border-none">${ingredient.strIngredient}</button>
//         `
//         ingredientContainer.appendChild(div);
//     });
// }

// ! search part

// ! name
document.getElementById('btn_search_name').addEventListener('click', function (event) {
    const searchFieldName = document.getElementById('search_field_name');
    // console.log(searchFieldName.value);
    searchFoodName(searchFieldName.value);
})

const searchFoodName = async (value) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await res.json();
    displayMeals(data.meals);
}

// ! letter
document.getElementById('btn_search_letter').addEventListener('click', function (event) {
    const searchFieldLetter = document.getElementById('search_field_letter');
    // console.log(searchFieldLetter.value[0]);
    searchFoodLetter(searchFieldLetter.value[0]);
})

const searchFoodLetter = async (value) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    const data = await res.json();
    displayMeals(data.meals);
}

// ! details modal
const loadDetails = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayDetails(data.meals[0]);
}

const displayDetails = (details) => {
    // console.log(details);

    const detailsContainer = document.getElementById('details_container');
    detailsContainer.innerHTML = '';

    const div = document.createElement('div');
    div.innerHTML = `
        <img src="${details.strMealThumb}" alt="">
        <p class="mt-4">Name: ${details.strMeal}</p>
        <p class="mt-4">Category: ${details.strCategory}</p>
        <p class="mt-4">Area: ${details.strArea}</p>
        <p class="mt-4">Instructions: ${details.strInstructions}</p>
    `
    detailsContainer.appendChild(div);

    const modalContainer = document.getElementById('my_modal_1');
    modalContainer.showModal();
}

// ! categories wise data
const loadCategoriesWiseData = async () => {
    console.log('loadCategoriesWiseData');
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.meals);
    // displayMeals(data.meals);
    displayCategoriesWiseData(data.meals);
}
// loadCategoriesWiseData();

const displayCategoriesWiseData = (meals) => {
    document.getElementById('btn_category_wise_data').addEventListener('click', () => {
        displayMeals(meals);
    })

}