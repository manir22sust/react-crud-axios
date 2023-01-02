import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
export const Update = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [ID, setID] = useState(null);

  const handleUpdate = async () => {
    await axios
      .put(`https://63b2afd75e490925c51ea156.mockapi.io/data/${ID}`, {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {
        navigate("/read");
      });
  };

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
  }, []);

  return (
    <Form className="create-form">
      <Form.Field>
        <label>First Name</label>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="I agree to the Terms and Conditions"
          value={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
      </Form.Field>
      <Button type="submit" onClick={handleUpdate}>
        Update
      </Button>
    </Form>
  );
};
