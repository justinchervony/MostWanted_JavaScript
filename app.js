/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            //let peopleInfo = displayPeople(personFamily);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            if (personDescendants.length == 0){
                alert("No descendants found.")
            }
            else (displayPeople(personDescendants));
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
 function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `ID: ${person.id}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


/**
 * This function filters our data of people to find the passed Object's (person's) siblings, parents, and spouse.
 * It has built in checking to ensure the foundPerson is not put into the new filtered Array.
 * 
 * @param {Object} foundPerson      The result of our initial person search.
 * @param {Array} people            Our collection of people data.
 * @returns {Array}                 The resultant filtered set of foundPerson's family from our data set.
 */
function findPersonFamily(foundPerson, people) {
    let foundPersonId = foundPerson.id;
    let foundPersonParents = foundPerson.parents;

    let personSpouse = people.filter(function (person) {
        if (person.currentSpouse == foundPersonId) {
            return true;
        }
    });
    let personParents = people.filter(function (person) {
        if (foundPersonParents.includes(person.id)) {
            return true;
        }
    });
    let personSiblings = people.filter(function(person) {
        if (person.parents[0] == foundPersonParents[0] && foundPersonParents[0] !== undefined && person.id !== foundPersonId) {
            return true;
        }
    });

    let personFamily = combinedFamilyArrays(personSpouse, personParents, personSiblings);

    return personFamily;
}


function combinedFamilyArrays(spouseArray, parentArray, siblingArray){
    let familyArray = "";

    familyArray += arrayPush(spouseArray, "Spouse");
    familyArray += arrayPush(parentArray, "Parents");
    familyArray += arrayPush(siblingArray, "Siblings");




    // if (spouseArray.length > 0) {
    //     familyArray.push("Spouse:\n");
    //     for (let i=0; i<spouseArray.length; i++) {
    //         familyArray.push(`${spouseArray[i].firstName} ${spouseArray[i].lastName}`);
    //     }
    // }
    // else {
    //     familyArray.push("No spouse found.\n");
    // }

    // familyArray.push(" \n")

    // if (parentArray.length > 0) {
    //     familyArray.push("Parents:\n");
    //     for (let i=0; i<parentArray.length; i++) {
    //         familyArray.push(`${parentArray[i].firstName} ${parentArray[i].lastName}`);
    //     }
    // }
    // else {
    //     familyArray.push("No parents found.\n");
    // }

    // familyArray.push(" \n")

    // if (siblingArray.length > 0) {
    //     familyArray.push("Siblings:\n");
    //     for (let i=0; i<siblingArray.length; i++) {
    //         familyArray.push(`${siblingArray[i].firstName} ${siblingArray[i].lastName}`);
    //     }
    // }
    // else {
    //     familyArray.push("No siblings found.\n");
    // }

    return familyArray;

}

function arrayPush(memberArray, memberType){
    let familyArrayHolder = "";
    if (memberArray.length > 0) {
        familyArrayHolder += (`${memberType}:\n`);
        for (let i=0; i<memberArray.length; i++) {
            familyArrayHolder += (`${memberArray[i].firstName} ${memberArray[i].lastName}\n`);
        }
    }
    else {
        familyArrayHolder += (`No ${memberType.toLowerCase()} found.\n`);
    }

    familyArrayHolder += ("\n")

    return familyArrayHolder;
}

// function arrayPush(familyArray, memberArray, memberType){
//     if (memberArray.length > 0) {
//         familyArray.push(`${memberType}:\n`);
//         for (let i=0; i<memberArray.length; i++) {
//             familyArray.push(`${memberArray[i].firstName} ${memberArray[i].lastName}\n`);
//         }
//     }
//     else {
//         familyArray.push(`No ${memberType.toLowerCase()} found.\n`);
//     }

//     familyArray.push("\n")
// }


function findPersonDescendants(personObj, peopleArray, personDescendantArray = []){
    let personId = personObj.id;
    personDescendantArray = personDescendantArray.concat(peopleArray.filter(function(person) {
        if (person.parents.includes(personId)){
            return true;
        }
    }));
    let arrayLength = personDescendantArray.length;
    for (let i = 0; i < arrayLength; i++) {
        personDescendantArray = personDescendantArray.concat(
            findPersonDescendants(personDescendantArray[i], peopleArray)
        )
    }
    return personDescendantArray;
};