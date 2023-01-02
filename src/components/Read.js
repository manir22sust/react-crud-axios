import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";

export const Read = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://63b2afd75e490925c51ea156.mockapi.io/data`)
      .then((response) => {
        setApiData(response.data);
      });
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
  };

  const getData = async () => {
    await axios
      .get(`https://63b2afd75e490925c51ea156.mockapi.io/data`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };
  const onDelete = async (id) => {
    await axios
      .delete(`https://63b2afd75e490925c51ea156.mockapi.io/data/${id}`)
      .then(() => {
        getData();
      });
  };
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> ID </Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            {/* <Table.HeaderCell>Checked</Table.HeaderCell> */}
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {apiData.map((value, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{value.id} </Table.Cell>
                <Table.Cell>{value.firstName} </Table.Cell>
                <Table.Cell>{value.lastName} </Table.Cell>
                <Table.Cell>
                  {value.checkbox ? "Checked" : "Unchecked"}
                </Table.Cell>

                <Table.Cell>
                  <Link to="/update">
                    <Button color="green" onClick={() => setData(value)}>
                      Update
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => onDelete(value.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
