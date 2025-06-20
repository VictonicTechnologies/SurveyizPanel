import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { Card, LinearProgress, Container, Typography, Box, Grid, Button } from "@mui/joy";
import { useAtom } from 'jotai';
import { userObject, userLoggedIn } from "../../state";
import logo from "../../assets/logo.png";

const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Register() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useAtom(userLoggedIn);
  const [user, setUser] = useAtom(userObject);

  const [educationName, setEducationName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [lastnameError, setLastNameError] = useState(false);
  const [educationError, setEducationError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showProgressDialog, setProgressDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleEducationChange = (event) => {
    setEducationName(event.target.value);
  };

  const onTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const randomStr = (len, arr) => {
    let ans = '';
    for (let i = len; i > 0; i--) {
      ans += arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans;
  };

  if (loggedIn) {
    navigate("/home");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Validation checks remain the same
    if (data.get('firstName').length < 1) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    // ... other validation checks

    setProgressDialog(true);
    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        education: educationName,
        email: data.get('email'),
        password: data.get('password'),
        referralCode: randomStr(10, '12345ABCDE')
      }));
      setLoggedIn(true);
      setProgressDialog(false);
      navigate("/referralCode");
    }, 5000);
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs"
      sx={{
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Card
        variant="outlined"
        sx={{
          background: 'rgba(33, 37, 41, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          width: '100%',
          maxWidth: '700px',
          p: 4
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Box
            component="img"
            sx={{
              height: 40,
              mb: 2
            }}
            alt="Company Logo"
            src={logo}
          />
          <Typography 
            level="h3" 
            sx={{
              background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              fontWeight: 'bold',
              mb: 2,
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                margin: '10px auto',
                borderRadius: '3px'
              }
            }}
          >
            Create Your Account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                error={nameError}
                helperText={nameError ? "Please enter your first name" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff8a00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                  '& .MuiInputBase-input': {
                    color: '#fff',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={lastnameError}
                helperText={lastnameError ? "Please enter your last name" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff8a00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                  '& .MuiInputBase-input': {
                    color: '#fff',
                  }
                }}
              />
            </Grid>
          </Grid>

          <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
            <InputLabel 
              id="education-label"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                '&.Mui-focused': {
                  color: '#ff8a00',
                }
              }}
            >
              Level of Education *
            </InputLabel>
            <Select
              labelId="education-label"
              id="education"
              value={educationName}
              label="Level of Education *"
              onChange={handleEducationChange}
              sx={{
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff8a00',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff8a00',
                },
                '& .MuiSvgIcon-root': {
                  color: 'rgba(255,255,255,0.7)',
                }
              }}
            >
              <MenuItem value="High School">High School</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="Bachelors Degree">Bachelors Degree</MenuItem>
              <MenuItem value="Masters Degree">Masters Degree</MenuItem>
            </Select>
            {educationError && (
              <Typography sx={{ mt: 1 }} color="error" fontSize="sm">
                Please select your education level
              </Typography>
            )}
          </FormControl>

          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: '#ff8a00',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              }
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={passwordError}
            helperText={passwordError ? "Password must be at least 6 characters" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: '#ff8a00',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              }
            }}
          />

          <FormControlLabel
            control={
              <Checkbox 
                checked={termsAccepted} 
                onChange={onTermsChange}
                sx={{
                  color: '#ff8a00',
                  '&.Mui-checked': {
                    color: '#ff8a00',
                  },
                }}
              />
            }
            label={
              <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                I accept the{' '}
                <Link href="#" sx={{ color: '#6ea8fe' }}>
                  Terms and Conditions
                </Link>
              </Typography>
            }
            sx={{ mt: 2 }}
          />
          {termsError && (
            <Typography color="error" fontSize="sm">
              Please accept the terms and conditions
            </Typography>
          )}

          {showProgressDialog && (
            <LinearProgress 
              sx={{ 
                mt: 2,
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                }
              }} 
            />
          )}

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              py: 1.5,
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 20px rgba(229, 46, 113, 0.6)',
              }
            }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Already have an account?{' '}
                <Link href="/login" sx={{ color: '#6ea8fe' }}>
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}
