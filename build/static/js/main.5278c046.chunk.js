(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(45)},41:function(e,t,n){},43:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(16),l=n.n(r),i=n(4),s=n(5),c=n(7),u=n(6),m=n(8),h=n(1),d=n(3),f=n.n(d),g="/api/persons",v={getAll:function(){return f.a.get(g)},getAllPersons:function(){return f.a.get(g).then(function(e){return e.data})},create:function(e){return f.a.create(),f.a.post(g,e)},update:function(e,t){return f.a.put("".concat(g,"/").concat(e),t)},remove:function(e,t){return f.a.delete("".concat(g,"/").concat(e),t)},getById:function(e,t){return f.a.get("".concat(g,"/").concat(e),t)}},b=(n(41),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={date:new Date},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tick",value:function(){this.setState({date:new Date})}},{key:"render",value:function(){return o.a.createElement("div",{className:"clock"},o.a.createElement("h2",null,"Hello, react!"),o.a.createElement("h2",null,"It is ",this.state.date.toLocaleTimeString(),"."))}}]),t}(o.a.Component)),p=(n(43),function(e){function t(e){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return null===this.props.message?null:o.a.createElement("div",{className:"notification"},this.props.message)}}]),t}(o.a.Component)),k=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleAddPerson=function(e){e.preventDefault();var t=n.myFunctionA(n.state.persons,n.state.newName);if(t===n.state.persons.length);else if(window.confirm("Korvataanko? "+n.state.persons[t].name+" "+n.state.persons[t].number+". T\xe4ll\xe4 uudella tiedolla: "+n.state.newName+" "+n.state.newNumber)){v.remove(n.state.persons[t].id).catch(function(e){console.log("remove error",e)});var a=n.setState({persons:n.myFunctionC(n.state.persons,n.myFunctionB(n.state.persons,n.state.persons[t].id))});console.log("taulu 004",a)}var o={name:n.state.newName,number:n.state.newNumber,date:(new Date).toISOString()};v.create(o).then(function(e){n.setState({persons:n.state.persons.concat(e.data),newName:"",newNumber:""})})},n.handleNameChange=function(e){n.setState({newName:e.target.value})},n.handleNumberChange=function(e){n.setState({newNumber:e.target.value})},n.handleFilterChange=function(e){console.log(e.target.value),n.setState({newFilter:e.target.value})},n.notify=function(e){console.log("notify 001",e,n.state.notification),n.setState({notification:e}),console.log("notify 002",e,n.state.notification),setTimeout(function(){n.setState({notification:null})},5e3)},n.handleOnClickPoista=function(e){if(window.confirm("poistetaanko: "+e)){var t=n.state.persons.filter(function(t){return t.id===e});v.remove(e).then(function(a){n.setState({persons:n.state.persons.filter(function(t){return t.id!==e})}),n.notify("".concat(e," ").concat(t[0].name," removed"))})}},n.state={persons:[{name:"Arto Hellas Parikka",number:"040-5551235467",date:"2017-12-10T17:30:31.098Z",id:1}],newName:"",newNumber:"",newFilter:"",personIdMax:6,errorMessage1:"... jokin meni pieleen ...",errorMessage2:"... poisto onnistui ...",errorMessage3:"... tapaus lis\xe4tty ...",messageType:"success",showNoteC:!1,notification:null},n.handleAddPerson=n.handleAddPerson.bind(Object(h.a)(Object(h.a)(n))),n.handleFilterChange=n.handleFilterChange.bind(Object(h.a)(Object(h.a)(n))),n.handleNameChange=n.handleNameChange.bind(Object(h.a)(Object(h.a)(n))),n.handleNumberChange=n.handleNumberChange.bind(Object(h.a)(Object(h.a)(n))),n.handleOnClickPoista=n.handleOnClickPoista.bind(Object(h.a)(Object(h.a)(n))),console.log("constructor Puhelinluettelo"),n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("did mount Puhelinluettelo"),v.getAll().then(function(t){e.setState({persons:t.data}),console.log("response getAll()",t),console.log("response.data",t.data)})}},{key:"myFunctionA",value:function(e,t){for(var n=e.length,a=0;a<e.length;a++)console.log("nimi ",a," ",e[a].name," onko ",t),e[a].name===t&&(n=a,a=e.length);return n}},{key:"myFunctionB",value:function(e,t){for(var n=e.length,a=0;a<e.length;a++)e[a].id===t&&(n=a,a=e.length);return n}},{key:"myFunctionC",value:function(e,t){var n=e.slice(0,t).concat(e.slice(t+1));return console.log("taulu2 001",n),n}},{key:"rajauksenL",value:function(){return this.state.newFilter.length}},{key:"rajauksenT",value:function(){return this.state.newFilter}},{key:"rajauksenFilter",value:function(){var e,t=this;return this.rajauksenL()<1?(e=this.state.persons,console.log("rejauksenFilter 001",e,this.state.persons)):(e=this.state.persons.filter(function(e){return e.name.toLowerCase().substring(0,t.rajauksenL())===t.rajauksenT().toLowerCase()}),console.log("rejauksenFilter 002")),console.log("rajauksenFilter 003",e),e}},{key:"render",value:function(){var e=this;return console.log("render Puhelinluettelo"),o.a.createElement("div",null,o.a.createElement("h2",null,"Puhelinluettelo"),o.a.createElement(b,null),o.a.createElement(j,{v:this.state.newFilter,oc:this.handleFilterChange}),o.a.createElement("form",{onSubmit:this.handleAddPerson},o.a.createElement(p,{message:this.state.notification}),o.a.createElement(w,{v:this.state.newName,oc:this.handleNameChange}),o.a.createElement(E,{v:this.state.newNumber,oc:this.handleNumberChange}),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))),o.a.createElement("div",null,o.a.createElement("h2",null,"Numerot"),o.a.createElement("table",null,o.a.createElement("thead",null),o.a.createElement("tbody",null,this.rajauksenFilter().map(function(t){return o.a.createElement("tr",{key:t.id},o.a.createElement("td",null,t.id),o.a.createElement("td",null,t.name),o.a.createElement("td",null,t.number),o.a.createElement("td",null,o.a.createElement("button",{onClick:e.handleOnClickPoista.bind(e,t.id)},"poista")))})))))}}]),t}(o.a.Component),j=function(e){return o.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4 nimi\xe4:",o.a.createElement("input",{value:e.v,onChange:e.oc}))},w=function(e){return o.a.createElement("div",null,"nimi:",o.a.createElement("input",{value:e.v,onChange:e.oc}))},E=function(e){return o.a.createElement("div",null,"number:",o.a.createElement("input",{value:e.v,onChange:e.oc}))},y=k;l.a.render(o.a.createElement(y,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.5278c046.chunk.js.map