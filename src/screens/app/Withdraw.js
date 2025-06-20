import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { userObject } from "../../state";

import mpesaLogo from '../../assets/mpesa.png'
import {
  LinearProgress, Box, Button, Typography,
  Card, Grid, Divider, Input, FormControl, FormLabel, FormHelperText
} from "@mui/joy";
import AlertCard from "../../components/AlertCard";
import Tabs from '../../components/ResponsiveAppBar'

export default function Withdraw() {
  const navigate = useNavigate()
  const [amountError, setAmountError] = React.useState(null)
  const [showProgressDialog, setProgressDialog] = useState(false);
  const [user, setUser] = useAtom(userObject)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = parseFloat(data.get('amount'));
    
    // Reset previous errors
    setAmountError(null);

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      setAmountError("Please enter a valid amount");
      return;
    }

    if (amount < user.minimumWithdrawal) {
      setAmountError(`Minimum withdrawal is Ksh ${user.minimumWithdrawal}`);
      return;
    }

    if (amount > user.accountBalance) {
      setAmountError("Insufficient account balance");
      return;
    }

    setProgressDialog(true);
    
    // Simulate API call
    setTimeout(() => {
      setProgressDialog(false);
      
      // Update user balance (in a real app, this would come from the API response)
      setUser(prev => ({
        ...prev,
        accountBalance: prev.accountBalance - amount
      }));
      
      navigate("/profile", { 
        state: { 
          success: true,
          message: `Successfully withdrew Ksh ${amount}` 
        } 
      });
    }, 2000);
  };

  return (
    <div>
      <Tabs />
      <Card variant="soft">
        <Typography level="h3">Withdraw</Typography>
        <Divider sx={{ mt: 0.5, mb: 0.5 }} />
        
        <Grid xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid>
              <Box
                component="img"
                sx={{
                  height: 70,
                  width: 100,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="M-Pesa Logo"
                src={mpesaLogo}
              />

              <Card size="lg">
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <FormControl>
                    <FormLabel>
                      Account Balance:
                      <Typography level="title-lg">
                        Ksh {user.accountBalance.toLocaleString()}
                      </Typography>
                    </FormLabel>
                  </FormControl>
                  
                  <FormControl error={!!amountError}>
                    <FormLabel>Enter Amount</FormLabel>
                    <Input
                      margin="normal"
                      required
                      fullWidth
                      name="amount"
                      placeholder="Enter amount"
                      type="number"
                      id="amount"
                      inputProps={{
                        min: user.minimumWithdrawal,
                        max: user.accountBalance,
                        step: "any"
                      }}
                    />
                    {amountError && (
                      <FormHelperText>{amountError}</FormHelperText>
                    )}
                  </FormControl>

                  {showProgressDialog && <LinearProgress />}
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="solid"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={showProgressDialog}
                  >
                    {showProgressDialog ? "Processing..." : "Withdraw"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        <AlertCard 
          message="Payment system is selected based on your country for convenience" 
          severity="info"
        />
      </Card>
    </div>
  );
}
