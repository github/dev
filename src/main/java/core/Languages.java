package core;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.Assert;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Languages {

private String ENDPOINT_GET_LANGUAGES = "https://api.github.com/users/";
private RequestSpecification requestSpecification;

    public void getUserLanguages(Response response, String userName){
        Map<String, Integer> langMap= new HashMap<String,Integer>();
        System.out.println(userName + " Languages: " + response.jsonPath().get("language"));
        ArrayList<String> langs = response.jsonPath().get("language");
        for (String lang : langs) {
            langMap.put(lang, (Collections.frequency(langs, lang)));
        }
        Object maxLang = Collections.max(langMap.entrySet(), Map.Entry.comparingByValue()).getKey();
        if (maxLang == null) {
            System.out.println(userName + " has no Languages available");
        } else
            System.out.println(userName + " Favourite Language is: " + maxLang.toString());
    }

    public Response sendRequest(String userName){
        RestAssured.baseURI = ENDPOINT_GET_LANGUAGES + userName + "/repos?per_page=200";
        requestSpecification = RestAssured.given();
        return requestSpecification.request(Method.GET);
    }

}
