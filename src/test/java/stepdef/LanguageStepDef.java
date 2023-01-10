package stepdef;

import core.Languages;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;


public class LanguageStepDef {
    Languages languages = new Languages();
    Response response;

    @When("I send a request to get the {string} information")
    public void sendRequest(String userName){
        response = languages.sendRequest(userName);
    }

    @Then("I can print the favourite language of that {string}")
    public void printFavouriteLanguage(String userName){
        languages.getUserLanguages(response, userName);
    }
}
