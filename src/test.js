/* eslint-disable no-undef */
import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import * as style from "./test.css";
var active = 0;

const styles = theme => ({});

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  reCalculate = e => {
    var rows = $("#navigate tr").length;
    var columns = $("#navigate tr:eq(0) td").length;
    // alert(columns + "x" + rows);

    if (e.keyCode == 37) {
      //move left or wrap
      active = active > 0 ? active - 1 : active;
    }
    if (e.keyCode == 38) {
      // move up
      active = active - columns >= 0 ? active - columns : active;
    }
    if (e.keyCode == 39) {
      // move right or wrap
      active = active < columns * rows - 1 ? active + 1 : active;
    }
    if (e.keyCode == 40) {
      // move down
      active =
        active + columns <= rows * columns - 1 ? active + columns : active;
    }
  };

  rePosition = () => {
    $(".active").removeClass("active");
    $("#navigate tr td")
      .eq(active)
      .addClass("active")
      .trigger("focus");
    this.scrollInView();
  };

  scrollInView = () => {
    var target = $("#navigate tr td:eq(" + active + ")");
    if (target.length) {
      var top = target.offset().top;

      $("html,body")
        .stop()
        .animate({ scrollTop: top - 100 }, 400);
      return false;
    }
  };
  componentDidMount() {
    $(document).keydown(e => {
      //   console.log("eeeee");

      this.reCalculate(e);
      this.rePosition();
      return false;
    });
    $("td").click(() => {
      console.log("td");

      //   alert(this);
      active = $("#navigate")
        .closest("tr")
        .find("td")
        .index(this);
      //   alert(active);
      console.log("active", active);

      this.rePosition();
    });
    // document.addEventListener("keydown", this.keydown);
  }
  keydown = e => {
    this.reCalculate(e);
    this.rePosition();
    return false;
  };
  render() {
    return (
      <div style={{ margin: 30, width: "calc(100vw - 300px)" }}>
        <table id="navigate">
          <tbody>
            <tr>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
            </tr>
            <tr>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
            </tr>
            <tr>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
              <td contenteditable>A1</td>
              <td contenteditable>A2</td>
              <td contenteditable>A3</td>
              <td contenteditable>A4</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
Test.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Test);
