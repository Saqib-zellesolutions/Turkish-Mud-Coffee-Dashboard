// import logo from './logo.svg';
// import './App.css';

import { ToastContainer } from "react-toastify";
import ThemeProviderWrapper from "./config/themeProvider";
// import Signup from "./component/signup/index.js";
import AppRouter from "./config/route"
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
function App() {
  return (
    <ThemeProviderWrapper>
      {/* <Signup /> */}
      <AppRouter/>
      {/* <h1>hello</h1> */}
      <ToastContainer />
    </ThemeProviderWrapper>
  );
}
export default App;
