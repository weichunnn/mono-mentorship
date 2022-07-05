export default function Header({ children, subtitle }) {
  return (
    <div style={{ margin: "20px 0px" }}>
      <h2>{children}</h2> <p style={{ marginTop: "10px" }}>{subtitle}</p>
    </div>
  );
}
