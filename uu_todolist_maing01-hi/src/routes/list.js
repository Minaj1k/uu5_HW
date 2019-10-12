//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";

import "./list.less";
import Item from "./item";

import Calls from "calls";
//@@viewOff:imports

export const List = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "List",
    classNames: {
      main: Config.CSS + "list"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    lid: UU5.PropTypes.string,
    sys: UU5.PropTypes.object,
    text: UU5.PropTypes.string,

    onEditList: UU5.PropTypes.func,
    onRemoveList: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps(){
    return {
      lid: "",
      sys: {
        cts: "",
        mts: "",
        rev: "",
      },
      text: "",
    }
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState(){
    return {
      items: [
        {
          iid: "0",
          sys: {
            cts: "01.01.2019 10:10:10",
            mts: "02.02.2019 20:20:20",
            rev: "2"
          },
          list: "0",
          text: "První ukol",
          completed: false
        },
        {
          iid: "1",
          sys: {
            cts: "01.01.2019 11:11:11",
            mts: "03.03.2019 13:13:13",
            rev: "3"
          },
          list: "0",
          text: "Druhý ukol",
          completed: true
        },
        {
          iid: "0",
          sys: {
            cts: "1.1.2019 10:10:10",
            mts: "2.2.2019 02:02:02",
            rev: "2"
          },
          list: "1",
          text: "První ukol",
          completed: false
        },
        {
          iid: "1",
          sys: {
            cts: "21.10.2019 21:20:19",
            mts: "03.03.2019 03:04:05",
            rev: "3"
          },
          list: "1",
          text: "Druhý ukol",
          completed: true
        },
        {
          iid: "2",
          sys: {
            cts: "11.11.2019 11:12:13",
            mts: "31.03.2019 08:09:10",
            rev: "3"
          },
          list: "1",
          text: "Třetí ukol",
          completed: false
        }
      ]
    }
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  changeItemsState(id){
    this.setState((state) => {
      return {
        items: state.items.map(item => {
          if (item.iid == id){
            const editItem = {...item};
            editItem.completed = editItem.completed ? false : true;
            editItem.sys.mts = new Date().toLocaleString();
            editItem.sys.rev++;
            return editItem
          } else return item
        })
      }
    })
  },

  addItem(text){
    const now = new Date().toLocaleString();
    const newItem = {
      iid: UU5.Common.Tools.generateUUID(),
      sys: {
        cts: now,
        mts: now,
        rev: "0",
      },
      list: this.props.lid,
      text: text,
      completed: false,
    };
    this.setState((state) => {
      return {
        items: [...state.items,newItem]
      }
    })
    //Calls.setItems(getInitialState());
  },

  removeItem(id){
    this.setState((state) => {
      return {
        items: state.items.filter(item => item.iid != id)
      }
    })
  },

  editItem(id,newText){
    this.setState((state) => {
      return {
        items: state.items.map(item => {
          if (item.iid == id){
            const newItem = {...item};
            newItem.text = newText;
            newItem.sys.mts = new Date().toLocaleString();
            newItem.sys.rev++;
            return newItem
          } else return item
        })
      }
    })
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getItems(lid){
    const items = this.state.items.map(item => {
      if (item.list == lid) {
        return (
          <UU5.Bricks.Column key={item.iid} colWidth="m6 l6 xl4">
            <Item {...item}
                  onChangeCompletedState={this.changeItemsState}
                  onRemoveItem={this.removeItem}
                  onEditItem={this._openEditItemModal}
            />
          </UU5.Bricks.Column>
        )
      }
    })
    return (
      <UU5.Bricks.Row>
        {items}
      </UU5.Bricks.Row>
    )
  },

  _getAddItemForm(){
    return (
      <UU5.Forms.Form
        onSave = {(opt) => {
          this.addItem(opt.values.text);
          this._modal.close();
        }}
        onCancel = {() => {
          this._modal.close();
        }}
      >
        Text:
        <UU5.Forms.TextArea name="text"/>
        <UU5.Forms.Controls/>
      </UU5.Forms.Form>
    )
  },

  _getEditItemForm(id, text){
    return (
      <UU5.Forms.Form
        onSave = {(opt) => {
          this.editItem(id,opt.values.text);
          this._modal.close();
        }}
        onCancel = {() => {
          this._modal.close();
        }}
      >
        Text:
        <UU5.Forms.TextArea value={text} name="text"/>
        <UU5.Forms.Controls/>
      </UU5.Forms.Form>
    )
  },

  _openAddItemModal(){
    this._modal.open({
      header: "Add new item",
      content: this._getAddItemForm(),
    })
  },

  _openEditItemModal(id, text){
    this._modal.open({
      header: "Edit item",
      content: this._getEditItemForm(id,text),
    })
  },


  _editList(){
    const onEditList = this.props.onEditList;
    if (typeof onEditList == "function"){
      onEditList(this.props.lid, this.props.text);
    }

  },

  _removeList(){
    const onRemoveList = this.props.onRemoveList;
    if (typeof onRemoveList == "function"){
      onRemoveList(this.props.lid);
      this.setState((state) => {
        return {
          items: state.items.filter(item => item.list != this.props.lid)
        }
        }
      )

    }

  },

  _getHeader(){
    return(
      <UU5.Bricks.Div style="
                display: flex;
                justifyContent: space-between;
               ">
        <UU5.Bricks.Div style="borderRight: black 2px solid">
          <UU5.Bricks.Button
            onClick={this._editList}
            bgStyle="transparent"
            content={
              <UU5.Bricks.Icon icon="mdi-pencil"/>
            }
          />
          <UU5.Bricks.Button
            onClick={this._removeList}
            style="margin: 0px 5px"
            bgStyle="transparent"
            content={
              <UU5.Bricks.Icon icon="mdi-delete"/>
            }/>
        </UU5.Bricks.Div>
        <UU5.Bricks.Div style="fontSize: 20px;margin: 0px 10px">
          {this.props.text}
        </UU5.Bricks.Div>
      </UU5.Bricks.Div>
    )
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()} style="margin: 0px 20px;textAlign: center;">
        <UU5.Bricks.Modal ref_={(modal) => this._modal = modal}/>

        <UU5.Bricks.Column
          key={this.props.lid}
        >
          <UU5.Bricks.Div>
            <UU5.Bricks.Panel
              header ={this._getHeader()}
              iconExpanded = "uu5-arrow-up"
              iconCollapsed = "uu5-arrow-down"
              style = "margin: 5px;">

              {this._getItems(this.props.lid)}

              <UU5.Bricks.Button content="Add Item"
                                 onClick={this._openAddItemModal}
                                 bgStyle="outline"
                                 style = "margin: 10px"
              />

            </UU5.Bricks.Panel>
          </UU5.Bricks.Div>
        </UU5.Bricks.Column>



      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default List;
