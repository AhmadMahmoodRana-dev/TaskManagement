import AuthRoute from "./Auth/Auth.routes.js";
import chatRoute from "./Main/Chat.routes.js";
import ProjectRoute from "./Main/Project.routes.js";
import TaskRoute from "./Main/Task.routes.js";

const MainRoute = (app) => {
  app.use("/api", AuthRoute,ProjectRoute,TaskRoute,chatRoute);
};

export default MainRoute;