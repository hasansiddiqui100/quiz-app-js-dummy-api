// URL of the API (Fetching trivia questions)
const apiURL = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple';

// Fetching data from the API
fetch(apiURL)
    .then(response => {
        // Convert response to JSON
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
       
        // console.log(data.results); 

       
        // const question = data.results[0];
        // console.log('Question:', question.question);
        // console.log('Correct Answer:', question.correct_answer);
        // console.log('Incorrect Answers:', question.incorrect_answers);

        const shuffle = (array) => {  //for shuffling choices
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };



        var decodeEntities = (function () { //for removing html entittes in question
            // this prevents any overhead from creating the object each time
            var element = document.createElement('div');

            function decodeHTMLEntities(str) {
                if (str && typeof str === 'string') {
                    // strip script/html tags
                    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
                    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                    element.innerHTML = str;
                    str = element.textContent;
                    element.textContent = '';
                }

                return str;
            }

            return decodeHTMLEntities;
        })();


        /////////////////////////////////////////////////////// 
        var decodeEntitiesarr = (function () {  //html entitites for aaray of choices decoding 
            // Create a reusable div element to use for decoding
            var element = document.createElement('div');

            function decodeHTMLEntities(str) {
                if (str && typeof str === 'string') {
                    // Decode HTML entities
                    element.innerHTML = str;
                    str = element.textContent;
                    element.textContent = '';
                }

                return str;
            }

          
            function decodeArray(arr) {
                if (Array.isArray(arr)) {
                    return arr.map(item => decodeHTMLEntities(item));
                }
                return arr; // If it's not an array, return it as is
            }

            return decodeArray; // Return the function to decode an array
        })();
        ///////////////////////////////////////////////////////////



        for (let i = 0; i < 5; i++) {
            const question = data.results[i];
            decoded = decodeEntities(question.question)

            console.log('Question:', decoded);
            // console.log('Correct Answer:', question.correct_answer);
            // console.log('Incorrect Answers:', question.incorrect_answers);
            
            let arr = []
            arr = question.incorrect_answers
            arr.push(question.correct_answer)
            // console.log(arr)
            shuffled = shuffle(arr)
            final_shuffled = decodeEntitiesarr(shuffled)
            console.log(shuffled)


            

            const container = document.getElementById('quiz-form');

           
            const questionElement = document.createElement('p');
            questionElement.textContent = `${i+1})`+decoded;

            
            container.appendChild(questionElement);

            
            final_shuffled.forEach((choices, index) => {
                
                const choiceContainer = document.createElement('div');

               
                const radioButton = document.createElement('input');
                radioButton.type = 'radio';
                radioButton.name = `q no:${i}`;  // Group the radio buttons
                radioButton.value = choices;        // Set the value as the choice

                
                const label = document.createElement('label');
                label.textContent = choices;

                
                choiceContainer.appendChild(radioButton);
                choiceContainer.appendChild(label);

                
                container.appendChild(choiceContainer);
            });


        }


        function submitQuiz() {
            let score = 0;

            data.results.forEach((item, index) => {
                // Get the selected answer for the current question
                const selectedAnswer = document.querySelector(`input[name="q no:${index}"]:checked`);

                if (selectedAnswer && selectedAnswer.value === item.correct_answer) {
                    score++;
                }
            });

            // Display the score
            document.getElementById('result').textContent = `You scored ${score} out of 5!`;
        }

        document.getElementById('submit-button').addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default form submission
            submitQuiz();
        });





        


    })
    .catch(error => {
        
        console.error('There has been a problem with your fetch operation:', error);
    });
