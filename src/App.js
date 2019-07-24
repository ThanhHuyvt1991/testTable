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
const customTrGroupComponent = props => {
  var extra_style = null;
  if (props.viewIndex % 2 == 0) {
    extra_style = {
      // backgroundColor: "#ebebeb"
    };
  }
  return (
    <div className="rt-tr-group" style={extra_style}>
      {props.children}
    </div>
  );
};
const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      checkedShow: true,
      right: false,
      name: [],
      columns: [
        {
          // style: { textAlign: "right" },
          show: true,
          id: "name",
          Header: "Name",
          // headerStyle: { display: "none" },
          // show: isShow === false ? false : true,
          accessor: "name" // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
        },
        {
          id: "age",
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
  toggleDrawer = (side, open) => () => {
    console.log("this.state", this.state.columns);
    var obj1 = [
      {
        show: false,
        id: "name",
        Header: "Name",
        accessor: "name" // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
      },
      {
        id: "age",
        show: false,
        Header: "Age",
        accessor: "age",
        Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
      },
      {
        show: false,
        id: "friendName", // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
        Header: "Friend Name",
        accessor: "friend.name" // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
      },
      {
        id: "friendAge",
        show: false,
        filterable: false,
        Header: "Friend Age", // Tùy biến component Header
        accessor: "friend.age" // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
      }
    ];
    let mapObject = {};
    this.state.columns.forEach(item => {
      mapObject[item.id] = item;
    });
    let result = obj1.map(item => {
      return { ...item, ...mapObject[item.id] };
    });

    // var mergedObj = [{ ...obj2, ...obj1 }];
    console.log("mergedObj", result);
    // const c = [...b, this.state.columns];
    // console.log("ccccccccccccccc", c);

    this.setState({
      columns: result,
      [side]: open
    });
  };

  names = ["name", "age", "friendName", "friendAge"];
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
      age: 26,
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
  handleChange = item => event => {
    console.log("event.target.checked", event.target.checked);
    console.log("name", item);
    item.show = event.target.checked;
    this.setState({
      // columns: this.state.columns
    });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value
    });
  };

  mountEvents() {
    var headers = Array.prototype.slice.call(
      document.querySelectorAll(".rt-resizable-header-content")
    );
    headers.forEach((header, i) => {
      header.setAttribute("draggable", true);
      header.ondrag = e => e.stopPropagation();
      header.ondragend = e => e.stopPropagation();
      header.ondragover = e => e.preventDefault();

      header.ondragstart = e => {
        e.stopPropagation();
        this.draggedCol = i;
        // Firefox needs this to get draggin workin
        // See https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations
        e.dataTransfer.setData("text", "fix firefox dragevents");
      };

      header.ondrop = e => {
        e.preventDefault();
        // Remove item from array and stick it in a new position.
        console.log("this.state.columns", this.state.columns);

        const test = this.state.columns.filter(i => i.show === true);
        test.splice(i, 0, test.splice(this.draggedCol, 1)[0]);
        const newColLayout = test;
        console.log("newColLayout", newColLayout);

        // Hack to force ReactTable to actually reload. Can someone tell me how to do this better? Or how i can remove this code completely
        this.setState({
          columns: []
        });
        // Reload ReactTable and listen to events as they get broken for some reason.
        this.setState(
          {
            columns: test
          },
          () => {
            // Hack to rebind events as they get lost. Anyway to clean this up?
            this.mountEvents();
          }
        );
      };
    });
  }
  componentDidMount() {
    var obj1 = [
      { show: true, x: 4223, id: 1 },
      { show: true, x: 422233, id: 2 },
      { show: true, x: 2422323, id: 3 }
    ];
    var obj2 = [
      { show: false, x: 13, id: 3 },
      { show: false, x: 23232, id: 2 }
    ];
    let mapObject = {};
    obj2.forEach(item => {
      mapObject[item.id] = item;
    });
    let result = obj1.map(item => {
      return { ...item, ...mapObject[item.id] };
    });

    // var mergedObj = [{ ...obj2, ...obj1 }];
    console.log("mergedObj", result);

    const a = [
      {
        show: false,
        id: "name",
        Header: "Name",
        accessor: "name" // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
      }
    ];
    const b = [
      {
        show: true,
        id: "name",
        Header: "Name",
        accessor: "name" // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
      },
      {
        id: "age",
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
    ];
    const c = [{ ...b, ...a }];
    console.log("c", c);

    this.mountEvents();
  }
  componentDidUpdate() {
    this.mountEvents();
  }

  render() {
    const { classes } = this.props;
    const { columns, dataCol } = this.state;
    const dataShow = columns.filter(item => item.show === true);
    console.log("columnreder", columns);
    console.log("dataShow", dataShow);

    return (
      <div style={{ margin: 30, width: "calc(100vw - 300px)" }}>
        <br />
        {/* <Button onClick={this.toggleDrawer("right", true)}>Open Right</Button> */}
        <div style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={this.toggleDrawer("right", true)}
          >
            Setting
          </Button>
        </div>

        <ReactTable
          defaultPageSize={10}
          row={() => console.log("dsfadsasd")}
          data={this.data}
          resolveData={data => data.map(row => row)}
          columns={dataShow}
          showPagination={true}
          sortable={true}
          filterable={true}
          colReorder={true}
          resizable={true}
          getTrGroupProps={(state, rowInfo, column, instance) => rowInfo}
          className="-striped -highlight"
          TrGroupComponent={customTrGroupComponent}
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {
                  this.setState({
                    selected: rowInfo.index
                  });
                },
                style: {
                  background:
                    rowInfo.index === this.state.selected ? "#00afec" : "",
                  color:
                    rowInfo.index === this.state.selected ? "white" : "black"
                }
              };
            } else {
              return {};
            }
          }}
        />
        <div />
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
        >
          <div tabIndex={0} role="button">
            <h3 style={{ background: "#3f51b5", padding: 12, color: "white" }}>
              Chọn những cột cần ẩn
            </h3>
            {columns.map(item => (
              <MenuItem key={item.id}>
                <Checkbox
                  checked={item.show}
                  onChange={this.handleChange(item)}
                  value="name"
                  color="primary"
                />
                {item.Header}
              </MenuItem>
            ))}
          </div>
        </Drawer>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
