import { BrowserRouter, Switch, Route } from "react-router-dom";
import Board from "./routes/Board";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Board />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
