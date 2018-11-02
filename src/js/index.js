import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import  { elements, renderLoader, clearLoader }  from './views/base'

const state = {}


//Search controller
const controlSearch = async () => {

    // Get query from view
    const query = searchView.getInput();
    //console.log(query)

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearList();
        renderLoader(elements.searchRes);

        await state.search.getResults();
        
        clearLoader();
        
        searchView.renderResults(state.search.result);
      
    }

}

//REcipe controlle
const controlRecipe = async () => {
    //get id from url
    const id = window.location.hash.replace('#', '')
    console.log(id)

    if(id) {
        state.recipe = new Recipe(id);

        state.recipe.getRecipe();

        //state.recipe.calcTime();
        state.recipe.calcServings();
        console.log(state.recipe)
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); 
    controlSearch(); 
    }
)
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearList();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);    
    }   
    
})
