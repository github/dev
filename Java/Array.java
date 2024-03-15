public class Array {
    private int count;
    private String array[];
    
    // Constructor initialzing array and its length
    public Array(int length) {
        this.array = new String[length];
    }
    
    // Method which prints the array 
    // And skips any index with val of null
    public void printArray() {
        for(int i =0; i < count; i++) {
            // checking if the index is a valid card (not null)
            if (array[i] != null) {
                System.out.print(array[i] + " ");
            }
        }
    }
    
    public String getCard(int index) {
        return array[index];
    }
    
    public int cardValue(String card) {
        if (card.equals("King") != true && card.equals("Queen") != true && card.equals("Jack") != true  && card.equals("Ace") != true ) {
            return Integer.parseInt(card);
        }
        else if (card.equals("King") == true) {
            return 13;
        }
        else if (card.equals("Queen") == true) {
            return 12;
        }
        else if (card.equals("Jack") == true) {
            return 11;
        }
        else if (card.equals("Ace") == true) {
            return 14;
        }
        else {
            return -1;
        }
    }
    
    public int cardValue(int index) {
        String card = getCard(index);
        if (card.equals("King") != true && card.equals("Queen") != true && card.equals("Jack") != true  && card.equals("Ace") != true ) {
            return Integer.parseInt(card);
        }
        else if (card.equals("King") == true) {
            return 13;
        }
        else if (card.equals("Queen") == true) {
            return 12;
        }
        else if (card.equals("Jack") == true) {
            return 11;
        }
        else if (card.equals("Ace") == true) {
            return 14;
        }
        else {
            return -1;
        }
    }
    
    public int getLength() {
        return count;
    }
    
    // Method which gets the index of a specified card
    public int getIndex(String cardName) {
        // loops through every element in the array
        for(int i = 0; i < array.length; i++) {
            // Stops when the first card equaling the search
            // parameter is found
            if(array[i] == cardName) { 
                return i; 
            }
        }
        // returns -1 if none are found
        return -1;
    }
    
    // Method which adds a card onto the end of the array
    // Can expand the array dynamically if needed
    public void insertCard(String card) {
        // checking if the length of the array is equal to 
        // the amount of cards in the array (count)
        if (array.length == count) {
            // creating a new array that's twice the size
            String[] newArray = new String[count*2];
            // for loop which copies the array onto a dif array
            // then replaces the original array with the new one
            for(int i=0; i<count; i++) {
                newArray[i] = array[i];
            }
            array = newArray;
        }
        // add the card onto the end of the array, then increase 
        // the value of count to indicate another card is in the deck
        array[count++] = card;
    }
    
    public void removeCard(String cardName) {
        
        // Get the index of the card to be removed and mark it
        array[getIndex(cardName)] = "Skip";
        String[] newArray = new String[array.length-1];
        int index = 0;
        // loops through every card in the array 
        // and if it != the card it skips it
        for(int i=0; i<array.length; i++) {
            if (array[i] != "Skip") {
                newArray[index] = array[i];
                index++;
            }
        }
        // Replace the array with the resized one
        // And reduce the size of the array by 1
        array = newArray;
        count--;
    }
    
    // Resets the array and makes a new blank deck
    public void newBlankDeck(int size) {
        // Resets the array and count
        String[] blankArray = new String[1];
        array = blankArray;
        count = 0;
        // Adds each card x (size) times
        for(int i =0; i<size; i++) {
            insertCard("Ace");
            insertCard("King");
            insertCard("Queen");
            insertCard("Jack");
            insertCard("10");
            insertCard("9");
            insertCard("8");
            insertCard("7");
            insertCard("6");
            insertCard("5");
            insertCard("4");
            insertCard("3");
            insertCard("2");
        }
        
    }
    
    
    
    
}