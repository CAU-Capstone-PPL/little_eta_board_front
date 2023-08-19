import { BrowserRouter, Switch, Route } from "react-router-dom";
import Board from "./routes/Board";
import Posts from "./routes/Posts";
import Post from "./routes/Post";
import Write from "./routes/Write";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/board=:bno/write">
          <Write />
        </Route>
        <Route path="/board=:bno/pno=:pno">
          <Post />
        </Route>
        <Route path="/board=:bno">
          <Posts />
        </Route>
        <Route path="/">
          <Board />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
