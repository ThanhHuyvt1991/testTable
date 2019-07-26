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
import $ from "jquery";
var active = undefined;
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

const reCalculate = e => {
  var rows = $(".rt-tbody .rt-tr-group").length;
  var columns = $(".rt-tbody .rt-tr-group:eq(0) .rt-td").length;
  // alert(columns + "x" + rows);
  switch (e.keyCode) {
    case 37:
      console.log("37");
      // move left or wrap
      active = active > 0 ? active - 1 : active;
      console.log("active left", active);
      break;
    case 38:
      // move up
      active = active - columns >= 0 ? active - columns : active;
      console.log("active up", active);
      break;
    case 39:
      // move right or wrap
      active = active < columns * rows - 1 ? active + 1 : active;
      console.log("active right", active);
      break;
    case 40:
      // move down
      active =
        active + columns <= rows * columns - 1 ? active + columns : active;
      console.log("active dowwn", active);
      break;

    default:
      e.preventDefault();
      break;
  }
};
const rePosition = () => {
  $(".active").removeClass("active");
  $(".rt-tbody .rt-tr-group .rt-td")
    .eq(active)
    .addClass("active")
    .trigger("focus");
  scrollInView();
};
const scrollInView = () => {
  var target = $("rt-tbody rt-tr-group rt-td:eq(" + active + ")");
  if (target.length) {
    var top = target.offset().top;

    $("html,body")
      .stop()
      .animate({ scrollTop: top - 100 }, 400);
    return false;
  }
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // active: 0,
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
    // console.log("mergedObj", result);
    // const c = [...b, this.state.columns];
    // console.log("ccccccccccccccc", c);

    this.setState({
      columns: result,
      [side]: open
    });
  };

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
    let kk = obj1.map(item => {
      return { ...item, ...obj2 };
    });
    let mapObject = {};
    obj2.forEach(item => {
      mapObject[item.id] = item;
    });
    let result = obj1.map(item => {
      return { ...item, ...mapObject[item.id] };
    });
    this.mountEvents();
    document.addEventListener("keydown", e => this.keydown(e));
    document.addEventListener("click", e => {
      console.log("eeeeeeeeeeeeeeeeeeeee", e);

      if (e.target.nodeName === "INPUT") {
        console.log("iiiiiiiiiiii");
        document.removeEventListener("keydown", {});
      }
      console.log("click ne0", e);
      // document.removeEventListener("keydown", () => {
      //   console.log("huy");
      // });
    });
  }
  keydown(e) {
    console.log("keyselce", e);
    reCalculate(e);
    rePosition();
    return false;
  }
  componentDidUpdate() {
    this.mountEvents();
  }
  render() {
    const { classes } = this.props;
    const { columns, dataCol } = this.state;
    const dataShow = columns.filter(item => item.show === true);

    return (
      <div style={{ margin: 30, width: "calc(100vw - 300px)" }}>
        <br />
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
          data={this.data}
          resolveData={data => data.map(row => row)}
          columns={dataShow}
          showPagination={true}
          sortable={true}
          filterable={true}
          colReorder={true}
          resizable={true}
          filterMethod={(filter, row) => {
            console.log("hjhj");
          }}
          // defaultFilterMethod={() => {}}
          defaultSortMethod={() => {
            active = undefined;
            rePosition();
            // console.log("active", active);
          }}
          // className="hjhj"
          // getTrGroupProps={(state, rowInfo, column, instance) => rowInfo}
          // className="-striped -highlight"
          // TrGroupComponent={customTrGroupComponent
          getTdProps={(state, rowInfo, column, instance, index) => {
            return {
              onClick: (e, handleOriginal) => {
                // this.setState({
                //   selected: rowInfo.index
                // });
                // console.log(
                //   "indecolunm",
                //   dataShow.findIndex(i => i.id === column.id)
                // );
                // console.log(" rowInfo.index:", rowInfo.viewIndex);
                // console.log("It was in this row:", rowInfo);
                // console.log("It was in this table instance:", instance);

                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                  active =
                    dataShow.findIndex(i => i.id === column.id) +
                    rowInfo.viewIndex * dataShow.length;
                  reCalculate(e);
                  rePosition();
                }
              }
            };
          }}
        />
        <div />
        <TextField id="standard-name" label="Name" margin="normal" />
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
