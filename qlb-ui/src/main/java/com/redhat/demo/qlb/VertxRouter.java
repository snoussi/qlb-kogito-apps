package com.redhat.demo.qlb;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

import io.quarkus.vertx.web.Route;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpHeaders;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.vertx.core.http.HttpMethod.GET;
import static java.nio.charset.StandardCharsets.UTF_8;

@ApplicationScoped
public class VertxRouter {

    private static final Logger LOGGER = LoggerFactory.getLogger(VertxRouter.class);

    // @Inject
    // @ConfigProperty(name = "preapproval.service.http.url", defaultValue =
    // "http://localhost:8081")

    @Inject
    Vertx vertx;

    private String resource;

    @PostConstruct
    public void init() {
        try {
            resource = vertx.fileSystem().readFileBlocking("META-INF/resources/index.html").toString(UTF_8);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    void setupRouter(@Observes Router router) {
        router.route("/").handler(ctx -> handle(ctx));
        router.route("/pre-approval").handler(ctx -> handle(ctx));
        router.route().handler(StaticHandler.create());
    }

    public void handle(RoutingContext context) {
        try {
            context.response().putHeader(HttpHeaders.CACHE_CONTROL, "no-cache")
                    .putHeader(HttpHeaders.CONTENT_TYPE, "text/html;charset=utf8").end(resource);
        } catch (Exception ex) {
            LOGGER.error("Error handling index.html", ex);
            context.fail(500, ex);
        }

    }

}