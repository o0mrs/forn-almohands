

import {Routes,Route} from "react-router-dom";
import Add from "./com/add";
import Auth from "./com/auth";
import Home from "./com/home";
import Records from "./com/records";
function App() {

  return (
<Routes>
{/* pathes */}
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Auth />}></Route>
      <Route path="/records" element={<Records />}></Route>
      <Route path="/add" element={<Add />}></Route>
      <Route path="/" element={<Home />}></Route>
      </Routes>
  );
}

export default App;