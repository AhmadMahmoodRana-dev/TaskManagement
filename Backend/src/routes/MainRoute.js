import AuthRoute from "./Auth/Auth.routes.js";
import ProjectRoute from "./Main/Project.routes.js";

const MainRoute = (app) => {
  app.use("/api", AuthRoute,ProjectRoute);
};

export default MainRoute;