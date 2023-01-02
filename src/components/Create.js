import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
export const Create = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const onCreate = async (e) => {
    e.preventDefault();
    await axios
      .post("https://63b2afd75e490925c51ea156.mockapi.io/data", {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <Form className="create-form" onSubmit={onCreate}>
      <Form.Field>
        <label>First Name</label>
        <input
          name="fname"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          name="lname"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="I agree to the Terms and Conditions"
          onChange={(e) => setCheckbox(!checkbox)}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};
