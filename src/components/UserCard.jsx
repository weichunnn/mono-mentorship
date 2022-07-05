import { useNavigate } from "react-router";
import { Avatar, Stack } from "rsuite";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      spacing={20}
      justifyContent="flex-start"
      alignItems="center"
      onClick={() => navigate("/user", { state: user })}
    >
      <Avatar
        size="lg"
        circle
        src={user.picture}
        alt={`image of user ${user.name}`}
      />
      <p style={{ fontWeight: "bold", fontSize: "20px" }}> {user.name}</p>
    </Stack>
  );
}
