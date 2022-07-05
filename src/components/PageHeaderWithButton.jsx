import { IconButton } from "rsuite";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import { useNavigate } from "react-router";

export default function PageHeaderWithButton({ children }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: "20px",
      }}
    >
      <IconButton
        icon={<ArowBackIcon />}
        size="lg"
        onClick={() => navigate(-1)}
        style={{ marginRight: "20px" }}
      />
      {children && <h4>{children}</h4>}
    </div>
  );
}
