import React from "react";
import ReactDOM from "react-dom";

// ... Handsontable with its main dependencies...
import moment from "moment";
import numbro from "numbro";
import pikaday from "pikaday";
import Zeroclipboard from "zeroclipboard";
import Handsontable from "handsontable";
// ... and HotTable
import HotTable from "react-handsontable";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import { Checkbox, Button } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Drawer from "@material-ui/core/Drawer";
import * as style from "./App.css";
import TextField from "@material-ui/core/TextField";
import TableCustom from "./TableCustom";
import Test from "./test";

const styles = theme => ({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          // style: { textAlign: "right" },
          minWidth: 400,
          show: true,
          id: "name",
          Header: "Name",
          // headerStyle: { display: "none" },
          // show: isShow === false ? false : true,
          accessor: "name", // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
          Cell: row => {
            // console.log("row", row);
            return (
              <div>
                <span className="number">{row.value}</span>
              </div>
            );
          }
        },
        {
          minWidth: 400,
          id: "age",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },
        { minWidth: 400, id: "a", show: true, Header: "Age", accessor: "age" },
        {
          minWidth: 400,
          id: "b",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },
        {
          minWidth: 400,
          id: "c",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },
        {
          minWidth: 400,
          id: "d",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },
        {
          minWidth: 400,
          id: "e",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },
        {
          id: "g",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },
        {
          minWidth: 400,
          id: "h",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },
        {
          minWidth: 400,
          id: "i",
          show: true,
          Header: "Age",
          accessor: "age",
          Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
        },

        {
          show: true,
          id: "friendName", // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
          Header: "Friend Name",
          accessor: "friend.name" // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
        },
        {
          id: "friendAge",
          show: true,
          filterable: false,
          Header: "Friend Age", // Tùy biến component Header
          accessor: "friend.age" // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
        }
      ]
    };
  }

  data = [
    {
      name: "Nguyen Van A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen Van A",
      age: null,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen ăeVan A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen Vaasdasn A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen Vaádasn A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },

    {
      name: "Dao Thi B",
      age: 22
    },
    {
      name: "Tran Duc C",
      age: 25,
      friend: {
        name: "Ngo Thanh E",
        age: 25
      }
    },
    {
      name: "Le Tien N",
      age: 27,
      friend: {
        name: "Cao Cong G",
        age: 24
      }
    },
    {
      name: "Pham Hoang M",
      age: 26,
      friend: {
        name: "Lai Hai D",
        age: 25
      }
    },
    {
      name: "Duong Van L",
      age: 23,
      friend: {
        name: "Le Hoang M",
        age: 23
      }
    },
    {
      name: "Nguyen Van A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen Van A",
      age: null,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen ăeVan A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen Vaasdasn A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },
    {
      name: "Nguyen Vaádasn A",
      age: 26,
      friend: {
        name: "Do Van C",
        age: 23
      }
    },

    {
      name: "Dao Thi B",
      age: 22
    },
    {
      name: "Tran Duc C",
      age: 25,
      friend: {
        name: "Ngo Thanh E",
        age: 25
      }
    },
    {
      name: "Le Tien N",
      age: 27,
      friend: {
        name: "Cao Cong G",
        age: 24
      }
    },
    {
      name: "Pham Hoang M",
      age: 26,
      friend: {
        name: "Lai Hai D",
        age: 25
      }
    },
    {
      name: "Duong Van L",
      age: 23,
      friend: {
        name: "Le Hoang M",
        age: 23
      }
    }
  ];

  data2 = [
    {
      name: "huy",
      age: 121,
      render: "Nam"
    },
    {
      name: "huy1",
      age: 122,
      render: "Nam"
    },
    {
      name: "huy2",
      age: 123,
      render: "Nu"
    },
    {
      name: "huy3",
      age: 124,
      render: "Nam"
    },
    {
      name: "huy4",
      age: 125,
      render: "Nu"
    },
    {
      name: "huy5",
      age: null,
      render: "Nam"
    }
  ];
  colum = [
    {
      id: "name",
      Header: "Name",
      accessor: "name"
    },
    {
      id: "age",
      Header: "Age",
      accessor: "age"
    },
    {
      style: { textAlign: "center" },
      // Cell: row => {
      //   return <p style={{ textAlign: "center" }}>{row.value}</p>;
      // },
      id: "render",
      Header: "Gender",
      accessor: "render"
    }
  ];
  render() {
    const { columns } = this.state;

    return (
      // <React.Fragment>
      <TableCustom dataBody={this.data} dataColumnProps={columns} />

      // </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
