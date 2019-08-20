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
  Input,
  NativeSelect,
  InputAdornment
} from "@material-ui/core";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import clone from "clone";
import Info from "@material-ui/icons/Info";
import BorderColor from "@material-ui/icons/BorderColor";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
const ReactTableFixedColumns = withFixedColumns(ReactTable);
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
      datas: [],
      nametest: []
    };
  }
  projectType = ["Online", "Offline", "Online+Offline"];
  projectTerm = ["One Time", "Long Term", "Frequent"];
  frequency = ["f1", "f2", "f3"];
  connectionMethod = ["VPN", "Web Application", "Customer's System"];
  offProjectApp = ["DGS1", "DGS 3", "Extra tool", "PMS"];
  billingUnit = [
    "Record",
    "Field",
    "Document",
    "Per 1,000 Characters",
    "Image",
    "Line Item"
  ];
  currency = ["USD", "EUR", "VND", "JPY"];
  creditTerm = [
    "15 Days",
    "30 Days",
    "45 Days",
    "60 Days",
    "75 Days",
    "90 Days"
  ];
  rateOT = ["None", "150%", "200%", "300%", , "Others"];
  rateHoliday = ["None", "150%", "200%", "300%", , "Others"];
  projectComplex = ["1", "2", "3", "4"];
  requireOperation = ["Phong Rieng", "Camera", "ISO", "Others"];
  requireDeliver = ["None", "sFTP", "FTP"];
  contractType = [
    "NDA",
    "GSA",
    "ISA",
    "SOW",
    "Quotation",
    "Email Confirmation"
  ];
  // qcUnit=[Record, field, document, per 1,000 characters, image, line item]
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
      Header: "Frequency",
      accessor: "frequency"
    },
    {
      Header: "DIGI's Team",
      accessor: "digi_team"
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
      Header: "Input Format",
      accessor: "input_format" // String-based value accessors!
    },
    {
      Header: "Output Format",
      accessor: "output_format" // String-based value accessors!
    },
    {
      Header: "Volume",
      accessor: "volume" // String-based value accessors!
    },
    {
      Header: "Forecast",
      accessor: "forecast" // String-based value accessors!
    },
    {
      Header: "Billing Unit",
      accessor: "billing_unit"
    },
    {
      Header: "Types Number",
      accessor: "type_of_form_numb"
    },
    {
      Header: "Unit Price",
      accessor: "unit_price"
    },
    {
      Header: "Package Price",
      accessor: "package_price"
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
      Header: "Steps Of Process",
      accessor: "steps_of_process" // String-based value accessors!
    },
    {
      Header: "Target Speed",
      accessor: "target_speed"
    },
    {
      Header: "Project Complex",
      accessor: "project_complex" // String-based value accessors!
    },
    {
      Header: "Digi-pay Unit Wage",
      accessor: "digipay_unit_wage" // String-based value accessors!
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
      Header: "Shift(s)",
      accessor: "shift" // String-based value accessors!
    },
    {
      Header: "Security Requirement Delivery",
      accessor: "security_require_delivery"
    },
    {
      Header: "Security Requirement Operation",
      accessor: "security_require_operation"
    },
    {
      Header: "Security Requirement Communication",
      accessor: "security_require_communication"
    },
    {
      Header: "Security Requirement Delete",
      accessor: "security_require_delete"
    },
    {
      Header: "Contract Type",
      accessor: "contract_type",
      Cell: props => <span className="number">{props.value}</span>
    },
    {
      Header: "Contract Expiration Date",
      accessor: "contract_expiration_date"
    },
    {
      Header: "Quality Level",
      accessor: "quality_level"
    },
    {
      Header: "QC Unit",
      accessor: "qc_unit"
    },
    {
      Header: "QC Schedule",
      accessor: "qc_schedule"
    },
    {
      Header: "QAE",
      accessor: "qae"
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
      nametest: [],
      titleName: "Create New Project"
    });
    console.log("type", this.state.infoProject.con);
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
    this.state.infoProject.contract_type = this.state.nametest;
    // this.state.infoCustomer.attachment = this.state.attacmentSelect;
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
      console.log("edit", this.state.infoProject.contract_type);
      fetch(
        "http://5d3fbc05c516a90014e8908e.mockapi.io/projects/" +
          this.state.infoProject.id,
        {
          method: "PATCH",
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
  selectContractType = event => {
    this.setState({ nametest: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { isEdit, infoProject, isInfo } = this.state;
    console.log(this.state.nametest);
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
            // fullScreen
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
                <Grid item xs={12} md={6} style={{ position: "relative" }}>
                  {this.state.titleName}
                  <FormControlLabel
                    style={{ position: "absolute", top: 21, left: 12 }}
                    control={<Switch color="primary" />}
                    label="Active"
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: "right" }}>
                  {/* <Button
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
                  </Button> */}
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={24} style={{ paddingTop: 12 }}>
                <Grid item xs={12}>
                  <h3 style={{ margin: 0, color: "#2196f3" }}>Info Project:</h3>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "30%", paddingRight: 16 }}
                      autoFocus
                      name="project_code"
                      label="Project Code"
                      type="number"
                      disabled={isInfo}
                      value={infoProject.project_code}
                      onChange={this.handleChange}
                    />
                    <TextField
                      style={{ width: "70%" }}
                      name="project_name"
                      label="Project Name"
                      maxLength="3"
                      disabled={isInfo}
                      value={infoProject.project_name}
                      onChange={this.handleChange}
                    />
                    <TextField
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
                    name="description"
                    label="Descreption"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.description}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="contact_name"
                    label="Contact Name"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.contact_name}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="position_contact_per"
                    label="Position of Contact Person"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.position_contact_per}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="phone_contact_per"
                    label="Phone of Contact Person"
                    type="number"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.phone_contact_per}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="email_contact_per"
                    label="Email of Contact Person"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.email_contact_per}
                    onChange={this.handleChange}
                  />
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Project Term
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="project_term"
                      defaultValue={infoProject.project_term}
                      input={
                        <Input name="project_term" id="uncontrolled-native" />
                      }
                    >
                      <option value="" />
                      {this.projectTerm.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  {infoProject.project_term === "Frequent" && (
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel htmlFor="age-native-simple">
                        Frequency
                      </InputLabel>
                      <NativeSelect
                        onChange={this.handleChange}
                        name="frequency"
                        defaultValue={infoProject.frequency}
                        input={
                          <Input name="frequency" id="uncontrolled-native" />
                        }
                      >
                        <option value="" />
                        {this.frequency.map(item => (
                          <option>{item}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                  <TextField
                    name="digi_team"
                    label="DIGI's Team"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.digi_team}
                    onChange={this.handleChange}
                  />

                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "50%", paddingRight: 16 }}
                      name="start_date"
                      label="Start Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth
                      disabled={isInfo}
                      defaultValue={infoProject.start_date}
                      onChange={this.handleChange}
                    />
                    <TextField
                      style={{ width: "50%" }}
                      name="end_date"
                      label="End Date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      type="date"
                      disabled={isInfo}
                      defaultValue={infoProject.end_date}
                      onChange={this.handleChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={4} style={{ paddingTop: 12 }}>
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
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel htmlFor="age-native-simple">
                        Connect Method
                      </InputLabel>
                      <NativeSelect
                        onChange={this.handleChange}
                        name="connect_method"
                        defaultValue={infoProject.connect_method}
                        input={
                          <Input
                            name="connect_method"
                            id="uncontrolled-native"
                          />
                        }
                      >
                        <option value="" />
                        {this.offProjectApp.map(item => (
                          <option>{item}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                  {(infoProject.project_type === "Offline" ||
                    infoProject.project_type === "Online+Offline") && (
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel htmlFor="age-native-simple">
                        Off Project App
                      </InputLabel>
                      <NativeSelect
                        onChange={this.handleChange}
                        name="off_project_app"
                        defaultValue={infoProject.off_project_app}
                        input={
                          <Input
                            name="off_project_app"
                            id="uncontrolled-native"
                          />
                        }
                      >
                        <option value="" />
                        {this.connectionMethod.map(item => (
                          <option>{item}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                  <TextField
                    name="input_format"
                    label="Input Format"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.input_format}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="output_format"
                    label="Output Format"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.output_format}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="volume"
                    label="Volume"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.volume}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="Forecast"
                    label="forecast"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.Forecast}
                    onChange={this.handleChange}
                  />
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Billing Unit
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="billing_unit"
                      defaultValue={infoProject.billing_unit}
                      input={
                        <Input name="billing_unit" id="uncontrolled-native" />
                      }
                    >
                      <option value="" />
                      {this.billingUnit.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <TextField
                    name="type_of_form_numb"
                    label="Types Number"
                    fullWidth
                    type="number"
                    minMax={0}
                    disabled={isInfo}
                    value={infoProject.type_of_form_numb}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="unit_price"
                    label="Unit Price"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.unit_price}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="package_price"
                    label="Package Price"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.package_price}
                    onChange={this.handleChange}
                  />
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Currency
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="currency"
                      defaultValue={infoProject.currency}
                      input={<Input name="currency" id="uncontrolled-native" />}
                    >
                      <option value="" />
                      {this.currency.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>

                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Credit Term
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="credit_term"
                      defaultValue={infoProject.credit_term}
                      input={
                        <Input name="credit_term" id="uncontrolled-native" />
                      }
                    >
                      <option value="" />
                      {this.creditTerm.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <FormControl
                    style={{
                      width:
                        infoProject.charging_rate_ot === "Others"
                          ? "70%"
                          : "100%"
                    }}
                  >
                    <InputLabel htmlFor="age-native-simple">
                      Charging Rate OT
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="charging_rate_ot"
                      defaultValue={infoProject.charging_rate_ot}
                      input={
                        <Input
                          name="charging_rate_ot"
                          id="uncontrolled-native"
                        />
                      }
                    >
                      <option value="" />
                      {this.rateOT.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>

                  <FormControl
                    style={{
                      width:
                        infoProject.charging_rate_ot === "Others" ? "30%" : "0",
                      display:
                        infoProject.charging_rate_ot === "Others"
                          ? " "
                          : "none",
                      marginTop: 16,
                      paddingLeft: 16
                    }}
                  >
                    <Input
                      id="adornment-weight"
                      // value={infoProject.charging_rate_ot}
                      onChange={this.handleChange}
                      type="number"
                      aria-describedby="weight-helper-text"
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl
                    style={{
                      width:
                        infoProject.charging_rate_holidays === "Others"
                          ? "70%"
                          : "100%"
                    }}
                  >
                    <InputLabel htmlFor="age-native-simple">
                      Charging Rate Holidays
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="charging_rate_holidays"
                      defaultValue={infoProject.charging_rate_holidays}
                      input={
                        <Input
                          name="charging_rate_holidays"
                          id="uncontrolled-native"
                        />
                      }
                    >
                      <option value="" />
                      {this.rateHoliday.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>

                  <FormControl
                    style={{
                      width:
                        infoProject.charging_rate_holidays === "Others"
                          ? "30%"
                          : "0",
                      display:
                        infoProject.charging_rate_holidays === "Others"
                          ? " "
                          : "none",
                      marginTop: 16,
                      paddingLeft: 16
                    }}
                  >
                    <Input
                      id="adornment-weight"
                      // value={infoProject.charging_rate_ot}
                      onChange={this.handleChange}
                      type="number"
                      aria-describedby="weight-helper-text"
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl>
                  <TextField
                    name="steps_of_process"
                    label="Steps Of Process"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.steps_of_process}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="other_services"
                    label="Other Services"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.other_services}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="target_speed"
                    label="Target Speed"
                    fullWidth
                    type="number"
                    disabled={isInfo}
                    value={infoProject.target_speed}
                    onChange={this.handleChange}
                  />

                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Project Complex
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="project_complex"
                      defaultValue={infoProject.project_complex}
                      input={
                        <Input
                          name="project_complex"
                          id="uncontrolled-native"
                        />
                      }
                    >
                      <option value="" />
                      {this.projectComplex.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <TextField
                    style={{ width: "100%" }}
                    name="digipay_unit_wage"
                    label="Digi_pay Unit Wage"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">VND/unit</InputAdornment>
                      )
                    }}
                    disabled={isInfo}
                    defaultValue={infoProject.digipay_unit_wage}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4} style={{ paddingTop: 12 }}>
                  <TextField
                    name="total_bacth"
                    label="Total Bacth"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.total_bacth}
                    onChange={this.handleChange}
                  />
                  <p style={{ marginBottom: 0, color: "#2196f3" }}>
                    Time Setup
                  </p>
                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "50%", paddingRight: 16 }}
                      name="from_date_setup"
                      label="From Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      disabled={isInfo}
                      defaultValue={infoProject.from_date_setup}
                      onChange={this.handleChange}
                    />
                    <TextField
                      style={{ width: "50%" }}
                      name="to_date_setup"
                      label="To Date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      type="date"
                      disabled={isInfo}
                      defaultValue={infoProject.to_date_setup}
                      onChange={this.handleChange}
                    />
                  </div>
                  <p style={{ marginBottom: 0, color: "#2196f3" }}>
                    Time Testing
                  </p>
                  <div style={{ width: "100%" }}>
                    <TextField
                      style={{ width: "50%", paddingRight: 16 }}
                      name="from_date_test"
                      label="From Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      disabled={isInfo}
                      defaultValue={infoProject.from_date_test}
                      onChange={this.handleChange}
                    />
                    <TextField
                      style={{ width: "50%" }}
                      name="to_date_test"
                      label="To Date"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true
                      }}
                      disabled={isInfo}
                      defaultValue={infoProject.to_date_test}
                      onChange={this.handleChange}
                    />
                  </div>
                  <TextField
                    name="planned_fte"
                    label="Planned FTE"
                    fullWidth
                    disabled={isInfo}
                    defaultValue={infoProject.planned_fte}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="shift"
                    label="Shift"
                    fullWidth
                    disabled={isInfo}
                    defaultValue={infoProject.shift}
                    onChange={this.handleChange}
                  />

                  <FormControl
                    style={{
                      width: "100%"
                      // width:
                      //   infoProject.security_require_operation === "Others"
                      //     ? "10%"
                      //     : "100%"
                    }}
                  >
                    <InputLabel htmlFor="age-native-simple">
                      Security Requirement Operation
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="security_require_operation"
                      defaultValue={infoProject.security_require_operation}
                      input={
                        <Input
                          name="security_require_operation"
                          id="uncontrolled-native"
                        />
                      }
                    >
                      <option value="" />
                      {this.requireOperation.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>

                  <FormControl
                    style={{
                      width:
                        infoProject.security_require_operation === "Others"
                          ? "100%"
                          : "0",
                      display:
                        infoProject.security_require_operation === "Others"
                          ? " "
                          : "none",
                      marginTop: 16
                    }}
                  >
                    <Input
                      id="adornment-weight"
                      // value={infoProject.charging_rate_ot}
                      onChange={this.handleChange}
                      aria-describedby="weight-helper-text"
                      // endAdornment={
                      //   <InputAdornment position="end"></InputAdornment>
                      // }
                    />
                  </FormControl>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Security requirement_Delivery
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="security_require_delivery"
                      defaultValue={infoProject.security_require_delivery}
                      input={
                        <Input
                          name="security_require_delivery"
                          id="uncontrolled-native"
                        />
                      }
                    >
                      <option value="" />
                      {this.requireDeliver.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <TextField
                    name="security_require_communication"
                    label="Security Requirement Communication"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.security_require_communication}
                    onChange={this.handleChange}
                  />
                  <TextField
                    name="security_require_delete"
                    label="Security Requirement Delete"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.security_require_delete}
                    onChange={this.handleChange}
                  />
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="select-multiple-checkbox">
                      Contract Type
                    </InputLabel>
                    <Select
                      multiple
                      value={
                        this.state.infoProject.contractType
                          ? this.state.infoProject.contractType
                          : []
                      }
                      onChange={this.selectContractType}
                      input={<Input id="select-multiple-checkbox" />}
                      renderValue={selected => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {this.contractType.map(name => (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={this.state.nametest.indexOf(name) > -1}
                          />
                          <ListItemText>{name}</ListItemText>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    style={{ width: "100%" }}
                    name="contract_expiration_date"
                    label="Contract Expiration Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    disabled={isInfo}
                    defaultValue={infoProject.contract_expiration_date}
                    onChange={this.handleChange}
                  />

                  <TextField
                    style={{ width: "100%" }}
                    name="quality_level"
                    label="Quality level"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                    disabled={isInfo}
                    defaultValue={infoProject.quality_level}
                    onChange={this.handleChange}
                  />
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="age-native-simple">
                      Billing Unit
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      name="qc_unit"
                      defaultValue={infoProject.qc_unit}
                      input={<Input name="qc_unit" id="uncontrolled-native" />}
                    >
                      <option value="" />
                      {this.billingUnit.map(item => (
                        <option>{item}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                  <TextField
                    name="qc_schedule"
                    label="QC Schedule"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.qc_schedule}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="QAE"
                    name="qae"
                    fullWidth
                    disabled={isInfo}
                    value={infoProject.QAE}
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
