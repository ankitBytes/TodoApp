import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Paper,
  Divider,
  Stack,
  FormLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import RedoIcon from "@mui/icons-material/Redo";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const TodoContainer = ({ listID, todo, setToDos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToDoStatus = (todoID, status) => {
    setToDos((prevTodos) =>
      prevTodos.map((item) => (item.id === todoID ? { ...item, status } : item))
    );
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditText(todo.text); // Reset edit text when toggling
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = () => {
    setToDos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todo.id ? { ...item, text: editText } : item
      )
    );
    setIsEditing(false);
  };

  return (
    <Paper
      key={todo.id}
      sx={{ margin: 1, padding: 2, display: "flex", alignItems: "center" }}
    >
      {(listID === "onGo" || listID === "drop") && (
        <IconButton
          onClick={() => {
            if (listID === "onGo") {
              handleToDoStatus(todo.id, "done");
            } else if (listID === "drop") {
              let isRetrieve = window.confirm("Retrieving dropped todo.");
              if (isRetrieve) handleToDoStatus(todo.id, "onGo");
            }
          }}
        >
          {listID === "onGo" ? <CheckIcon /> : <RedoIcon />}
        </IconButton>
      )}
      <Box sx={{ flex: 1, paddingLeft: 2 }}>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            value={editText}
            onChange={handleEditChange}
            sx={{ marginBottom: 1 }}
          />
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{
                textDecoration:
                  listID === "done" || listID === "drop"
                    ? "line-through"
                    : "none",
              }}
            >
              {todo.text}
            </Typography>
            <Typography variant="body2">{`${todo.moment.time} ${todo.moment.day} ${todo.moment.date}`}</Typography>
          </>
        )}
      </Box>
      <Stack direction="row" spacing={1}>
        {listID === "onGo" && !isEditing && (
          <IconButton onClick={handleEditToggle}>
            <EditIcon />
          </IconButton>
        )}
        {isEditing && (
          <IconButton onClick={handleSaveEdit}>
            <SaveIcon />
          </IconButton>
        )}
        {(listID === "done" || listID === "onGo" || listID === "drop") && (
          <IconButton
            onClick={() => {
              if (listID === "done" || listID === "drop") {
                let isRemove = window.confirm("Removing todo permanently!");
                if (isRemove) handleToDoStatus(todo.id, "remove");
              } else if (listID === "onGo") {
                handleToDoStatus(todo.id, "drop");
              }
            }}
          >
            {listID === "done" || listID === "drop" ? (
              <DeleteIcon />
            ) : (
              <CloseIcon />
            )}
          </IconButton>
        )}
      </Stack>
    </Paper>
  );
};

const Header = () => {
  const getDay = () => {
    const currDate = new Date();
    const dayNames_full = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day_full = dayNames_full[currDate.getDay()];
    const dayNames_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day_short = dayNames_short[currDate.getDay()];
    return { full: day_full, short: day_short };
  };
  return (
    <Box sx={{ textAlign: "center", marginBottom: 4 }}>
      <Typography variant="h3" component="h1" className="gradient-text1">
        ToDo List
      </Typography>
      <Typography variant="h5" component="h2">
        Hey, it's <span className="gradient-text2">{getDay()?.full}</span>
      </Typography>
    </Box>
  );
};

