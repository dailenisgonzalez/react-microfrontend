import root from "react-shadow";
import ComponentBridge from "./core/ComponentBridge";
import ProfileCard from "./features/ProfileCard";

function App() {
  return (
    <root.div>
      React features are now accessible from the AngularJS app
      <ComponentBridge
        components={{
          "profile-card": ProfileCard,
        }}
      />
    </root.div>
  );
}

export default App;
