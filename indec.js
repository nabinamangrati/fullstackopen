function mostVowels(words) {
  let maxWord = "";
  let maxCount = 0;
  let currentWord = "";
  const vowels = "aeiouAEIOU";

  for (let i = 0; i < words.length; i++) {
    if (words[i] === " " || i === words.length - 1) {
      let count = 0;
      for (let j = 0; j < currentWord.length; j++) {
        if (vowels.includes(currentWord[j])) count++;
      }
      if (count > maxCount) {
        maxCount = count;
        maxWord = currentWord;
      }
      currentWord = "";
    } else {
      currentWord += words[i];
    }
  }

  return maxWord;
}
debugger;
console.log(mostVowels("rhythm"));
