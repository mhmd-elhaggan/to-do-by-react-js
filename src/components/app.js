 import React, {Component,ReactDOM} from 'react';
 import './style.css';
function _extends() {
	_extends =
	  Object.assign ||
	  function (target) {
		for (var i = 1; i < arguments.length; i++) {
		  var source = arguments[i];
		  for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
			  target[key] = source[key];
			}
		  }
		}
		return target;
	  };
	return _extends.apply(this, arguments);
  }
  const toDoItems = [];
  
  class CreateItem extends React.Component {
	handleCreate(e) {
	  e.preventDefault();
  
	  if (!this.refs.newItemInput.value) {
		alert("Please enter a task name.");
		return;
	  } else if (
		this.props.toDoItems
		  .map((element) => element.name)
		  .indexOf(this.refs.newItemInput.value) != -1
	  ) {
		alert("This task already exists.");
		this.refs.newItemInput.value = "";
		return;
	  }
  
	  this.props.createItem(this.refs.newItemInput.value);
	  this.refs.newItemInput.value = "";
	}
  
	render() {
	  return React.createElement(
		"div",
		{ className: "create-new" },
		React.createElement(
		  "form",
		  { onSubmit: this.handleCreate.bind(this) },
		  React.createElement("input", {
			type: "text",
			placeholder: "New Task",
			ref: "newItemInput",
		  }),
		  React.createElement("button", null, "Create")
		)
	  );
	}
  }
  
  class ToDoListItem extends React.Component {
	constructor(props) {
	  super(props);
  
	  this.state = {
		editing: false,
	  };
	}
  
	renderName() {
	  const itemStyle = {
		"text-decoration": this.props.completed ? "line-through" : "none",
		cursor: "pointer",
	  };
  
	  if (this.state.editing) {
		return React.createElement(
		  "form",
		  { onSubmit: this.onSaveClick.bind(this) },
		  React.createElement("input", {
			type: "text",
			ref: "editInput",
			defaultValue: this.props.name,
		  })
		);
	  }
  
	  return React.createElement(
		"span",
		{
		  style: itemStyle,
		  onClick: this.props.toggleComplete.bind(this, this.props.name),
		},
		this.props.name
	  );
	}
  
	renderButtons() {
	  if (this.state.editing) {
		return React.createElement(
		  "span",
		  null ,
		  React.createElement(
			"button",
			{ onClick: this.onSaveClick.bind(this) },
			"Save"
		  ) ,
		  React.createElement(
			"button",
			{ onClick: this.onCancelClick.bind(this) },
			"Cancel"
		  )
		);
	  }
  
	  return React.createElement(
		"span",
		null ,
		React.createElement(
		  "button",
		  { onClick: this.onEditClick.bind(this) },
		  "Edit"
		) ,
		React.createElement(
		  "button",
		  { onClick: this.props.deleteItem.bind(this, this.props.name) },
		  "Delete"
		)
	  );
	}
  
	onEditClick() {
	  this.setState({ editing: true });
	}
  
	onCancelClick() {
	  this.setState({ editing: false });
	}
  
	onSaveClick(e) {
	  e.preventDefault();
	  this.props.saveItem(this.props.name, this.refs.editInput.value);
	  this.setState({ editing: false });
	}
  
	render() {
	  return React.createElement(
		"div",
		{ className: "to-do-item" } ,
		React.createElement(
		  "span",
		  { className: "name" },
		  this.renderName()
		) ,
  
		React.createElement(
		  "span",
		  { className: "actions" },
		  this.renderButtons()
		)
	  );
	}
  }
  
  class ToDoList extends React.Component {
	renderItems() {
	  return this.props.toDoItems.map((item, index) =>
		React.createElement(
		  ToDoListItem,
		  _extends({ key: index }, item, this.props)
		)
	  );
	}
  
	render() {
	  return React.createElement(
		"div",
		{ className: "items-list" },
		this.renderItems()
	  );
	}
  }
  
  class App extends React.Component {
	constructor(props) {
	  super(props);
  
	  this.state = {
		toDoItems,
	  };
	}
  
	createItem(item) {
	  this.state.toDoItems.unshift({
		name: item,
		completed: false,
	  });
  
	  this.setState({
		toDoItems: this.state.toDoItems,
	  });
	}
  
	findItem(item) {
	  return this.state.toDoItems.filter((element) => element.name === item)[0];
	}
  
	toggleComplete(item) {
	  let selectedItem = this.findItem(item);
	  selectedItem.completed = !selectedItem.completed;
	  this.setState({ toDoItems: this.state.toDoItems });
	}
  
	saveItem(oldItem, newItem) {
	  let selectedItem = this.findItem(oldItem);
	  selectedItem.name = newItem;
	  this.setState({ toDoItems: this.state.toDoItems });
	}

	deleteItem(item) {
	  let index = this.state.toDoItems
		.map((element) => element.name)
		.indexOf(item);
	  this.state.toDoItems.splice(index, 1);
	  this.setState({ toDoItems: this.state.toDoItems });
	}
  
	render() {
	  return React.createElement(
		"div",
		{ className: "to-do-app" } ,
		React.createElement(
		  "div",
		  { className: "header" } ,
		  React.createElement("h1", null, "ToDo List")
		) ,
  
		React.createElement(CreateItem, {
		  toDoItems: this.state.toDoItems,
		  createItem: this.createItem.bind(this),
		}) ,
		React.createElement(ToDoList, {
		  toDoItems: this.state.toDoItems,
		  deleteItem: this.deleteItem.bind(this),
		  saveItem: this.saveItem.bind(this),
		  toggleComplete: this.toggleComplete.bind(this),
		})
	  );
	}
  }

  export default App;