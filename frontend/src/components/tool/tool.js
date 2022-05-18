/*eslint no-unused-vars: 0, no-console: 0*/

import React from 'react';
import {withRouter} from 'react-router-dom';
import {CompactPicker} from 'react-color';
import 'flexboxgrid';
import './main.css';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CardHeader from '@material-ui/core/CardHeader';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import color from '@material-ui/core/colors/blueGrey';

import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import CopyIcon from '@material-ui/icons/FileCopy';
import RemoveIcon from '@material-ui/icons/Remove';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import DataJson from './data.json';
import dataJsonControlled from './data.json.controlled';
import {SketchField, Tools} from './tool/index';
import dataUrl from './data.url';
import DropZone from 'react-dropzone';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Pencil from './tool/pencil';

import JsonData1 from '../layout/data/data_en.json';
import JsonData2 from '../layout/data/data_fr.json';
import JsonData3 from '../layout/data/data_it.json';
import JsonData4 from '../layout/data/data_pt.json';
import JsonData5 from '../layout/data/data_es.json';

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { TranslateAction } from "../../actions/translateAction";

const styles = {
  root: {
    padding: '3px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 10px 5px 10px',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    overflowY: 'auto',
    marginBottom: '24px',
  },
  gridTile: {
    backgroundColor: '#fcfcfc',
  },
  appBar: {
    backgroundColor: '#333',
  },
  radioButton: {
    marginTop: '3px',
    marginBottom: '3px',
  },
  separator: {
    height: '42px',
    backgroundColor: 'white',
  },
  iconButton: {
    fill: 'white',
    width: '42px',
    height: '42px',
  },
  dropArea: {
    width: '100%',
    height: '64px',
    border: '2px dashed rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
    textAlign: 'center',
    paddingTop: '20px',
  },
  activeStyle: {
    borderStyle: 'solid',
    backgroundColor: '#eee',
  },
  rejectStyle: {
    borderStyle: 'solid',
    backgroundColor: '#ffdddd',
  },
  card: {
    margin: '10px 10px 5px 0'
  }
};

/**
 * Helper function to manually fire an event
 *
 * @param el the element
 * @param etype the event type
 */
function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

class SketchFieldDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      landingPageData: {},
      countflag: 4,
      lineWidth: 2,
      lineColor: 'black',
      fillColor: '#68CCCA',
      backgroundColor: 'transparent',
      shadowWidth: 0,
      shadowOffset: 0,
      tool: Tools.Select,
      enableRemoveSelected: false,
      fillWithColor: false,
      fillWithBackgroundColor: false,
      drawings: [],
      canUndo: false,
      canRedo: false,
      controlledSize: false,
      sketchWidth: 600,
      sketchHeight: 600,
      winWidth: 500,
      stretched: true,
      stretchedX: false,
      stretchedY: false,
      originX: 'left',
      originY: 'top',
      rightEye: `/uploads/patients/${this.props.match.params.id}/Right-Eye.jpg`,
      leftEye: `/uploads/patients/${this.props.match.params.id}/Left-Eye.jpg`,
      ruler1: 'img/rulers/finalRuler1.png',
      ruler2: 'img/rulers/finalRuler2.png',
      ruler3: 'img/rulers/finalRuler3.png',
      ruler4: 'img/rulers/finalRuler4.png',
      ruler5: 'img/rulers/finalRuler5.png',
      ruler6: 'img/rulers/finalRuler6.png',
      expandTools: false,
      expandControls: false,
      expandColors: false,
      expandBack: false,
      expandImages: false,
      expandControlled: false,
      text: '',
      enableCopyPaste: false
    };
  }

  getlandingPageData(flag) {
    switch (flag) {
      case "1":
        return this.setState({ landingPageData: JsonData1 })
      case "2":
        return this.setState({ landingPageData: JsonData2 })
      case "3":
        return this.setState({ landingPageData: JsonData3 })
      case "4":
        return this.setState({ landingPageData: JsonData4 })
      case "5":
        return this.setState({ landingPageData: JsonData5 })
      default:
        return null;
    }
  }

  componentWillMount() {
    console.log(this.state.landingPageData)
    console.log(this.props.translator.translateFlag)
    this.getlandingPageData(this.props.translator.translateFlag);
  }

  componentWillReceiveProps(nextProps) {
    // this check makes sure that the getDashboardStats action is not getting called for other prop changes
    if (this.props.translator.translateFlag !== nextProps.translator.translateFlag) {
      this.getlandingPageData(nextProps.translator.translateFlag);
    }
  }

  _selectTool = event => {
    this.setState({
      tool: event.target.value,
      enableRemoveSelected: event.target.value === Tools.Select,
      enableCopyPaste: event.target.value === Tools.Select
    });
  };

  _download = () => {
    let imgDown = document.createElement("a");
    let event = new Event('click', {});
    imgDown.href = this._sketch.toDataURL();
    imgDown.download = 'Iris.png';
    imgDown.click();
    imgDown.dispatchEvent(event);
  };

  toDataUrl = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  };

  _renderTile = (drawing, index) => {
    return (
      <GridListTile
        key={index}
        title="Canvas Image"
        actionPosition="left"
        titlePosition="top"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        cols={1}
        rows={1}
        style={styles.gridTile}
        actionIcon={
          <IconButton onTouchTap={c => this._removeMe(index)}>
            <ClearIcon color="white"/>
          </IconButton>
        }>
        <img src={drawing}/>
      </GridListTile>
    );
  };

  _removeMe = index => {
    let drawings = this.state.drawings;
    drawings.splice(index, 1);
    this.setState({ drawings: drawings });
  };

  _undo = () => {
    this._sketch.undo();
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    });
  };

  _redo = () => {
    this._sketch.redo();
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    });
  };

  _clear = () => {
    this._sketch.clear();
    this._sketch.setBackgroundFromDataUrl('');
    this.setState({
      controlledValue: null,
      backgroundColor: 'transparent',
      fillWithBackgroundColor: false,
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    });
  };

  _removeSelected = () => {
    this._sketch.removeSelected()
  };

  _onSketchChange = () => {
    let prev = this.state.canUndo;
    let now = this._sketch.canUndo();
    if (prev !== now) {
      this.setState({ canUndo: now });
    }
  };

  _onBackgroundImageDropRight = () => {
      let sketch = this._sketch;
      let reader;
      this.toDataUrl(`/uploads/patients/${this.props.match.params.id}/Right-Eye.jpg`, (myBase64) => {
              reader = myBase64
      let { stretched, stretchedX, stretchedY, originX, originY } = this.state;
            
          sketch.setBackgroundFromDataUrl(reader, {
            stretched: stretched,
            stretchedX: stretchedX,
            stretchedY: stretchedY,
            originX: originX,
            originY: originY,
          })
        });
  };

  _onBackgroundImageDropLeft = () => {
    let sketch = this._sketch;
    let reader;
    this.toDataUrl(`/uploads/patients/${this.props.match.params.id}/Left-Eye.jpg`, (myBase64) => {
            reader = myBase64
    let { stretched, stretchedX, stretchedY, originX, originY } = this.state;
          
        sketch.setBackgroundFromDataUrl(reader, {
          stretched: stretched,
          stretchedX: stretchedX,
          stretchedY: stretchedY,
          originX: originX,
          originY: originY,
        })
      });
};

  _addText = () => this._sketch.addText(this.state.text);

  componentDidMount = () => {
    this.setState({winWidth: window.innerWidth});
    (function(console) {
      console.save = function(data, filename) {
        if (!data) {
          console.error('Console.save: No data');
          return;
        }
        if (!filename) filename = 'console.json';
        if (typeof data === 'object') {
          data = JSON.stringify(data, undefined, 4);
        }
        var blob = new Blob([data], { type: 'text/json' }),
          e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      };
    })(console);
  };

  render = () => {
    let { controlledValue } = this.state;
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: { main: color[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
      },
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className="row" style = {{paddingTop: "57px"}}>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <AppBar title="Sketch Tool" position="static" style={styles.appBar}>
              <Toolbar>
              { this.state.winWidth >= 665 ? 
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>{this.state.landingPageData ? this.state.landingPageData.PaintTool.title : "loading"}</Typography>
                :
                null
                }
                <Button variant = "outlined" color = "primary" onClick = {()=>{this.props.history.push(`/patient/view/${this.props.match.params.id}/consultant-info`)}}>{this.state.landingPageData ? this.state.landingPageData.PaintTool.viewPatientInfo : "loading"}</Button>
                <IconButton
                  color="primary"
                  disabled={!this.state.canUndo}
                  onClick={this._undo}>
                  <UndoIcon/>
                </IconButton>
                <IconButton
                  color="primary"
                  disabled={!this.state.canRedo}
                  onClick={this._redo}>
                  <RedoIcon/>
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={this._download}>
                  <DownloadIcon/>
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={this._clear}>
                  <DeleteIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-11 col-sm-11 col-md-9 col-lg-9">
            <SketchField
              name="sketch"
              className="canvas-area"
              ref={c => (this._sketch = c)}
              lineColor={this.state.lineColor}
              lineWidth={this.state.lineWidth}
              fillColor={
                this.state.fillWithColor
                  ? this.state.fillColor
                  : 'transparent'
              }
              backgroundColor={
                this.state.fillWithBackgroundColor
                  ? this.state.backgroundColor
                  : 'transparent'
              }
              width={
                this.state.controlledSize ? this.state.sketchWidth : null
              }
              height={
                this.state.controlledSize ? this.state.sketchHeight : null
              }
              defaultValue={DataJson}
              value={controlledValue}
              forceValue
              onChange={this._onSketchChange}
              tool={this.state.tool}
            />
            
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <Card style={styles.card}>
              <CardHeader
                title={this.state.landingPageData ? this.state.landingPageData.PaintTool.toolTitle : "loading"}
                subheader={this.state.landingPageData ? this.state.landingPageData.PaintTool.toolSubTitle : "loading"}
                action={
                  <IconButton
                    onClick={(e) => this.setState({ expandTools: !this.state.expandTools })}>
                    <ExpandMore/>
                  </IconButton>
                }/>
              <Collapse in={this.state.expandTools}>
                <CardContent>
                  <div className="row">
                    <div className="col-lg-12">
                      <TextField
                        select={true}
                        value={this.state.tool}
                        onChange={this._selectTool}
                        helperText={this.state.landingPageData ? this.state.landingPageData.PaintTool.toolOptionLabel2 : "loading"}>
                        <MenuItem value={Tools.Select} key="Select">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolSelect : "loading"}</MenuItem>
                        <MenuItem value={Tools.Pencil} key="Pencil">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolPencil : "loading"}</MenuItem>
                        <MenuItem value={Tools.Line} key="Line">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolLine : "loading"}</MenuItem>
                        <MenuItem value={Tools.Arrow} key="Arrow">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolArrow : "loading"}</MenuItem>
                        <MenuItem value={Tools.Rectangle} key="Rectangle">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolRectangle : "loading"}</MenuItem>
                        <MenuItem value={Tools.Circle} key="Circle">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolCircle : "loading"}</MenuItem>
                        <MenuItem value={Tools.Pan} key="Pan">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolPan : "loading"}</MenuItem>
                        <MenuItem value={Tools.Highlighter} key="Highlighter">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolHighlighter : "loading"}</MenuItem>
                        <MenuItem value={Tools.RectangleLabel} key="Pan">{this.state.landingPageData ? this.state.landingPageData.PaintTool.toolRectangleLabel : "loading"}</MenuItem>
                      </TextField>
                    </div>
                  </div>
                  <br/>
                  <Typography id="slider">{this.state.landingPageData ? this.state.landingPageData.PaintTool.lineWeight : "loading"}</Typography>
                  <Slider
                    select = {true}
                    step={1} min={1} max={100}
                    aria-labelledby="slider"
                    value={this.state.lineWidth}
                    onChange={(e, v) =>
                      this.setState({ lineWidth: v})
                    }
                  />
                  <br />
                  <div className="row">
                    <div className="col-lg-7">
                      <TextField
                        label={this.state.landingPageData ? this.state.landingPageData.PaintTool.addText : "loading"}
                        variant = "outlined"
                        onChange={(e) => this.setState({ text: e.target.value })}
                        value={this.state.text}/>
                    </div>
                    <div className="col-lg-3">
                      <IconButton
                        color="primary"
                        onClick={this._addText}>
                        <AddIcon/>
                      </IconButton>
                    </div>
                  </div>
                  <label htmlFor={this.state.landingPageData ? this.state.landingPageData.PaintTool.zoom : "loading"}>Zoom</label>
                  <div>
                    <IconButton
                      onClick={(e) => this._sketch.zoom(1.25)}>
                      <ZoomInIcon/>
                    </IconButton>
                    <IconButton
                      onClick={(e) => this._sketch.zoom(0.8)}>
                      <ZoomOutIcon/>
                    </IconButton>
                  </div>
                </CardContent>
                <CardContent>
                  <label htmlFor='lineColor'>{this.state.landingPageData ? this.state.landingPageData.PaintTool.lineColor : "loading"}</label>
                  <br/>
                  <CompactPicker
                    id='lineColor' color={this.state.lineColor}
                    onChange={(color) => this.setState({ lineColor: color.hex })}/>
                  <br/>
                  <br/>
                  <FormControlLabel
                    control={
                      <Switch
                        value={this.state.fillWithColor}
                        onChange={(e) => this.setState({ fillWithColor: !this.state.fillWithColor })}/>
                    }
                    label={this.state.landingPageData ? this.state.landingPageData.PaintTool.fillColor : "loading"}
                  />
                  <CompactPicker
                    color={this.state.fillColor}
                    onChange={(color) => this.setState({ fillColor: color.hex })}/>
                </CardContent>
              </Collapse>
            </Card>
            <Card style={styles.card}>
              <CardHeader
                title={this.state.landingPageData ? this.state.landingPageData.PaintTool.controlTitle : "loading"}
                subheader={this.state.landingPageData ? this.state.landingPageData.PaintTool.controlSubTitle : "loading"}
                action={
                  <IconButton
                    onClick={(e) => this.setState({ expandControls: !this.state.expandControls })}>
                    <ExpandMore/>
                  </IconButton>
                }/>
              <Collapse in={this.state.expandControls}>
                <CardContent>
                  <div className="row">
                    <div className="col-lg-12">
                      <FormControlLabel
                        control={
                          <Switch
                            value={this.state.controlledSize}
                            onChange={(e) => this.setState({ controlledSize: !this.state.controlledSize })}
                          />
                        }
                        label={this.state.landingPageData ? this.state.landingPageData.PaintTool.controlSize : "loading"}
                      />
                      <br/>
                      <Typography id="xSize">{this.state.landingPageData ? this.state.landingPageData.PaintTool.controlWidth : "loading"}</Typography>
                      <Slider
                        step={1}
                        min={10}
                        max={1000}
                        value={this.state.sketchWidth}
                        onChange={(e, v) => this.setState({ sketchWidth: v })}/>
                      <br/>
                      <Typography id="ySize">{this.state.landingPageData ? this.state.landingPageData.PaintTool.controlHeight : "loading"}</Typography>
                      <Slider
                        step={1}
                        min={10}
                        max={1000}
                        value={this.state.sketchHeight}
                        onChange={(e, v) => this.setState({ sketchHeight: v })}/>
                      <br/>
                    </div>
                  </div>
                  <label htmlFor="zoom">{this.state.landingPageData ? this.state.landingPageData.PaintTool.copyAndRemove : "loading"}</label>
                  <div className="row">
                    <div className="col">
                      <IconButton
                        color="primary"
                        disabled={!this.state.enableCopyPaste}
                        onClick={(e) => {
                          this._sketch.copy();
                          this._sketch.paste();
                        }}>
                        <CopyIcon/>
                      </IconButton>
                    </div>
                    <div className="col">
                      <IconButton
                        color="primary"
                        disabled={!this.state.enableRemoveSelected}
                        onClick={this._removeSelected}>
                        <RemoveIcon/>
                      </IconButton>
                    </div>
                    <div>
                    <FormControlLabel
                        label={this.state.landingPageData ? this.state.landingPageData.PaintTool.backgroundColor : "loading"}
                        control={
                          <Switch
                            value={this.state.fillWithBackgroundColor}
                            onChange={(e) => this.setState({
                              fillWithBackgroundColor: !this.state.fillWithBackgroundColor
                            })}/>
                        }/>
                      <CompactPicker
                        color={this.state.backgroundColor}
                        onChange={(color) => this.setState({ backgroundColor: color.hex })}/>
                    </div>
                  </div>
                </CardContent>
              </Collapse>
            </Card>
            <Card style={styles.card}>
              <CardHeader
                title={this.state.landingPageData ? this.state.landingPageData.PaintTool.eyesTitle : "loading"}
                subheader={this.state.landingPageData ? this.state.landingPageData.PaintTool.eyesSubTitle : "loading"}
                action={
                  <IconButton
                    onClick={(e) => this.setState({ expandBack: !this.state.expandBack })}>
                    <ExpandMore/>
                  </IconButton>
                }/>
              <Collapse in={this.state.expandBack}>
                <CardContent>
                  {/* <label htmlFor='lineColor'>Set Eye Images</label> */}
                  <br/>
                  <div>
                    <Button 
                      fullWidth
                      variant = "outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.setBackgroundFromDataUrl(this.state.rightEye)
                      }}
                    >
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addRightEye : "loading"}
                    </Button>
                    <Box mt = {2}/>
                    <Button 
                      fullWidth   
                      variant = "outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.setBackgroundFromDataUrl(this.state.leftEye)
                      }}
                    >
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addLeftEye : "loading"}
                    </Button>
                  </div>
                </CardContent>
              </Collapse>
            </Card>
            <Card style={styles.card}>
              <CardHeader
                title={this.state.landingPageData ? this.state.landingPageData.PaintTool.rulersTitle : "loading"}
                subheader={this.state.landingPageData ? this.state.landingPageData.PaintTool.rulersSubTitle : "loading"}
                action={
                  <IconButton
                    onClick={(e) => this.setState({ expandImages: !this.state.expandImages })}>
                    <ExpandMore/>
                  </IconButton>
                }/>
              <Collapse in={this.state.expandImages}>
                <CardContent>
                  <div>
                    <Button
                      fullWidth
                      variant="outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.addImg(this.state.ruler1)
                      }}>
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addRuler1 : "loading"}
                    </Button>
                    <Box mt = {2}/>
                    <Button
                      fullWidth
                      variant="outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.addImg(this.state.ruler2)
                      }}>
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addRuler2 : "loading"}
                    </Button>
                    <Box mt = {2}/>
                    <Button
                      fullWidth
                      variant="outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.addImg(this.state.ruler3)
                      }}>
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addRuler3 : "loading"}
                    </Button>
                    <Box mt = {2}/>
                    <Button
                      fullWidth
                      variant="outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.addImg(this.state.ruler4)
                      }}>
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addRuler4 : "loading"}
                    </Button>
                    <Box mt = {2}/>
                    <Button
                      fullWidth
                      variant="outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.addImg(this.state.ruler5)
                      }}>
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addRuler5 : "loading"}
                    </Button>
                    <Box mt = {2}/>
                    <Button
                      fullWidth
                      variant="outlined"
                      color = "primary"
                      onClick={(e) => {
                        this._sketch.addImg(this.state.ruler6)
                      }}>
                      {this.state.landingPageData ? this.state.landingPageData.PaintTool.addRuler6 : "loading"}
                    </Button>
                  </div>
                  <br/>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        </div>
        <div style={{ width: 0 }}>
          <div className="col-xs-7 col-sm-7 col-md-9 col-lg-9">
            {/* Sketch area */}

            <div className="col-xs-5 col-sm-5 col-md-3 col-lg-3">


            </div>
          </div>

        </div>
      </MuiThemeProvider>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.auth,
  translator: state.translator
});

export default connect(
  mapStateToProps,
  { logoutUser, TranslateAction }
)(SketchFieldDemo);