const Login = ({ setUserAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for demo purposes
    const validUsername = "user";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
      setUserAuthenticated(true);
      localStorage.setItem("userAuthenticated", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        We're excited to see you again. Please log in to continue managing your
        tasks and stay productive!
      </Typography>
      <form onSubmit={handleLogin} style={{ padding: "5vh 0" }}>
        <Box sx={{ padding: "1vh 0" }}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            placeholder="Username"
          />
        </Box>
        <Box>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            placeholder="Password"
          />
        </Box>
        <Button type="submit" sx={{ margin: "2vh 0" }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

const ToDoApp = () => {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState(() => {
    const saved = localStorage.getItem("todo_list_data");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [bottomNavItemID, setBottomNavItemID] = useState("nav_onGo");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const getTime = () => {
    const currDate = new Date();
    const hour = currDate.getHours();
    const minute = currDate.getMinutes();
    const AMorPM = hour >= 12 ? "PM" : "AM";
    let hour_12 = hour % 12;
    if (hour_12 === 0) hour_12 = 12;
    let minute_00 = minute.toString();
    if (minute < 10) minute_00 = `0${minute}`;
    return `${hour_12}:${minute_00} ${AMorPM}`;
  };

  const getDay = () => {
    const currDate = new Date();
    const dayNames_full = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day_full = dayNames_full[currDate.getDay()];
    const dayNames_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day_short = dayNames_short[currDate.getDay()];
    return { full: day_full, short: day_short };
  };

  const getDate = () => {
    const currDate = new Date();
    const dateSplit = currDate
      .toString()
      .slice(4, 15)
      .split(" ");
    return `${dateSplit[0]} ${dateSplit[1]}, ${dateSplit[2]}`;
  };

  useEffect(() => {
    const touchValue = touchEnd - touchStart;
    const swipeSensitivity = 150;
    if (touchEnd !== null) {
      if (touchValue > swipeSensitivity) {
        if (bottomNavItemID === "nav_done") {
          setBottomNavItemID("nav_onGo");
          setTouchStart(touchEnd);
        } else if (bottomNavItemID === "nav_onGo") {
          setBottomNavItemID("nav_drop");
          setTouchStart(touchEnd);
        }
      }
      if (touchValue < -swipeSensitivity) {
        if (bottomNavItemID === "nav_drop") {
          setBottomNavItemID("nav_onGo");
          setTouchStart(touchEnd);
        } else if (bottomNavItemID === "nav_onGo") {
          setBottomNavItemID("nav_done");
          setTouchStart(touchEnd);
        }
      }
    }
    return () => setTouchEnd(null);
  }, [touchEnd, touchStart, bottomNavItemID]);

  const handleUserInput = (e) => {
    setToDo(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (toDo.trim().length > 0) {
      setToDos([
        ...toDos,
        {
          id: Date.now(),
          text: toDo,
          status: "onGo",
          moment: {
            time: getTime(),
            day: getDay()?.short,
            date: getDate(),
          },
        },
      ]);
      setToDo("");
      setBottomNavItemID("nav_onGo");
    }
  };

  const resetInputField = () => {
    setToDo("");
  };

  const handleBottomNavControl = (navItemID) => {
    setBottomNavItemID(navItemID);
  };

  useEffect(() => {
    if (toDos) {
      const index = toDos.findIndex((obj) => obj.status === "remove");
      if (index > -1) toDos.splice(index, 1);
    }
    localStorage.setItem("todo_list_data", JSON.stringify(toDos));
  }, [toDos]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleInputSubmit}
        sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}
      >
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={toDo}
          onChange={handleUserInput}
          placeholder="Plan something . . ."
        />
        <Stack direction={"column"}>
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
          <IconButton onClick={resetInputField}>
            <ClearIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box>
        {["done", "onGo", "drop"].map((status) => (
          <Box
            key={status}
            className={`list ${status}`}
            sx={{
              display: bottomNavItemID === `nav_${status}` ? "block" : "none",
              marginBottom: 4,
            }}
          >
            <Typography variant="h6">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box>
              {toDos
                .filter((item) => item.status === status)
                .map((todo) => (
                  <TodoContainer
                    key={todo.id}
                    listID={status}
                    todo={todo}
                    setToDos={setToDos}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-around",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {["done", "onGo", "drop"].map((navItem) => (
          <Button
            key={navItem}
            sx={{
              flex: 1,
              padding: 2,
              textTransform: "none",
              backgroundColor:
                bottomNavItemID === `nav_${navItem}`
                  ? "rgba(0, 0, 0, 0.1)"
                  : "transparent",
            }}
            onClick={() => handleBottomNavControl(`nav_${navItem}`)}
          >
            {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <Container>
      <Header />
      {userAuthenticated ? (
        <ToDoApp />
      ) : (
        <Login setUserAuthenticated={setUserAuthenticated} />
      )}
    </Container>
  );
}

export default App;
