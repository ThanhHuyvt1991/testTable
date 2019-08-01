import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import $ from "jquery";
import * as style from "./TableCustom.css";
var active = undefined;
const styles = theme => ({});
var scrollIntoView = require("scroll-into-view");

class TableCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataColum: [],
      selected: null,
      checkedShow: true,
      right: false,
      name: []
    };
  }
  activeKeyCode = e => {
    var rows = $(".rt-tbody .rt-tr-group").length;
    var columns = $(".rt-tbody .rt-tr-group:eq(0) .rt-td").length;
    switch (e.keyCode) {
      case 37:
        // move left or wrap
        active = active > 0 ? active - 1 : active;
        break;
      case 38:
        // move up
        active = active - columns >= 0 ? active - columns : active;
        break;
      case 39:
        // move right or wrap
        active = active < columns * rows - 1 ? active + 1 : active;
        this.scrollWin(400, 0);
        break;
      case 40:
        // move down
        active =
          active + columns <= rows * columns - 1 ? active + columns : active;
        break;

      default:
        e.preventDefault();
        break;
    }
  };
  scrollWin = (x, y) => {
    window.scrollBy(x, y);
  };
  rePosition = () => {
    $(".active").removeClass("active");
    $(".rt-tbody .rt-tr-group .rt-td")
      .eq(active)
      .addClass("active")
      .trigger("focus");
    this.scrollInView();
  };
  scrollInView = () => {
    scrollIntoView($(".rt-tbody .rt-tr-group .rt-td:eq(" + active + ")"));
    // var target = $(".rt-tbody .rt-tr-group .rt-td:eq(" + active + ")");
    // console.log("target.active", active);
    // console.log("target.length", target.length);
    // if (target.length) {
    //   var e = document.getElementById("hjhj");
    //   var x = e.scrollLeft;
    //   console.log("x", x);
    //   e.scrollIntoView({ behavior: "smooth", inline: "start" });

    // var left = target.offset().left;
    // console.log("left", left);
    // $("html,body")
    //   .stop()
    //   .animate({ scrollLeft: left + 300 }, 400);
    // return false;
    // }
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  handleChange = item => event => {
    item.show = event.target.checked;
    this.setState({
      dataColum: this.props.dataColumnProps
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
        const colChange = this.state.dataColum.filter(i => i.show === true);
        colChange.splice(i, 0, colChange.splice(this.draggedCol, 1)[0]);
        // Hack to force ReactTable to actually reload. Can someone tell me how to do this better? Or how i can remove this code completely
        this.setState({
          dataColum: []
        });
        // Reload ReactTable and listen to events as they get broken for some reason.
        this.setState(
          {
            dataColum: colChange
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
    $(".rt-tbody").attr("id", "hjhj");
    if (this.props.dataColumnProps) {
      this.setState({
        dataColum: this.props.dataColumnProps
      });
    }
    this.mountEvents();
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("click", e => {
      if (e.target.nodeName == "INPUT") {
        document.removeEventListener("keydown", this.keydown);
      } else {
        document.addEventListener("keydown", this.keydown);
      }
    });
    // }
  }
  keydown = e => {
    this.activeKeyCode(e);
    this.rePosition();
    return false;
  };
  componentDidUpdate() {
    this.mountEvents();
  }
  render() {
    const { dataColum } = this.state;
    const { dataBody, dataColumnProps } = this.props;
    const dataShow = dataColum.filter(item => item.show === true);

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
          data={dataBody}
          resolveData={data => data.map(row => row)}
          columns={dataShow}
          showPagination={true}
          sortable={true}
          filterable={true}
          colReorder={true}
          resizable={true}
          filterMethod={(filter, row) => {}}
          defaultSortMethod={() => {
            active = undefined;
            this.rePosition();
          }}
          getTdProps={(state, rowInfo, column, instance, index) => {
            return {
              onClick: (e, handleOriginal) => {
                if (handleOriginal) {
                  active =
                    dataShow.findIndex(i => i.id === column.id) +
                    rowInfo.viewIndex * dataShow.length;
                  console.log("active select", active);
                  console.log("rowInfo", rowInfo);
                  console.log("dataShow", dataShow);
                  console.log("column", column);
                  console.log(
                    "dataShow.findIndex(i => i.id === column.id)",
                    dataShow.findIndex(i => i.id === column.id)
                  );

                  this.activeKeyCode(e);
                  this.rePosition();
                }
              }
            };
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
              Select the columns to hide
            </h3>
            {dataColumnProps.map(item => (
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
TableCustom.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(TableCustom);
