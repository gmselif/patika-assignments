import React, { useState } from 'react'

function App() {
  const [text, setText] = useState("")
  const [contacts, setContacts] = useState(
    [
      {
        name: "Learn JavaScript",
        checked: false,
      },
      {
        name: "Learn React",
        checked: false,
      },
      {
        name: "Have a life!",
        checked: false,
      }
    ]
  )
  const [activeButton, setActiveButton] = useState("all")

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (text === "") {
        return false
      }
      setContacts([...contacts, { "name": text, "checked": false }])
    }
  }

  const handleCheckboxChange = (name) => {
    var newArr = []

    contacts?.map(item => {
      item.name === name ?
        newArr.push({ "name": item.name, "checked": !item.checked })
        : newArr.push(item)
    })
    setContacts([...newArr])
  }

  const handleDelete = (name) => {
    setContacts(contacts.filter(contact => contact.name !== name))
  }

  const handleButtons = (btn) => {
    btn === "all" && setActiveButton("all")
    btn === "active" && setActiveButton("active")
    btn === "completed" && setActiveButton("completed")
  }

  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              value={text}
              onChange={handleChange}
              onKeyDown={handleSubmit}
              name='todo'
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {activeButton === "all" && contacts && contacts.map((contact, key) =>
              <li key={key} className={contact.checked ? "completed" : ""}>
                <div className="view">
                  <input className="toggle" type="checkbox" onChange={() => handleCheckboxChange(contact.name)} />
                  <label>{contact.name}</label>
                  <button className="destroy" onClick={() => handleDelete(contact.name)}></button>
                </div>
              </li>
            )}
            {activeButton === "active" && contacts && contacts.map((contact, key) =>
              !contact.checked &&
              <li key={key} className={contact.checked ? "completed" : ""}>
                <div className="view">
                  <input className="toggle" type="checkbox" onChange={() => handleCheckboxChange(contact.name)} />
                  <label>{contact.name}</label>
                  <button className="destroy" onClick={() => handleDelete(contact.name)}></button>
                </div>
              </li>
            )}
            {activeButton === "completed" && contacts && contacts.map((contact, key) =>
              contact.checked &&
              <li key={key} className={contact.checked ? "completed" : ""}>
                <div className="view">
                  <input className="toggle" type="checkbox" onChange={() => handleCheckboxChange(contact.name)} />
                  <label>{contact.name}</label>
                  <button className="destroy" onClick={() => handleDelete(contact.name)}></button>
                </div>
              </li>
            )}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{contacts.filter(item => !item.checked).length} </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a onClick={() => handleButtons("all")} value="all" className="selected">All</a>
            </li>
            <li>
              <a onClick={() => handleButtons("active")} value="active">Active</a>
            </li>
            <li>
              <a onClick={() => handleButtons("completed")}>Completed</a>
            </li>
          </ul>

          <button className="clear-completed">
            {contacts.find(item => item.checked) && "Clear completed"}
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  );
}

export default App;
