import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView';
// importing icons

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView';
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.spinner();

    // Update results view to mark  selected search results
    ResultsView.update(model.getSearchResultsPage());

    // Loading the recipe

    await model.loadRecipe(id);

    // Rendering the recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const searchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.spinner();
    // load results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage(1));

    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render  new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render  new pagination buttons
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  // Update the recipe servings (in state) based on user input
  model.updateServings(newServings);
  // Update the view
  RecipeView.update(model.state.recipe);
};
const init = function () {
  RecipeView.addHandlerRrender(controlRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  SearchView.addHandlerSearch(searchResults);
  PaginationView._addHandlerClick(controlPagination);
};
init();
