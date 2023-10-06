import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
    if (array.length <= 1) return array;

    if (typeof numItems !== 'number' || numItems <= 0 || numItems > array.length) {
        numItems = Math.floor(Math.random() * (array.length - 1)) + 1; // random number between 1 and array length
    }

    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
};

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
    const prompts = [];
    for (let q = 1; q <= numQuestions; q++) {
        prompts.push({
            type: 'input',
            name: `question-${q}`,
            message: `Enter question ${q}`
        });

        for (let c = 1; c <= numChoices; c++) {
            prompts.push({
                type: 'input',
                name: `question-${q}-choice-${c}`,
                message: `Enter answer choice ${c} for question ${q}`
            });
        }
    }
    return prompts;
};

export const createQuestions = (obj = {}) => {
   const questions = [];

   for (const key in obj) {
       if (key.startsWith('question-') && !key.includes('choice')) {
           const question = {
               type: 'list',
               name: key,
               message: obj[key],
               choices: []
           };

           let choiceNumber = 1;
           let choiceKey = `${key}-choice-${choiceNumber}`;

           while (obj[choiceKey] !== undefined) {
               question.choices.push(obj[choiceKey]);
               choiceNumber++;
               choiceKey = `${key}-choice-${choiceNumber}`;
           }

           questions.push(question);
       }
   }

   return questions;
};

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
