import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {
  Switch,
  FormControlLabel,
  InputLabel,
  FormControl,
  Select,
  Input,
  NativeSelect
} from "@material-ui/core";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import clone from "clone";
import Info from "@material-ui/icons/Info";
import BorderColor from "@material-ui/icons/BorderColor";
const ReactTableFixedColumns = withFixedColumns(ReactTable);
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isEdit: false,
      isInfo: false,
      isCreate: false,
      infoProject: {},
      selected: null,
      titleName: "",
      name: "",
      datas: []
    };
  }
  projectType = ["Online", "Offline", "Online+Offline"];
  data = [
    {
      project_code: 45,
      project_name: "Tanner Linsley",
      customer_name: "Thanh Huy",
      description: "cuoc song nhiem mau",
      contact_name: "Huy",
      position_contact_per: "Chu tich",
      phone_contact_per: 4534536334,
      email_contact_per: "Chu tich",
      project_term: "1 thang",
      start_date: "12-12-2012",
      end_date: "12-12-2012",
      project_type: "online",
      connect_method: "VPN",
      off_project_app: "DGS1",
      volume: 234,
      currency: "USD",
      credit_term: "15 ngay",
      charging_rate_ot: "150%",
      charging_rate_holidays: "150%",
      other_services: "test",
      project_complex: 1
    }
  ];
  columns = [
    {
      Header: "Project Code",
      accessor: "project_code" // String-based value accessors!
    },
    {
      Header: "Project Name",
      accessor: "project_name" // String-based value accessors!
    },
    {
      Header: "Project Name",
      accessor: "customer_name" // String-based value accessors!
    },
    {
      Header: "Descreption",
      accessor: "description" // String-based value accessors!
    },
    {
      Header: "Contact Name",
      accessor: "contact_name" // String-based value accessors!
    },
    {
      Header: "Position of Contact Person",
      accessor: "position_contact_per" // String-based value accessors!
    },
    {
      Header: "Phone of Contact Person",
      accessor: "phone_contact_per" // String-based value accessors!
    },
    {
      Header: "Email of Contact Person",
      accessor: "email_contact_per" // String-based value accessors!
    },
    {
      Header: "Project Term",
      accessor: "project_term" // String-based value accessors!
    },
    {
      Header: "Start Date",
      accessor: "start_date" // String-based value accessors!
    },
    {
      Header: "End Date",
      accessor: "end_date" // String-based value accessors!
    },
    {
      Header: "Project Type",
      accessor: "project_type" // String-based value accessors!
    },
    {
      Header: "Connect Method",
      accessor: "connect_method" // String-based value accessors!
    },
    {
      Header: "Off Project App",
      accessor: "off_project_app" // String-based value accessors!
    },
    {
      Header: "Volume",
      accessor: "volume" // String-based value accessors!
    },
    {
      Header: "Currency",
      accessor: "currency" // String-based value accessors!
    },
    {
      Header: "Credit Term",
      accessor: "credit_term" // String-based value accessors!
    },
    {
      Header: "Charging Rate OT",
      accessor: "charging_rate_ot" // String-based value accessors!
    },
    {
      Header: "Charging Rate Holidays",
      accessor: "charging_rate_holidays" // String-based value accessors!
    },
    {
      Header: "Other Services",
      accessor: "other_services" // String-based value accessors!
    },
    {
      Header: "Project Complex",
      accessor: "project_complex" // String-based value accessors!
    },
    {
      Header: "Total Bacth",
      accessor: "total_bacth" // String-based value accessors!
    },
    {
      Header: "From Date Setup",
      accessor: "from_date_setup" // String-based value accessors!
    },
    {
      Header: "To Date Setup",
      accessor: "to_date_setup" // String-based value accessors!
    },
    {
      Header: "From Date Test",
      accessor: "from_date_test" // String-based value accessors!
    },
    {
      Header: "To Date Test",
      accessor: "to_date_test" // String-based value accessors!
    },
    {
      Header: "Planned FTE",
      accessor: "planned_fte" // String-based value accessors!
    },

    {
      Header: "Action",
      accessor: "table_id",
      Cell: (row, e) => (
        <div style={{ textAlign: "center", textDecoration: "underline" }}>
          <a
            style={{ paddingRight: 12, cursor: "pointer" }}
            onClick={() => this.showProject(row.original)}
          >
            <Tooltip title="Show Info" placement="left">
              <Info style={{ fontSize: 16, color: "#2196f3" }} />
            </Tooltip>
          </a>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => this.editProject(row.original)}
          >
            <Tooltip title="Edit" placement="left">
              <BorderColor style={{ fontSize: 16, color: "#0000008a" }} />
            </Tooltip>
          </a>
        </div>
      ),
      fixed: "right"
    }
  ];
  addNewProject = () => {
    this.setState({
      open: true,
      isCreate: true,
      isInfo: false,
      isEdit: false,
      infoProject: {},
      titleName: "Create New Project"
    });
    console.log(this.state.infoProject.start_date);
  };
  editProject = row => {
    this.setState({
      infoProject: row,
      isInfo: false,
      isEdit: true,
      isCreate: false,
      open: true,
      titleName: "Edit Project"
    });
  };
  showProject = row => {
    this.setState({
      infoProject: row,
      isInfo: true,
      isEdit: false,
      isCreate: false,
      open: true,
      titleName: "Project Informaiton"
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    console.log("e", event.target.name);
    console.log("ev", event.target.value);

    const target = event.target;
    var value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const infoProject = clone(this.state.infoProject);
    infoProject[name] = value;
    this.setState({ infoProject: infoProject });
  };
  addUpdateProject = () => {
    console.log("d", this.state.datas);

    console.log("this.data", this.data);

    if (this.state.isCreate) {
      console.log("tao moi", this.state.infoProject);
      fetch("http://5d3fbc05c516a90014e8908e.mockapi.io/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.infoProject)
      })
        .then(response => response.json())
        .then(res => {
          console.log("dfsd", res);
          this.getProjects();
          this.setState({ open: false });
        });
    } else {
      console.log("edit", this.state.infoProject);
      fetch(
        "http://5d3fbc05c516a90014e8908e.mockapi.io/projects/" +
          this.state.infoProject.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state.infoProject)
        }
      )
        .then(response => response.json())
        .then(res => {
          console.log("dfsd", res);
          this.getProjects();
          this.setState({ open: false });
        });
    }
  };
  getProjects = () => {
    fetch("http://5d3fbc05c516a90014e8908e.mockapi.io/projects")
      .then(response => response.json())
      .then(datas => this.setState({ datas }));
  };
  componentDidMount() {
    this.getProjects();
  }
  handleChosseProjectType = event => {
    console.log(event.target.value);
  };
  render() {
    const { classes } = this.props;
    const { isEdit, infoProject, isInfo } = this.state;
    return (
      <React.Fragment>
        <div>
          <div
            style={{ width: "100%", display: "inline-block", paddingTop: 12 }}
          >
            <h2 style={{ margin: 0, padding: 12, float: "left" }}>
              Project Manager
            </h2>
            <Fab
              color="primary"
              size="small"
              aria-label="Add"
              style={{ float: "right", marginRight: 12 }}
            >
              <Tooltip title="Create Project" placement="left">
                <AddIcon onClick={this.addNewProject} />
              </Tooltip>
            </Fab>
          </div>
          <Paper style={{ padding: "0 12px" }}>
            <ReactTableFixedColumns
              data={this.state.datas}
              columns={this.columns}
            />
          </Paper>
          {/* diglog */}
          <Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              id="form-dialog-title"
              style={{ borderBottom: "1px solid #e0e0e0" }}
            >
              <Grid container spacing={24}>
                <Grid item xs={6} style={{ position: "relative" }}>
                  {this.state.titleName}
                  <FormControlLabel
                    style={{ position: "absolute", top: 30, left: 12 }}
                    control={<Switch color="primary" />}
                    label="Active"
                  />
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <Button
                    onClick={this.handleClose}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 12 }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={this.handleClose}
                    variant="contained"
                    style={{ background: "red", color: "white" }}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={24} style={{ paddingTop: 12 }}>
                <Grid item xs={4}>
                  <h3 style={{ margin: 0, color: "#2196f3" }}>Info Project:</h3>
                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "30%", paddingRight: 16 }}
                      autoFocus
                      margin="dense"
                      name="project_code"
                      label="Project Code"
                      type="number"
                      disabled={isInfo}
                      value={infoProject.project_code}
                      onChange={this.handleChange}
                    />
                    <TextField
                      style={{ width: "70%" }}
                      margin="dense"
                      name="project_name"
                      label="Project Name"
                      maxLength="3"
                      disabled={isInfo}
                      value={infoProject.project_name}
                      onChange={this.handleChange}
                    />
                    <TextField
                      margin="dense"
                      fullWidth
                      name="customer_name"
                      label="Customer Name"
                      maxLength="3"
                      disabled={isInfo}
                      value={infoProject.customer_name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <TextField
                    margin="dense"
                    name="description"
                    label="Descreption"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.description}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="contact_name"
                    label="Contact Name"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.contact_name}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="position_contact_per"
                    label="Position of Contact Person"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.position_contact_per}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="phone_contact_per"
                    label="Phone of Contact Person"
                    type="number"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.phone_contact_per}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="email_contact_per"
                    label="Email of Contact Person"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.email_contact_per}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="project_term"
                    label="Project Term"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.project_term}
                    onChange={this.handleChange}
                  />
                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "50%", paddingRight: 16 }}
                      name="start_date"
                      label="Start Date"
                      type="date"
                      fullWidth
                      disabled={isInfo}
                      defaultValue={infoProject.start_date}
                      onChange={this.handleChange}
                    />
                    <TextField
                      margin="dense"
                      style={{ width: "50%" }}
                      name="end_date"
                      label="End Date"
                      fullWidth
                      type="date"
                      disabled={isInfo}
                      defaultValue={infoProject.end_date}
                      onChange={this.handleChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={4} style={{ paddingTop: 33 }}>
                  {/* <h3 style={{ margin: 0, color: "#2196f3" }}>Info Bank:</h3> */}
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Project Type
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="project_type"
                      defaultValue={infoProject.project_type}
                      input={
                        <Input name="project_type" id="uncontrolled-native" />
                      }
                    >
                      <option value="" />
                      {this.projectType.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  {(infoProject.project_type === "Online" ||
                    infoProject.project_type === "Online+Offline") && (
                    <TextField
                      margin="dense"
                      name="connect_method"
                      label="Connect Method"
                      fullWidth
                      disabled={isInfo}
                      value={infoProject.connect_method}
                      onChange={this.handleChange}
                    />
                  )}
                  <TextField
                    margin="dense"
                    name="off_project_app"
                    label="Off Project App"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.off_project_app}
                    onChange={this.handleChange}
                  />
                  {/* <h3 style={{ margin: 0, color: "#2196f3", paddingTop: 35 }}>
                    Info Other:
                  </h3> */}
                  <TextField
                    margin="dense"
                    name="volume"
                    label="Volume"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.volume}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="currency"
                    label="Currency"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.currency}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="credit_term"
                    label="Credit Term"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.credit_term}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="charging_rate_ot"
                    label="Charging Rate OT"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.charging_rate_ot}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="charging_rate_holidays"
                    label="Charging Rate Holidays"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.charging_rate_holidays}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="other_services"
                    label="Other Services"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.other_services}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="project_complex"
                    label="Project Complex"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.project_complex}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={4} style={{ paddingTop: 33 }}>
                  <TextField
                    margin="dense"
                    name="total_bacth"
                    label="Total Bacth"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.total_bacth}
                    onChange={this.handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="total_bacth"
                    label="Total Bacth"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.total_bacth}
                    onChange={this.handleChange}
                  />
                  Time Setup
                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "50%", paddingRight: 16 }}
                      name="from_date_setup"
                      label="From Date"
                      type="date"
                      fullWidth
                      disabled={isInfo}
                      defaultValue={infoProject.from_date_setup}
                      onChange={this.handleChange}
                    />
                    <TextField
                      margin="dense"
                      style={{ width: "50%" }}
                      name="to_date_setup"
                      label="To Date"
                      fullWidth
                      type="date"
                      disabled={isInfo}
                      defaultValue={infoProject.to_date_setup}
                      onChange={this.handleChange}
                    />
                  </div>
                  Time Testing
                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "50%", paddingRight: 16 }}
                      name="from_date_test"
                      label="From Date"
                      type="date"
                      fullWidth
                      disabled={isInfo}
                      defaultValue={infoProject.from_date_test}
                      onChange={this.handleChange}
                    />
                    <TextField
                      margin="dense"
                      style={{ width: "50%" }}
                      name="to_date_test"
                      label="To Date"
                      fullWidth
                      type="date"
                      disabled={isInfo}
                      defaultValue={infoProject.to_date_test}
                      onChange={this.handleChange}
                    />
                  </div>
                  <TextField
                    margin="dense"
                    name="planned_fte"
                    label="Planned FTE"
                    fullWidth
                    disabled={isInfo}
                    defaultValue={infoProject.planned_fte}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            {this.state.isInfo ? (
              <DialogActions>
                <Button variant="contained" onClick={this.handleClose}>
                  Close
                </Button>
              </DialogActions>
            ) : (
              <DialogActions>
                <Button variant="contained" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={this.addUpdateProject}
                  variant="contained"
                  color="primary"
                >
                  {this.state.isCreate ? "Create" : "Update"}
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </div>
      </React.Fragment>
    );
  }
}
export default Project;
