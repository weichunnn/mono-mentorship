import styles from "./app.module.css";
import AppRouter from "./router";
import cn from "classnames";

function App() {
  return (
    <div className={cn(["App", styles.wrapper])}>
      <div style={{ padding: "16px", height: "100%" }}>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
