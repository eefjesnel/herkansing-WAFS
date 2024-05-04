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

        const popupButton = card.querySelector(".popupButton");
        const popUpElement = document.querySelector("section:nth-of-type(1) dialog");

        popupButton.addEventListener("click", () => {
            const headingElement = document.querySelector("section:nth-of-type(1) dialog h2");
            // Hier wordt het land toegevoegd aan een h2 element in de popup
            headingElement.textContent = randomCountry.country;
            const dialogText = document.querySelector("section:nth-of-type(1) dialog p");
            // Hier gebruik ik een if else functie om af te vangen of er in de "p" in de popup de experience of de reason moet staan.
            if (randomCountry.experience){
                dialogText.textContent = randomCountry.experience;
            }
            else{
                dialogText.textContent = randomCountry.reason;
            }
            const dialogRecommendations = document.querySelector("section:nth-of-type(1) dialog ul");
            // Hier zet ik in de ul de recommendations en maak ik met een for each function bij elke recommendation een "li" item aan.
            dialogRecommendations.innerHTML = ""
            if (randomCountry.recommendations){
                randomCountry.recommendations.forEach((recommendation)=>{
                    // Hier maak ik het een constante voor het "li" item
                    const li = document.createElement("li");
                    li.textContent = recommendation;
                    // hier wordt het "li" item daadwerkelijk toegevoegd.
                    dialogRecommendations.append(li);
                })
            }
            // Dit zorgt ervoor dat de dialog in beeld komt wanneer je klikt op de button.
            popUpElement.showModal();
        });

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