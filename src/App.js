import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { auth } from './firebase'; // Importing Firebase auth
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register'; // Ensure this component is defined
import Login from './Login'; // Ensure this component is defined

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Listen for changes to the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user); // Set logged in state based on user existence
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Load saved todos from local storage
    const savedTodo = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleAddTodo = () => {
    if (!isLoggedIn) return alert("Please log in to add todos.");

    const newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = index => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = index => {
    const now = new Date();
    const completedOn = now.toLocaleString();

    const filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = index => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem(prev => ({ ...prev, title: value }));
  }

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem(prev => ({ ...prev, description: value }));
  }

  const handleUpdateToDo = () => {
    const newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
    localStorage.setItem('todolist', JSON.stringify(newToDo));
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Login Error: ", error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Sign Up Error: ", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error: ", error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <div className="App">
        <h1>My Todos</h1>
        <Routes>
          <Route path="/todos" element={isLoggedIn ? (
            <div className="todo-wrapper">
              <div className="todo-input">
                <div className="todo-input-item">
                  <label>Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="What's the task title?"
                  />
                </div>
                <div className="todo-input-item">
                  <label>Description</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={e => setNewDescription(e.target.value)}
                    placeholder="What's the task description?"
                  />
                </div>
                <div className="todo-input-item">
                  <button
                    type="button"
                    onClick={handleAddTodo}
                    className="primaryBtn"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="btn-area">
  <button
    className={`secondaryBtn ${isCompleteScreen === false ? 'active' : ''}`}
    onClick={() => setIsCompleteScreen(false)}
  >
    Todo
  </button>
  <button
    className={`secondaryBtn ${isCompleteScreen === true ? 'active' : ''}`}
    onClick={() => setIsCompleteScreen(true)}
  >
    Completed
  </button>
</div>


              <div className="todo-list">
                {isCompleteScreen === false &&
                  allTodos.map((item, index) => {
                    if (currentEdit === index) {
                      return (
                        <div className='edit__wrapper' key={index}>
                          <input placeholder='Updated Title'
                            onChange={(e) => handleUpdateTitle(e.target.value)}
                            value={currentEditedItem.title} />
                          <textarea placeholder='Updated Description'
                            rows={4}
                            onChange={(e) => handleUpdateDescription(e.target.value)}
                            value={currentEditedItem.description} />
                          <button
                            type="button"
                            onClick={handleUpdateToDo}
                            className="primaryBtn"
                          >
                            Update
                          </button>
                        </div>
                      )
                    } else {
                      return (
                        <div className="todo-list-item" key={index}>
                          <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                          </div>

                          <div>
                            <AiOutlineDelete
                              className="icon"
                              onClick={() => handleDeleteTodo(index)}
                              title="Delete?"
                            />
                            <BsCheckLg
                              className="check-icon"
                              onClick={() => handleComplete(index)}
                              title="Complete?"
                            />
                            <AiOutlineEdit className="check-icon"
                              onClick={() => handleEdit(index, item)}
                              title="Edit?" />
                          </div>

                        </div>
                      );
                    }
                  })}

                {isCompleteScreen === true &&
                  completedTodos.map((item, index) => {
                    return (
                      <div className="todo-list-item" key={index}>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                          <p><small>Completed on: {item.completedOn}</small></p>
                        </div>

                        <div>
                          <AiOutlineDelete
                            className="icon"
                            onClick={() => handleDeleteCompletedTodo(index)}
                            title="Delete?"
                          />
                        </div>

                      </div>
                    );
                  })}

              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )} />
          
          <Route path="/" element={
            !isLoggedIn ? (
              <div className="auth-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSignIn}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Login</button>
                </form>
                <h2>OR</h2>
                <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                <h2>Don't have an account?</h2>
                <form onSubmit={handleSignUp}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Sign Up</button>
                </form>
              </div>
            ) : (
              <Navigate to="/todos" />
            )
          } />
        </Routes>
        {isLoggedIn && <button onClick={handleSignOut}>Sign Out</button>}
      </div>
    </Router>
  );
}

export default App;