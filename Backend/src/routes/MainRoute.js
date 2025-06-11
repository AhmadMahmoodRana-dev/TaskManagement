import AuthRoute from "./Auth/Auth.routes.js";

const MainRoute = (app) => {
  app.use("/api", AuthRoute);
};

export default MainRoute;