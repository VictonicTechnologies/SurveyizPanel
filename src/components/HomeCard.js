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
                background: 'rgba(33, 37, 41, 0.7)', // Matches .hero background
                backdropFilter: 'blur(8px)', // Matches .hero blur effect
                borderRadius: '20px', // Rounded corners from original HomeCard
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)', // Matches original HomeCard
                border: '1px solid rgba(255, 255, 255, 0.1)', // Matches original HomeCard
                p: 3,
                mb: 3,
                color: '#f8f9fa', // Matches body text color
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Matches body font
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Typography 
                    level="body-sm" 
                    sx={{ 
                        color: 'rgba(255,255,255,0.7)', // Matches original HomeCard
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '1rem', // Matches .tagline for smaller text
                    }}
                >
                    Total Balance
                </Typography>
                <Typography 
                    level="h3" 
                    sx={{ 
                        background: 'linear-gradient(90deg, #ff8a00, #e52e71)', // Matches .welcome-text
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        mt: 0.5,
                        fontSize: { xs: '2rem', md: '2.5rem' }, // Matches .welcome-text responsive
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)', // Matches .welcome-text
                    }}
                >
                    Ksh {user.accountBalance}.00
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} /> {/* Unchanged */}

            <CardContent 
                orientation="horizontal" 
                sx={{ 
                    alignItems: 'center', 
                    gap: 2,
                    background: 'linear-gradient(135deg, #e6f4ea 0%, #f1f8ff 100%)', // Matches .card background
                    borderRadius: '10px', // Matches .card
                    p: 2,
                    color: '#343a40', // Matches .card text for readability
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography 
                        level="body-sm" 
                        sx={{ 
                            color: '#343a40', // Adjusted for readability on light background
                            mb: 0.5,
                            fontSize: '1rem', // Matches .tagline
                            opacity: 0.8, // Matches .tagline
                        }}
                    >
                        Your Balance:
                    </Typography>
                    <Typography 
                        level="title-lg" 
                        startDecorator={<AccountBalanceWallet sx={{ color: '#51cf66' }} />}
                        sx={{ 
                            color: '#343a40', // Adjusted for readability
                            fontSize: { xs: '1.5rem', md: '1.8rem' }, // Responsive adjustment
                        }}
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
                        background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)', // Matches .cta-button
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        borderRadius: '50px', // Matches .cta-button
                        padding: '12px 30px', // Matches .cta-button
                        fontSize: { xs: '1rem', md: '1.1rem' }, // Matches .cta-button responsive
                        boxShadow: '0 4px 15px rgba(229, 46, 113, 0.4)', // Matches .cta-button
                        transition: 'all 0.3s ease', // Matches .cta-button
                        '&:hover': {
                            transform: 'translateY(-3px)', // Matches .cta-button hover
                            boxShadow: '0 8px 20px rgba(229, 46, 113, 0.6)', // Matches .cta-button hover
                            background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)', // Consistent gradient
                        },
                    }}
                >
                    Profile
                </Button>
            </CardContent>

            <CardContent 
                orientation="horizontal" 
                sx={{ 
                    alignItems: 'center', 
                    gap: 2, 
                    mt: 2,
                    background: 'linear-gradient(135deg, #e6f4ea 0%, #f1f8ff 100%)', // Matches .card background
                    borderRadius: '10px', // Matches .card
                    p: 2,
                    color: '#343a40', // Matches .card text
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography 
                        level="body-sm" 
                        sx={{ 
                            color: '#343a40', // Adjusted for readability
                            mb: 0.5,
                            fontSize: '1rem', // Matches .tagline
                            opacity: 0.8, // Matches .tagline
                        }}
                    >
                        Loyalty Points:
                    </Typography>
                    <Typography 
                        level="title-lg" 
                        startDecorator={<Loyalty sx={{ color: '#4dabf7' }} />}
                        sx={{ 
                            color: '#343a40', // Adjusted for readability
                            fontSize: { xs: '1.5rem', md: '1.8rem' }, // Responsive adjustment
                        }}
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
                        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)', // Matches original HomeCard
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        borderRadius: '50px', // Matches .cta-button
                        padding: '12px 30px', // Matches .cta-button
                        fontSize: { xs: '1rem', md: '1.1rem' }, // Matches .cta-button responsive
                        boxShadow: '0 4px 15px rgba(0, 210, 255, 0.4)', // Matches original HomeCard hover
                        transition: 'all 0.3s ease', // Matches .cta-button
                        '&:hover': {
                            transform: 'translateY(-3px)', // Matches .cta-button hover
                            boxShadow: '0 8px 20px rgba(0, 210, 255, 0.6)', // Matches original HomeCard hover
                            background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)', // Consistent gradient
                        },
                    }}
                >
                    Referrals
                </Button>
            </CardContent>
        </Card>
    );
}
