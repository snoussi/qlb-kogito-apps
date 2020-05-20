package com.redhat.demo.qlb;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class VertxRouterTest {

    @Test
    public void testHandlePath() {
        given().when().get("/").then().statusCode(200);

        given().when().get("/pre-approval").then().statusCode(200);

        given().when().get("/Another").then().statusCode(404);
    }
}