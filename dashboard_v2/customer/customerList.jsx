import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Info from "@material-ui/icons/Info";
import BorderColor from "@material-ui/icons/BorderColor";
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
  NativeSelect
} from "@material-ui/core";
import withFixedColumns from "react-table-hoc-fixed-columns";
import * as style from "./styles.css";
import "react-table-hoc-fixed-columns/lib/styles.css";
import clone from "clone";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isEdit: false,
      isInfo: false,
      isCreate: false,
      infoCustomer: {},
      selected: null,
      titleName: "",
      datas: [],
      legalSelect: [],
      name: ""
    };
  }
  columns = [
    {
      Header: "Customer Code",
      accessor: "customer_code" // String-based value accessors!
    },
    {
      Header: "Customer Name",
      accessor: "customer_name" // String-based value accessors!
    },
    {
      Header: "Descreption",
      accessor: "description" // String-based value accessors!
    },
    {
      Header: "Customer Address",
      accessor: "customer_address" // String-based value accessors!
    },
    {
      Header: "Customer Email",
      accessor: "customer_email" // String-based value accessors!
    },
    {
      Header: "Tax Code",
      accessor: "tax_code" // String-based value accessors!
    },
    {
      Header: "Legal Pepresentative",
      accessor: "legal_pepresentative" // String-based value accessors!
    },
    {
      Header: "Position",
      accessor: "position_per_sign" // String-based value accessors!
    },
    {
      Header: "Telephone",
      accessor: "phone_per_sign" // String-based value accessors!
    },
    {
      Header: "Email",
      accessor: "email_per_sign" // String-based value accessors!
    },
    {
      Header: "Bank Account",
      accessor: "bank_account" // String-based value accessors!
    },
    {
      Header: "Bank Name",
      accessor: "bank_name" // String-based value accessors!
    },
    {
      Header: "Bank Address",
      accessor: "bank_address" // String-based value accessors!
    },
    {
      Header: "Legal Document",
      accessor: "legal_document" // String-based value accessors!
    },
    {
      Header: "Attachment",
      accessor: "attachment", // String-based value accessors!
      Cell: props => <span className="number">{props.value}</span>
    },
    {
      Header: "Country",
      accessor: "country" // String-based value accessors!
    },
    {
      Header: "Action",
      accessor: "table_id",
      Cell: (row, e) => (
        <div style={{ textAlign: "center", textDecoration: "underline" }}>
          <a
            style={{ paddingRight: 12, cursor: "pointer" }}
            onClick={() => this.showCustomer(row.original)}
          >
            <Tooltip title="Show Info" placement="left">
              <Info style={{ fontSize: 16, color: "#2196f3" }} />
            </Tooltip>
          </a>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => this.editCustomer(row.original)}
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
  countryList = ["My", "Anh", "Phap", "Viet Nam", "Lao", "Campuchia"];
  legalDocumentList = [
    "NDA",
    "GSA",
    "ISA",
    "SOW",
    "Quotation",
    "Email Confirmation"
  ];

  addNewCustomer = () => {
    this.setState({
      open: true,
      isCreate: true,
      isInfo: false,
      isEdit: false,
      infoCustomer: {},
      titleName: "Create New Customer",
      legalSelect: []
    });
  };
  editCustomer = row => {
    this.setState({
      infoCustomer: row,
      isInfo: false,
      isEdit: true,
      isCreate: false,
      open: true,
      titleName: "Edit Customer"
    });
  };
  showCustomer = row => {
    this.setState({
      infoCustomer: row,
      isInfo: true,
      isEdit: false,
      isCreate: false,
      open: true,
      titleName: "Customer Informaiton"
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    const target = event.target;
    var value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const infoCustomer = clone(this.state.infoCustomer);
    infoCustomer[name] = value;
    this.setState({ infoCustomer: infoCustomer });
  };
  addUpdateCustomer = () => {
    console.log("d", this.state.datas);

    console.log("this.data", this.data);
    this.state.infoCustomer.legal_document = this.state.legalSelect;

    if (this.state.isCreate) {
      console.log("tao moi", this.state.infoCustomer);
      fetch("http://5d3fbc05c516a90014e8908e.mockapi.io/getTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.infoCustomer)
      })
        .then(response => response.json())
        .then(res => {
          console.log("dfsd", res);
          this.getCustomers();
          this.setState({ open: false });
        });
    } else {
      console.log("edit", this.state.infoCustomer);
      fetch(
        "http://5d3fbc05c516a90014e8908e.mockapi.io/getTask/" +
          this.state.infoCustomer.id,
        {
          method: "PUT",

          body: JSON.stringify(this.state.infoCustomer),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(res => {
          console.log("dfsd", res);
          this.getCustomers();
          this.setState({ open: false });
        });
    }
  };
  getCustomers = () => {
    fetch("http://5d3fbc05c516a90014e8908e.mockapi.io/getTask")
      .then(response => response.json())
      .then(datas => this.setState({ datas }));
  };
  componentDidMount() {
    this.getCustomers();
  }
  handleSelectLegal = event => {
    this.setState({
      legalSelect: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { isEdit, infoCustomer, isInfo, legalSelect } = this.state;
    console.log("legalSelect", legalSelect);

    return (
      <React.Fragment>
        <div>
          <div
            style={{ width: "100%", display: "inline-block", paddingTop: 12 }}
          >
            <h2
              style={{
                margin: 0,
                padding: 12,
                paddingBottom: 0,
                float: "left"
              }}
            >
              Customer Manager
            </h2>
            <Fab
              color="primary"
              size="small"
              aria-label="Add"
              style={{ float: "right", marginRight: 12 }}
            >
              <Tooltip title="Create Customer" placement="left">
                <AddIcon onClick={this.addNewCustomer} />
              </Tooltip>
            </Fab>
          </div>
          <Paper style={{ padding: "0 12px" }}>
            <ReactTableFixedColumns
              data={this.state.datas}
              columns={this.columns}
            />
          </Paper>
        </div>
        {/* diglog */}
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
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
              <Grid item xs={12} md={6}>
                <h3 style={{ margin: 0, color: "#2196f3" }}>Info Customer:</h3>
                <div style={{ width: "100%" }}>
                  <TextField
                    style={{ width: "30%", paddingRight: 16 }}
                    autoFocus
                    name="customer_code"
                    label="Customer Code"
                    type="number"
                    disabled={isInfo}
                    value={infoCustomer.customer_code}
                    onChange={this.handleChange}
                  />
                  <TextField
                    style={{ width: "70%" }}
                    name="customer_name"
                    label="Customer Name"
                    maxLength="3"
                    disabled={isInfo}
                    value={infoCustomer.customer_name}
                    onChange={this.handleChange}
                  />
                </div>
                <TextField
                  name="description"
                  label="Descreption"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.description}
                  onChange={this.handleChange}
                />
                <TextField
                  name="customer_address"
                  label="Customer Address"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.customer_address}
                  onChange={this.handleChange}
                />
                <TextField
                  name="customer_email"
                  label="Representative's Email"
                  fullWidth
                  type="email"
                  autoComplete="email"
                  placeholder="
                  Email address of the representative"
                  disabled={isInfo}
                  value={infoCustomer.customer_email}
                  onChange={this.handleChange}
                />
                <TextField
                  name="tax_code"
                  label="Tax Code"
                  type="number"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.tax_code}
                  onChange={this.handleChange}
                />
                <TextField
                  name="legal_pepresentative"
                  label="Legal Representative Name"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.legal_pepresentative}
                  onChange={this.handleChange}
                />
                <TextField
                  name="position_per_sign"
                  label="Position"
                  placeholder="The position of the person signing the contract"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.position_per_sign}
                  onChange={this.handleChange}
                />
                <TextField
                  name="phone_per_sign"
                  label="Telephone"
                  type="number"
                  placeholder="
                  Phone number of the person signing the contract"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.phone_per_sign}
                  onChange={this.handleChange}
                />
                <TextField
                  name="email_per_sign"
                  label="Email"
                  fullWidth
                  disabled={isInfo}
                  placeholder="Email of the person signing the contract"
                  value={infoCustomer.email_per_sign}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h3 style={{ margin: 0, color: "#2196f3" }}>Info Bank:</h3>

                <TextField
                  name="bank_account"
                  label="Bank Account"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.bank_account}
                  onChange={this.handleChange}
                />
                <TextField
                  name="bank_name"
                  label="Bank Name"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.bank_name}
                  onChange={this.handleChange}
                />
                <TextField
                  name="bank_address"
                  label="Bank Address"
                  fullWidth
                  disabled={isInfo}
                  value={infoCustomer.bank_address}
                  onChange={this.handleChange}
                />
                <h3 style={{ margin: 0, color: "#2196f3", paddingTop: 35 }}>
                  Info Other:
                </h3>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="select-multiple-checkbox">
                    Contract Type
                  </InputLabel>
                  <Select
                    disabled={isInfo}
                    multiple
                    value={this.state.legalSelect ? this.state.legalSelect : []}
                    // defaultValue={infoCustomer.attachment}
                    onChange={this.handleSelectLegal}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(", ")}
                  >
                    {this.legalDocumentList.map(name => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={this.state.legalSelect.indexOf(name) > -1}
                        />
                        <ListItemText>{name}</ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="age-native-simple">Country</InputLabel>
                  <NativeSelect
                    disabled={isInfo}
                    onChange={this.handleChange}
                    name="country"
                    defaultValue={infoCustomer.country}
                    input={<Input name="country" id="uncontrolled-native" />}
                  >
                    <option value="" />
                    {this.countryList.map(item => (
                      <option>{item}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
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
                onClick={this.addUpdateCustomer}
                variant="contained"
                color="primary"
              >
                {this.state.isCreate ? "Create" : "Update"}
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Customer);
