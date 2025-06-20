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
  
  const WITHDRAWAL_LIMIT = 4500; // Ksh 4,500

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = parseFloat(data.get('amount'));
    
    // Reset previous errors
    setAmountError(null);

    // Validate amount
    if (isNaN(amount) {
      setAmountError("Please enter a valid amount");
      return;
    }

    if (amount <= 0) {
      setAmountError("Amount must be greater than zero");
      return;
    }

    if (amount < user.minimumWithdrawal) {
      setAmountError(`Minimum withdrawal is Ksh ${user.minimumWithdrawal.toLocaleString()}`);
      return;
    }

    if (amount > WITHDRAWAL_LIMIT) {
      setAmountError(`Maximum withdrawal amount is Ksh ${WITHDRAWAL_LIMIT.toLocaleString()}`);
      return;
    }

    if (amount > user.accountBalance) {
      setAmountError("Insufficient account balance");
      return;
    }

    setProgressDialog(true);
    
    setTimeout(() => {
      setProgressDialog(false);
      setUser(prev => ({
        ...prev,
        accountBalance: prev.accountBalance - amount
      }));
      navigate("/profile", { 
        state: { 
          success: true,
          message: `Successfully withdrew Ksh ${amount.toLocaleString()}` 
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
                  <FormControl sx={{ mb: 2 }}>
                    <FormLabel>
                      Account Balance:
                      <Typography level="title-lg">
                        Ksh {user.accountBalance.toLocaleString()}
                      </Typography>
                    </FormLabel>
                    <Typography level="body-sm" sx={{ mt: 1 }}>
                      Withdrawal limits: Ksh {user.minimumWithdrawal.toLocaleString()} - Ksh {WITHDRAWAL_LIMIT.toLocaleString()}
                    </Typography>
                  </FormControl>
                  
                  <FormControl error={!!amountError}>
                    <FormLabel>Enter Amount</FormLabel>
                    <Input
                      margin="normal"
                      required
                      fullWidth
                      name="amount"
                      placeholder={`Enter amount (Ksh ${user.minimumWithdrawal.toLocaleString()} - ${WITHDRAWAL_LIMIT.toLocaleString()})`}
                      type="number"
                      id="amount"
                      inputProps={{
                        min: user.minimumWithdrawal,
                        max: WITHDRAWAL_LIMIT,
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
