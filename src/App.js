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

// const columns = [
//   {
//     header: "Name",
//     accessor: "name" // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
//   },
//   {
//     header: "Age",
//     accessor: "age",
//     Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
//   },
//   {
//     id: "friendName", // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
//     header: "Friend Name",
//     accessor: d => d.friend.name // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
//   },
//   {
//     header: props => <span>Friend Age</span>, // Tùy biến component Header
//     accessor: "friend.age" // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
//   }
// ];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handsontableData = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2016", 10, 11, 12, 13],
      ["2017", 20, 11, 14, 13],
      ["2018", 30, 15, 12, 13]
    ];
    this.state = {
      checkedShow: true,
      top: false,
      left: false,
      bottom: false,
      right: false,
      dataDemo: [],
      dataCol: [],
      name: [],
      columns: [
        {
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
    this.setState({
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

    // for (let item of this.state.columns) {
    //   if (item.id === name) {
    item.show = event.target.checked;
    // }
    // }
    this.setState({
      columns: [...this.state.columns]
      // [checked]: event.target.checked
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

  handleClick = e => {
    console.log("col", this.state.columns);
    // for (let item of this.state.columns) {
    //   if (item.accessor === "name") {
    //     item.show = false;
    //   }
    // }
    const Da = [
      (this.state.columns[0].show = false),
      ...this.state.columns
    ].filter(i => i.show === true);
    this.setState({
      columns: Da
    });
    console.log("col2", this.state.columns);
  };

  render() {
    // $("table tr").each(function() {
    //   var tr = $(this);
    //   var td1 = tr.find("td:eq(1)"); // indices are zero-based here
    //   var td2 = tr.find("td:eq(3)");
    //   td1.detach().insertAfter(td2);
    // });
    const { classes } = this.props;
    const { columns, dataCol } = this.state;
    // dataCol = columns;
    console.log("columnreder", columns);
    // const sideList = (
    //   <div className={classes.list}>
    //     {this.names.map(name => (
    //       <MenuItem key={name} value={name}>
    //         <Checkbox
    //           onChange={this.handleChange(name)}
    //           value="name"
    //           color="primary"
    //         />

    //         {name}
    //       </MenuItem>
    //     ))}
    //   </div>
    // );

    return (
      <div style={{ margin: 30, width: "calc(100vw - 300px)" }}>
        <HotTable
          style={{ width: "100vw" }}
          data={this.handsontableData}
          width="calc(100vw - 200px)"
          height="300"
          stretchH="all"
          manualColumnResize={true}
          manualColumnMove={true}
          maxRows={5}
          colHeaders={["Nam", "Country", "Code", "Currency", "Level"]}
          columnSorting={true}
          filterable={true}
          hiddenColumns={{
            columns: [1, 2],
            indicators: true
          }}
        />
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
          // getThProps={(state, rowInfo, column, instance) => {
          //   return {
          //     onClick: (e, handleOriginal) => {
          //       console.log("A Td Element was clicked!");
          //       console.log("it produced this event:", e);
          //       console.log("It was in this column:", column);
          //       console.log("It was in this row:", rowInfo);
          //       console.log("It was in this table instance:", instance);

          //       // IMPORTANT! React-Table uses onClick internally to trigger
          //       // events like expanding SubComponents and pivots.
          //       // By default a custom 'onClick' handler will override this functionality.
          //       // If you want to fire the original onClick handler, call the
          //       // 'handleOriginal' function.
          //       if (handleOriginal) {
          //         handleOriginal();
          //       }
          //     }
          //   };
          // }}
          // getTrProps={(state, rowInfo, column) => {
          //   return {
          //     style: {
          //       background: rowInfo.row.age > 24 ? "green" : "red"
          //     }
          //   };
          // }}
          hiddenColumns={[1]}
          data={this.data}
          columns={columns}
          defaultPageSize={5}
          showPagination={true}
          sortable={true}
          filterable={true}
          colReorder={true}
          resizable={false}

          // filterAll={false}
        />
        <button onClick={this.handleClick}>click</button>
        <div>
          <div
            id="example1"
            class="hot handsontable htRowHeaders htColumnHeaders"
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple">Name</InputLabel>
            <Select
              multiple
              value={this.state.name}
              // onChange={this.handleChange}
              input={<Input id="select-multiple" />}
              MenuProps={MenuProps}
            >
              {this.names.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={this.state.checkedShow}
                    onChange={this.handleChange(name)}
                    value="name"
                    color="primary"
                  />

                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={this.toggleDrawer("right", false)}
            // onKeyDown={this.toggleDrawer("right", false)}
          >
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
