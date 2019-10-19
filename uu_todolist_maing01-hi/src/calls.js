/**
 * Server calls of application client.
 */
import * as UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";

let Calls = {
  /** URL containing app base, e.g. "https://uuos9.plus4u.net/vnd-app/awid/". */
  APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  call(method, url, dtoIn, clientOptions) {
    return Plus4U5.Common.Calls.call(method, url, dtoIn, clientOptions);
  },


  loadDemoContent(dtoIn) {
    let commandUri = Calls.getCommandUri("loadDemoContent");
    return Calls.call("get", commandUri, dtoIn);
  },

  getItems() {
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls) {
        const newDB = {lists: [], items: []};
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB.items)

      } else {
        const db = JSON.parse(ls);
        resolve(db.items);

      }
    })
  },

  getLists() {
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls){
        const newDB = {lists: [], items: []};
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB.lists)
      } else {
        const db = JSON.parse(ls);
        resolve(db.lists);
      }
    })
  },

  createItem(dtoInData) {
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls){
        const newDB = {lists: [], items: []};
        newDB.items.push(dtoInData);
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB)
      } else {
        const db = JSON.parse(ls);
        db.items.push(dtoInData);
        localStorage.setItem("TODO_DB", JSON.stringify(db));
        resolve(dtoInData);
      }
    })
  },

  createList(dtoInData) {
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls){
        const newDB = {lists: [], items: []};
        newDB.lists.push(dtoInData);
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB)
      } else {
        const db = JSON.parse(ls);
        db.lists.push(dtoInData);
        localStorage.setItem("TODO_DB", JSON.stringify(db));
        resolve(dtoInData);
      }
    })
  },

  updateItem(id,newItem) {
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls){
        const newDB = {lists: [], items: []};
        newDB.items.push(newItem);
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB)
      } else {
        const db = JSON.parse(ls);
        db.items = db.items.map(item => {
          if (item.iid == id) {
            return newItem
          } else return item;
        })
        localStorage.setItem("TODO_DB", JSON.stringify(db));
        resolve(newItem);
      }
    })
  },

  updateList(id, newList) {
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls){
        const newDB = {lists: [], items: []};
        newDB.lists.push(newItem);
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB)
      } else {
        const db = JSON.parse(ls);
        db.lists = db.lists.map(list => {
          if (list.lid == id) {
            return newList
          } else return list;
        })
        localStorage.setItem("TODO_DB", JSON.stringify(db));
        resolve(newList);
      }
    })
  },


  removeItem(id){
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls){
        const newDB = {lists: [], items: []};
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB)
      } else {
        const db = JSON.parse(ls);
        db.items = db.items.filter(item => item.iid != id);
        localStorage.setItem("TODO_DB", JSON.stringify(db));
      }
    })
  },

  removeList(id){
    return new Promise((resolve,reject)=>{
      const ls = localStorage.getItem("TODO_DB");
      if (!ls){
        const newDB = {lists: [], items: []};
        localStorage.setItem("TODO_DB", JSON.stringify(newDB));
        resolve(newDB)
      } else {
        const db = JSON.parse(ls);
        db.lists = db.lists.filter(list => list.lid != id);
        db.items = db.items.filter(item => item.list != id);
        localStorage.setItem("TODO_DB", JSON.stringify(db));
        resolve(id)
      }
    })

  },

  /*
  For calling command on specific server, in case of developing client site with already deployed
  server in uuCloud etc. You can specify url of this application (or part of url) in development
  configuration in *-client/env/development.json, for example:
   {
     ...
     "uu5Environment": {
       "gatewayUri": "https://uuos9.plus4u.net",
       "tid": "84723877990072695",
       "awid": "b9164294f78e4cd51590010882445ae5",
       "vendor": "uu",
       "app": "demoappg01",
       "subApp": "main"
     }
   }
   */
  getCommandUri(aUseCase) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let targetUriStr = Calls.APP_BASE_URI + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = UU5.Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let url = Plus4U5.Common.Url.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) {
            let match = env.gatewayUri.match(/^([^:]*):\/\/([^/]+?)(?::(\d+))?(\/|$)/);
            if (match) {
              url.protocol = match[1];
              url.hostName = match[2];
              url.port = match[3];
            }
          }
          if (env.tid) url.tid = env.tid;
          if (env.awid) url.awid = env.awid;
        }
        if (env.vendor || env.app) {
          if (env.vendor) url.vendor = env.vendor;
          if (env.app) url.app = env.app;
          if (env.subApp) url.subApp = env.subApp;
        }
        targetUriStr = url.toString();
      }
    }

    return targetUriStr;
  }
};

export default Calls;
