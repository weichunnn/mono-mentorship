import { useState, useRef } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import PageHeaderWithButton from "../components/PageHeaderWithButton";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { DatePicker, Form, Schema } from "rsuite";
import { useLocation, useNavigate } from "react-router";
const { DateType } = Schema.Types;

const ScheduleCall = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { mentorEmail } = useLocation().state;
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    time: null,
    date: null,
  });
  const [loading, setLoading] = useState(false);
  const [scheduleState, setScheduleState] = useState(false);
  const navigate = useNavigate();
  const model = Schema.Model({
    time: DateType().isRequired(),
    date: DateType().isRequired(),
  });

  const handleSubmit = async () => {
    setLoading(true);
    if (formRef.current.check()) {
      try {
        const token = await getAccessTokenSilently();
        await fetch("http://localhost:3001/api/session/schedule", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formValue,
            mentee: user.email,
            mentor: mentorEmail,
          }),
        });
        setScheduleState(true);
      } catch (e) {
        // something wrong happened
      }
    }
    setLoading(false);
  };

  return (
    <>
      {scheduleState ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h4 style={{ textAlign: "center" }}>
            Your appointment request has been sent to your mentor.
          </h4>
          <Button
            appearance="primary"
            block
            size="lg"
            height="40px"
            style={{ marginTop: "40px" }}
            onClick={() => navigate("/home")}
          >
            Return
          </Button>
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PageHeaderWithButton>Schedule a call</PageHeaderWithButton>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              justifyContent: "space-between",
            }}
          >
            <Form
              fluid
              onChange={setFormValue}
              ref={formRef}
              formValue={formValue}
              model={model}
            >
              <Form.Group controlId="time">
                <Form.ControlLabel style={{ fontSize: "16px" }}>
                  Time
                </Form.ControlLabel>
                <Form.Control
                  name="time"
                  accepter={DatePicker}
                  placeholder="Now"
                  block
                  size="lg"
                  format="HH:mm"
                  ranges={[]}
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.ControlLabel style={{ fontSize: "16px" }}>
                  Date
                </Form.ControlLabel>
                <Form.Control
                  name="date"
                  accepter={DatePicker}
                  placeholder="Today"
                  block
                  size="lg"
                />
              </Form.Group>
              <Button
                loading={loading}
                appearance="primary"
                block
                onClick={handleSubmit}
                style={{ height: "40px", marginTop: "40px" }}
              >
                Submit
              </Button>
            </Form>
          </div>
          <div style={{ flex: "1" }}></div>
        </div>
      )}
    </>
  );
};

export default withAuthenticationRequired(ScheduleCall, {
  onRedirecting: () => <Loading />,
});
