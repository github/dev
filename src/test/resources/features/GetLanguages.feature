Feature:

  Scenario Outline: Get the favourite/mostly used language by a Github user
    Given I send a request to get the "<user>" information
    Then I can print the favourite language of that "<user>"
    Examples:
    |user          |
    | PoonamRBorge |
    | agnenevulyte |
    | Kamel-adjal  |
    | Vamc264      |

