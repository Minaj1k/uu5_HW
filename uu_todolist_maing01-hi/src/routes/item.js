//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";

import "./item.less";
//@@viewOff:imports

export const Item = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Item",
    classNames: {
      main: Config.CSS + "item",
      footer: Config.CSS + "item-footer",
      header: Config.CSS + "item-header"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    iid: UU5.PropTypes.string,
    sys: UU5.PropTypes.object,
    list: UU5.PropTypes.string,
    text: UU5.PropTypes.string,
    completed: UU5.PropTypes.bool,

    onChangeCompletedState: UU5.PropTypes.func,
    onEditItem: UU5.PropTypes.func,
    onRemoveItem: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps(){
    return {
      iid: "",
      sys: {
        cts: "",
        mts: "",
        rev: "",
      },
      list: "",
      text: "",
      completed: false,

      //onChangeCompletedState: () => {},
    }
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private

  _getItem(){
    const {text,sys} = this.props;

    return(
      <UU5.Bricks.Section>
        <UU5.Bricks.Header level = {4} className={this.getClassName("header")}>
          <UU5.Bricks.Div>
            {this._getButtons()}

          </UU5.Bricks.Div>

        </UU5.Bricks.Header>
        <UU5.Bricks.Text style="margin: 10px;">
          {text}
        </UU5.Bricks.Text>
        <UU5.Bricks.Footer className={this.getClassName("footer")}>
          <UU5.Bricks.Div style="textAlign: left">
            Created: {sys.cts}<br/>
            Last modified: {sys.mts}
          </UU5.Bricks.Div>
          <UU5.Bricks.Div>
            REV: {sys.rev}
          </UU5.Bricks.Div>
        </UU5.Bricks.Footer>


      </UU5.Bricks.Section>
    )
  },

  _getButtons(){
    return(
      <UU5.Bricks.ButtonGroup>
        <UU5.Bricks.Button
        onClick={this._changeCompletedState}
        content = {
          <UU5.Bricks.Icon icon={this.props.completed ? "mdi-checkbox-marked-outline" : "mdi-checkbox-blank-outline"}/>
          }
        />
        <UU5.Bricks.Button
          onClick={this._editItem}
          content = {
            <UU5.Bricks.Icon icon="mdi-pencil"/>
          }
        />
        <UU5.Bricks.Button
          onClick={this._removeItem}
          content = {
            <UU5.Bricks.Icon icon="mdi-delete"/>
          }
        />
      </UU5.Bricks.ButtonGroup>
    )
  },

  _editItem(){
    const onEditItem = this.props.onEditItem;
    if (typeof onEditItem == "function"){
      onEditItem(this.props.iid, this.props.text);
    }

  },

  _removeItem(){
    const onRemoveItem = this.props.onRemoveItem;
    if (typeof onRemoveItem == "function"){
      onRemoveItem(this.props.iid);
    }

  },

  _changeCompletedState(){
    const onChangeCompletedState = this.props.onChangeCompletedState;
    if (typeof onChangeCompletedState == "function"){
      onChangeCompletedState(this.props.iid);
    }
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    const props = this.getMainPropsToPass();

    return (
      <UU5.Bricks.Card {...props} colorSchema = {this.props.completed ? "green" : "red"}>
        {this._getItem()}
      </UU5.Bricks.Card>

    );
  }
  //@@viewOff:render
});

export default Item;
