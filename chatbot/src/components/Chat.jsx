import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessages } from "../slices/chatSlice";
import { logoutUser } from "../slices/userSlice";
import { ref, push, set, onValue } from "firebase/database";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Divider,
  Fab
} from "@mui/material";
import {
  Send as SendIcon,
  Clear as ClearIcon,
  Logout as LogoutIcon,
  SmartToy as BotIcon,
  Person as PersonIcon
} from "@mui/icons-material";

export default function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector(state => state.chat.messages);
  const user = useSelector(state => state.user.user);
  const [input, setInput] = useState("");
  const [topic, setTopic] = useState("fitness");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      const messagesRef = ref(db, `messages/${user.uid}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const msgs = Object.values(data);
          dispatch(clearMessages());
          msgs.forEach(msg => dispatch(addMessage(msg)));
        } else {
          dispatch(clearMessages());
        }
      });
    }
  }, [dispatch, user?.uid]);

  const sendToAI = async (userMessage) => {
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      return data.reply || "No response";
    } catch (err) {
      console.error("AI fetch error:", err);
      return "Error from AI. Try again later.";
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    dispatch(addMessage({ sender: "user", text: input }));
    push(ref(db, `messages/${user.uid}`), { sender: "user", text: input });

    const botReply = await sendToAI(input);

    dispatch(addMessage({ sender: "bot", text: botReply }));
    push(ref(db, `messages/${user.uid}`), { sender: "bot", text: botReply });

    setInput("");
    setIsLoading(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleClearChat = () => {
    dispatch(clearMessages());

    const messagesRef = ref(db, "messages");
    set(messagesRef, null);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatbot - Welcome, {user?.email || "User"}!
          </Typography>
          <IconButton color="inherit" onClick={handleClearChat}>
            <ClearIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>


      <Box sx={{ p: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Topic</InputLabel>
          <Select
            value={topic}
            label="Topic"
            onChange={(e) => setTopic(e.target.value)}
          >
            <MenuItem value="fitness">Fitness</MenuItem>
            <MenuItem value="cooking">Cooking</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
        </FormControl>
      </Box>


      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Container maxWidth="md">
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', maxWidth: '70%' }}>
                  {message.sender === "bot" && (
                    <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                      <BotIcon />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: message.sender === "user" ? "primary.main" : "grey.100",
                      color: message.sender === "user" ? "primary.contrastText" : "text.primary",
                      borderRadius: 2,
                      maxWidth: '100%'
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                  </Paper>
                  {message.sender === "user" && (
                    <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>
                      <PersonIcon />
                    </Avatar>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>


      <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              sx={{ mr: 1 }}
            />
            <Fab
              color="primary"
              size="medium"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              <SendIcon />
            </Fab>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
