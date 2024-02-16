fetch("list.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);
        cards(response)
    })
  
    
const allcards = document.querySelectorAll(".card");

const cards = (response) => {
    const allCountries = response.visitedCountries.concat(response.bucketList);
    allcards.forEach((card) => {

        // haal de randomCountry uit de array met allcountries
        const randomIndex = Math.floor(allCountries.length * Math.random());
        const randomCountry = allCountries[randomIndex]; 
        console.log(randomCountry);
        allCountries.splice(randomIndex, 1);
       
        const countryImg = card.querySelector(".frontOfCard img");
        const countryH2 = card.querySelector(".backOfCard h2");
        countryH2.textContent = randomCountry.country;
        countryImg.src = randomCountry.imgUrl;
        countryImg.alt = randomCountry.imgAlt;

        console.log("alles werkt nog");

        const cardBack = card.querySelector(".backOfCard");
        const ratingDiv = document.createElement("div");
        cardBack.append(ratingDiv);

        if (randomCountry.rating) {
            for (let i = 0; i < 5; i++) {
                console.log("hier werkt het nog");
                if (i < randomCountry.rating) {
                    console.log("de if doet het");
                    const solidImg = document.createElement("img");
                    solidImg.src="images/star-solid.svg";
                    ratingDiv.append(solidImg);
                }
                else {
                    const regularImg = document.createElement("img");
                    regularImg.src="images/star-regular.svg";
                    ratingDiv.append(regularImg);
                }
            }
        }

    })   
}

// bron: https://www.freecodecamp.org/news/how-to-remove-an-element-from-a-javascript-array-removing-a-specific-item-in-js/#remove-an-element-from-an-array-with-a-for-loop-and-push
// dit werkt niet en ik begrijp dit ook niet echt goed. 

// const randomCountry = allCountries[Math.floor(allCountries.length * Math.random())]; 
// for (let i = 0; i <allCountries.length; i++){
//     if (allCountries[i] !==randomCountry) {
//         randomCountry.push(allCountries[i]);
//     }
// }


// Dit had ik eerst geprobeerd, maar elke keer dat ik de if statement ervoor zette, deed de console het meteen niet meer. Het werkt wel zonder if statement, ik begrijp alleen niet waarom.
// update: ik begrijp het nu wel, ik moest de condition van de if statement niet op allCountries zetten, maar specifiek op het land waar het op dat moment over gaat dus de randomCountry.

    // if (allCountries.rating) {
    //     const cardBack = card.querySelector(".backOfCard")
    //     const ratingDiv = document.createElement("div")
    //     cardBack.append(ratingDiv);
    // }


// Het enige wat ik nu nog niet begrijp is hoe ik dit in twee aparte functies zou kunnen schrijven. Ik maak allerlei variablen aan in de eerste functie die ik dan nodig zou hebben in de tweede functie.