//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
class CocktailList {
    constructor(input){
        this.input = input;
        this.index = 0;
        this.drinksearchActive = false;
        this.drinkSelectionLength = 0;
        this.drinkName = '';
        this.instructions = '';
        this.drinkImage = '';

    }
    reset() {
        this.index = 0;
        this.drinksearchActive = false;
        this.drinkSelectionLength = 0;
        this.drinkName = '';
        this.instructions = '';
        this.drinkImage = '';
        this.fetcher(this.input)
    }
    prevDrink(){
        if(this.index >0){
            this.index--
            return this.fetcher()
        }   else return;
    }
    nextDrink(){
        if(this.index < this.drinkSelectionLength){
            this.index++;
            return this.fetcher()
        } else return;
    }
    noInput() {
        this.input.classList.add('warning')
    }

    thereIsInput(){
        if(this.input.classList.contains('warning')) this.input.classList.remove('warning');
    }

    fetcher(){
        this.thereIsInput()
        const selection = input.value;
        fetch(url+selection)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.drinks.length)
                this.drinksearchActive = true;
                this.drinkSelectionLength = data.drinks.length;
                this.drinkName = data.drinks[this.index].strDrink;
                this.instructions = data.drinks[this.index].strInstructions;
                this.drinkImage = data.drinks[this.index].strDrinkThumb;
                this.displayDrink()
            })
            .catch(err=> {
                `Error: ${err}`
            });
    }

    displayDrink(){
        nameOutput.innerText = this.drinkName;
        instructionsOutput.innerText = this.instructions
        imgOutput.src = this.drinkImage;
    }
}


const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const input = document.querySelector('input');

// Buttons
const submitBtn = document.querySelector('.choice-btn');
const buttons = Array.from(document.querySelectorAll('button'));
const nameOutput = document.querySelector('h2');
const instructionsOutput = document.querySelector('p');
const imgOutput = document.querySelector('img');
buttons.forEach(btn => btn.addEventListener('click', e => 
    {
        if(e.target.classList.contains('select-btn')) {
            const btnId = e.target.id;
            if (input.value == '') return noInput();
            else if(btnId === 'submit-btn'){
                cocktailList.fetcher(input.value);
            } else if(btnId === 'submit-btn' && cocktailList.drinkSearchActive === true){
                cocktailList.reset()
                cocktailList.fetcher(input.value);
            } else if(cocktailList.drinksearchActive === true && btnId === 'prev-btn'){
                return cocktailList.prevDrink();
            } else if(cocktailList.drinksearchActive === true && btnId === 'next-btn'){
                return cocktailList.nextDrink();
            }
        } 
    }
))



const cocktailList = new CocktailList(input)

/*
Input comes in and is checked. If it is an empty string it is flagged with red text
If there's text it is passed to the next stage, where the buttons are checked. Which button was clicked is tested.
If it was the submit button the fetch function is triggered and the drink at index zero is diplayed and the search for drinks has started: set searchActive to true.
While search is true, if prev or next buttons are pushed the cocktail displayed should shuffle up or down respectively.*/