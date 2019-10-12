//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";

//import Calls from "calls";

import "./lists.less";
import List from "./list";
//@@viewOff:imports

export const Lists = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Lists",
    classNames: {
      main: Config.CSS + "lists"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState(){
    return {
      lists: [
        {
          lid: "0",
          sys: {
            cts: "01.01.2019 10:10:10",
            mts: "02.02.2019 20:20:20",
            rev: "0"
          },
          text: "Nakup"
        },
        {
          lid: "1",
          sys: {
            cts: "01.01.2019 10:10:10",
            mts: "02.02.2019 20:20:20",
            rev: "0"
          },
          text: "Prace"
        }
      ]
    }
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface

  addList(name){
    const now = new Date().toLocaleString();
    const newList = {
      lid: UU5.Common.Tools.generateUUID(),
      sys: {
        cts: now,
        mts: now,
        rev: "0",
      },
      text: name,
    };
    this.setState((state) => {
      return {
        lists: [...state.lists,newList]
      }
    })
    //Calls.setItems(getInitialState());
  },

  removeList(id){
    //alert("Ahooj");
    this.setState((state) => {
      return {
        lists: state.lists.filter(list => list.lid != id)
      }
    })
  },

  editList(id,newName){
    //alert("Nazdar!");
    this.setState((state) => {
      return {
        lists: state.lists.map(list => {
          if (list.lid == id){
            const newList = {...list};
            newList.text = newName;
            newList.sys.mts = new Date().toLocaleString();
            newList.sys.rev++;
            return newList
          } else return list
        })
      }
    })
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getLists(){
    const lists = this.state.lists.map(list => {
      return (
        <UU5.Bricks.Div key={UU5.Common.Tools.generateUUID()}>
          <List {...list}
                listID = {list.lid}
                onRemoveList = {this.removeList}
                onEditList = {this._openEditModal}
                key={UU5.Common.Tools.generateUUID()}
          />
        </UU5.Bricks.Div>
      )
    })
    return (
      <UU5.Bricks.Row>
        {lists}
      </UU5.Bricks.Row>
    )
  },


  _getAddListForm(){
    return (
      <UU5.Forms.Form
        onSave = {(opt) => {
          this.addList(opt.values.name);
          this._modal.close();
        }}
        onCancel = {() => {
          this._modal.close();
        }}
        key={UU5.Common.Tools.generateUUID()}
      >
        <UU5.Forms.Text label="Name" name="name" key={UU5.Common.Tools.generateUUID()}/>
        <UU5.Forms.Controls key={UU5.Common.Tools.generateUUID()}/>
      </UU5.Forms.Form>
    )
  },

  _getEditListForm(id, oldName){
    return (
      <UU5.Forms.Form
        onSave = {(opt) => {
          this.editList(id, opt.values.newName)
          this._modal.close();
        }}
        onCancel = {() => {
          this._modal.close();
        }}
        key={UU5.Common.Tools.generateUUID()}
      >
        <UU5.Forms.Text label = "Name" value={oldName} name="newName" key={UU5.Common.Tools.generateUUID()}/>
        <UU5.Forms.Controls/>
      </UU5.Forms.Form>
    )
  },

  _openAddModal(){
    this._modal.open({
      header: "Add new list",
      content: this._getAddListForm(),
    })
  },

  _openEditModal(id,name){
    //alert("hmm");
    this._modal.open({
      header: "Edit list",
      content: this._getEditListForm(id,name),
    })
  },

  // MOCK
  // _setListsFromLs (data){
  //
  //   const eData = JSON.parse(data);
  //   this.setState(state => {
  //     return state.lists = eData;
  //   })
  //
  // },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()} style="margin: 20px;textAlign: center" key={UU5.Common.Tools.generateUUID()}>
        <UU5.Bricks.Header level="1" content="TODO Lists" key={UU5.Common.Tools.generateUUID()}/>
        <UU5.Bricks.Modal ref_={(modal) => this._modal = modal} key={UU5.Common.Tools.generateUUID()}/>
        {this._getLists()}
        <UU5.Bricks.Div style="borderBottom: 2px black solid;margin: 10px" key={UU5.Common.Tools.generateUUID()}/>
        <UU5.Bricks.Button content="Add new list" onClick={this._openAddModal} bgStyle="outline" key={UU5.Common.Tools.generateUUID()}/>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Lists;
