# Word-Guess-Game
// This is a basic Word Game.
// Future enhancements include
// Theme selection to allow selecting a range of word categories along with image and description as hints
// Better navigation/side bar function
// Hangman graphics
// Pseudo Code
// 1. At start of the game clear array and stat counters, Reset key board
// 2. Load first random word in to array/table
// 3. When Start button pressed, generate a random number, between 0-9. Read corresponding word from the array of words.
// 4. Find the length of the word
// 5. Load the word in to a temporary array. Each subscript contains the  letters of the word. Create the table dynamically
// 6. Create an array with same number of cells, dynamically to store the letters guessed. Initialize with underscore.
// 7. Create an on-click function to search the temprary array. This function is triggerred by click even on Start button.
// 8. Get the button click value (same as the letter guessed). Search the temporary array. 
// 9. If a match found, load the Result array in correct subscript positions. Update the stat counters.
// 10.For each selection, last selected button will be disabled.
// 11.If number guesses exhausted and still not word match, then Loose
// 12.If all letters matched and attempts less than number of guesses, then wins.