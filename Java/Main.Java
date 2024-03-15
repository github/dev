import java.util.Scanner;
import java.util.Random;

public class Main
{
    public static void main(String[] args) throws InterruptedException {
        Scanner scan = new Scanner(System.in);
        Random rand = new Random();
        int gameLength = -1;
        String textColor = "\u001B[40m\u001B[36m";
        String green = "\u001B[40m\u001B[32m";
        String red = "\u001B[40m\u001B[31m";
        String clearLine = "\n";
        
        // Bug where once you hit the end of the console
        // The background color becomes consistent with every space
        // Using that here
        for(int i =0; i<50; i++) {
            System.out.println(textColor+"");
        }
        clearScreen();
        
        while(gameLength == -1) {
            // Asks user for game length
            clearScreen();
            System.out.print(textColor + " Select the length of the game: \n Short Medium Long \n ");
            String gameLengthChoice = scan.nextLine().toLowerCase();
            
            // Setting the length based on the user input
            if (gameLengthChoice.equals("short")) {
                gameLength = 1; 
            }
            else if (gameLengthChoice.equals("medium")) {
                gameLength = 2;
            }
            else if (gameLengthChoice.equals("long")) {
                gameLength = 3;
            }
        }
        
        Array playerDeck = new Array(1);
        playerDeck.newBlankDeck(gameLength);
        
        Array computerDeck = new Array(1);
        computerDeck.newBlankDeck(gameLength);
        int playerCardIndex;
        int computerCardIndex;
        
        while (playerDeck.getLength() >= 1 && computerDeck.getLength() >= 1) {
            
            playerCardIndex = rand.nextInt(playerDeck.getLength());
            computerCardIndex = rand.nextInt(computerDeck.getLength());
            
            String playerCard = playerDeck.getCard(playerCardIndex);
            String computerCard = computerDeck.getCard(computerCardIndex);
            
            if (playerDeck.cardValue(playerCard) > computerDeck.cardValue(computerCard)) {
                computerDeck.removeCard(computerCard);
                playerDeck.insertCard(computerCard);
                System.out.print(green+" Player wins the round! \n (P) " + playerCard + " vs (C) " + computerCard);
                System.out.println(" | Player Deck: " + playerDeck.getLength() + " Computer Deck: " + computerDeck.getLength() + clearLine);
                Thread.sleep(1300);
            }
            else if (playerDeck.cardValue(playerCard) < computerDeck.cardValue(computerCard)) {
                playerDeck.removeCard(playerCard);
                computerDeck.insertCard(playerCard);
                System.out.print(red+" Computer wins the round! \n (P) " + playerCard + " vs (C) " + computerCard);
                System.out.println(" | Player Deck: " + playerDeck.getLength() + " Computer Deck: " + computerDeck.getLength() + "\n");
                Thread.sleep(1300);
            }
            // Draw mechanic
            else if (playerDeck.cardValue(playerCard) == computerDeck.cardValue(computerCard)) {
                
                int removedCards = 0;
                while (playerCard == computerCard) {
                    System.out.print(textColor+" Draw, this means war! ");
                    Thread.sleep(650);
                    System.out.print("Lay out 3 extra cards");
                    Thread.sleep(750);
                    System.out.print(".");
                    Thread.sleep(750);
                    System.out.print(".");
                    Thread.sleep(750);
                    System.out.println(".");
                    Thread.sleep(500);
                    
                    removedCards += 3;
                    playerCardIndex = rand.nextInt(playerDeck.getLength());
                    computerCardIndex = rand.nextInt(computerDeck.getLength());
                    
                    playerCard = playerDeck.getCard(playerCardIndex);
                    computerCard = computerDeck.getCard(computerCardIndex);
                    
                    if (playerDeck.cardValue(playerCard) > computerDeck.cardValue(computerCard)) {
                        computerDeck.removeCard(computerCard);
                        playerDeck.insertCard(computerCard);
                        for(int i =0; i < removedCards; i++) {
                            if (computerDeck.getLength() > 0) {
                                computerCardIndex = rand.nextInt(computerDeck.getLength());
                                computerCard = computerDeck.getCard(computerCardIndex);
                                computerDeck.removeCard(computerCard);
                                playerDeck.insertCard(computerCard);
                            }
                        }
                        System.out.print(green+"Player wins the war!!! \n (P) " + playerCard + " vs (C) " + computerCard);
                        System.out.println(" | Player Deck: " + playerDeck.getLength() + " Computer Deck: " + computerDeck.getLength() + "\n");
                        Thread.sleep(1300);
                        
                    }
                    
                    else if (playerDeck.cardValue(playerCard) < computerDeck.cardValue(computerCard)) {
                        playerDeck.removeCard(playerCard);
                        computerDeck.insertCard(playerCard);
                        
                        for(int i =0; i < removedCards; i++) {
                            if (playerDeck.getLength() > 0) {
                                playerCardIndex = rand.nextInt(playerDeck.getLength());
                                playerCard = playerDeck.getCard(playerCardIndex);
                                playerDeck.removeCard(playerCard);
                                computerDeck.insertCard(playerCard);
                            }
                        }
                        System.out.print(red+" Computer wins the war!!! \n (P) " + playerCard + " vs (C) " + computerCard);
                        System.out.println(" | Player Deck: " + playerDeck.getLength() + " Computer Deck: " + computerDeck.getLength() + "\n");
                        Thread.sleep(1300);
                    }
                    
                }
            }
        }
        
        if (playerDeck.getLength() > computerDeck.getLength()) {
            System.out.println("Player wins!!");
        }
        else if (playerDeck.getLength() < computerDeck.getLength()) {
            System.out.println("Computer wins :(");
        }
        
        
    }
    
    public static void sleepy() {
        
    }  
    
    public static void clearScreen() {  
    System.out.print("\033[H\033[2J");  
    }  
}




/*
 Start Sequence - done
 Player Setup - done
 Deck setup - Done
 Rounds - done but not pretty (it is now pretty)
 Subtracting/adding cards - Done
 Card draw condition - done
 Win Condition - done
 Done!!!!!!!!!!!1
*/