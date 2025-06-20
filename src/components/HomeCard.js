import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Divider } from '@mui/material';
import { useAtom } from 'jotai';
import { userObject } from "../state";
import { AccountBalanceWallet, AccountCircleOutlined, Loop, Loyalty } from '@mui/icons-material';

export default function HomeCard() {
    const navigate = useNavigate();
    const [user] = useAtom(userObject);

    const viewEarnings = () => {
        navigate("/profile");
    };

    const viewReferrals = () => {
        navigate("/referrals");
    };

    return (
        <Card
            variant="outlined"
            sx={{
                background: 'rgba(33, 37, 41, 0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                p: 3,
                mb: 3
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Typography 
                    level="body-sm" 
                    sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                >
                    Total Balance
                </Typography>
                <Typography 
                    level="h3" 
                    sx={{ 
                        background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        mt: 0.5
                    }}
                >
                    Ksh {user.accountBalance}.00
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

            <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography 
                        level="body-sm" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.7)',
                            mb: 0.5
                        }}
                    >
                        Your Balance:
                    </Typography>
                    <Typography 
                        level="title-lg" 
                        startDecorator={<AccountBalanceWallet sx={{ color: '#51cf66' }} />}
                        sx={{ color: '#fff' }}
                    >
                        Ksh {user.accountBalance}.00
                    </Typography>
                </Box>
                <Button
                    onClick={viewEarnings}
                    variant="solid"
                    size="md"
                    endDecorator={<AccountCircleOutlined />}
                    sx={{
                        background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 15px rgba(229, 46, 113, 0.4)',
                        }
                    }}
                >
                    Profile
                </Button>
            </CardContent>

            <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 2, mt: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography 
                        level="body-sm" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.7)',
                            mb: 0.5
                        }}
                    >
                        Loyalty Points:
                    </Typography>
                    <Typography 
                        level="title-lg" 
                        startDecorator={<Loyalty sx={{ color: '#4dabf7' }} />}
                        sx={{ color: '#fff' }}
                    >
                        {user.loyaltyPoints}
                    </Typography>
                </Box>
                <Button
                    onClick={viewReferrals}
                    variant="solid"
                    size="md"
                    endDecorator={<Loop />}
                    sx={{
                        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 15px rgba(0, 210, 255, 0.4)',
                        }
                    }}
                >
                    Referrals
                </Button>
            </CardContent>
        </Card>
    );
}
