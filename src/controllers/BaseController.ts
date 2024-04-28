
import express from "express";
import HttpController from "../core/HttpController";

export default class BaseController extends HttpController {
  public path = "/api";

  constructor() {
    super();
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get("/", this.getAllHero);
    this.router.get("/create", this.create);
  }
  private getAllHero  (request: express.Request, response: express.Response) {
    // console.log(request.query);

    response.json({message : "run success"});
  };
  private create  (request: express.Request, response: express.Response) {
    response.json({message : "Create"});
  };
}