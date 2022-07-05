import styles from "./app.module.css";
import AppRouter from "./router";
import cn from "classnames";

function App() {
  return (
    <div className={cn(["App", styles.wrapper])}>
      <div
        style={{
          padding: "20px",
          paddingTop: "40px",
          height: "100%",
        }}
      >
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
