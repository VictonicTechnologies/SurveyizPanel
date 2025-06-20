import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { 
  Card, 
  Typography, 
  Button, 
  Divider, 
  Box, 
  Input,
  FormControl,
  FormLabel,
  LinearProgress,
  Alert
} from '@mui/joy';
import ReferralCard from '../../components/ReferralsCard';
import AlertCard from '../../components/AlertCard';
import Tabs from '../../components/ResponsiveAppBar';
import { useAtom } from 'jotai';
import { userObject } from '../../state';
import { Email, Facebook, Twitter, WhatsApp, Link } from '@mui/icons-material';

export default function Referrals() {
  const [user, setUser] = useAtom(userObject);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Generate referral link based on user ID
  const referralLink = `https://https://panel.surveyiss.com/?ref=${user.id}`;
  
  // Sample referral data - replace with actual data from your backend
  const [referrals, setReferrals] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2023-05-15', status: 'Pending', points: 50 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2023-06-20', status: 'Verified', points: 100 },
  ]);

  const handleSendReferral = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setEmail('');
      
      // In a real app, you would add the sent referral to your backend
      setTimeout(() => setSendSuccess(false), 3000);
    }, 1500);
  };

  const shareOnSocial = (platform) => {
    let url = '';
    const message = `Join me on this awesome platform! Use my referral link: ${referralLink}`;
    
    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'email':
        url = `mailto:?subject=Join me!&body=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
  };

  return (
    <div>
      <Tabs/>
      <Card variant="soft">
        <Typography level="h3" mb={2}>
          Referral Program
        </Typography>
        
        <Typography level="title-lg" mb={1}>
          Your Referral Code: <strong>{user.referralCode || user.id}</strong>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>Your Referral Link</FormLabel>
            <Input 
              value={referralLink} 
              readOnly 
              endDecorator={
                <CopyToClipboard text={referralLink} onCopy={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}>
                  <Button variant="soft">{copied ? 'Copied!' : 'Copy'}</Button>
                </CopyToClipboard>
              }
            />
          </FormControl>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Button 
            variant="outlined" 
            startDecorator={<Facebook />}
            onClick={() => shareOnSocial('facebook')}
          >
            Share on Facebook
          </Button>
          <Button 
            variant="outlined" 
            startDecorator={<Twitter />}
            onClick={() => shareOnSocial('twitter')}
          >
            Share on Twitter
          </Button>
          <Button 
            variant="outlined" 
            startDecorator={<WhatsApp />}
            onClick={() => shareOnSocial('whatsapp')}
          >
            Share on WhatsApp
          </Button>
          <Button 
            variant="outlined" 
            startDecorator={<Email />}
            onClick={() => shareOnSocial('email')}
          >
            Share via Email
          </Button>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography level="title-lg" mb={2}>
          Invite by Email
        </Typography>
        
        <Box component="form" onSubmit={handleSendReferral} sx={{ mb: 3 }}>
          <FormControl error={!!error} sx={{ flex: 1 }}>
            <FormLabel>Friend's Email</FormLabel>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter friend's email"
                sx={{ flex: 1 }}
              />
              <Button 
                type="submit" 
                variant="solid"
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Invite'}
              </Button>
            </Box>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
          
          {isSending && <LinearProgress sx={{ mt: 1 }} />}
          {sendSuccess && (
            <Alert color="success" sx={{ mt: 1 }}>
              Invitation sent successfully!
            </Alert>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography level="title-lg" mb={2}>
          Your Referral Stats
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Card variant="soft" size="sm">
            <Typography level="body-sm">Total Referrals</Typography>
            <Typography level="h4">{referrals.length}</Typography>
          </Card>
          <Card variant="soft" size="sm">
            <Typography level="body-sm">Verified</Typography>
            <Typography level="h4">{referrals.filter(r => r.status === 'Verified').length}</Typography>
          </Card>
          <Card variant="soft" size="sm">
            <Typography level="body-sm">Pending</Typography>
            <Typography level="h4">{referrals.filter(r => r.status === 'Pending').length}</Typography>
          </Card>
          <Card variant="soft" size="sm">
            <Typography level="body-sm">Total Points</Typography>
            <Typography level="h4">{referrals.reduce((sum, r) => sum + (r.points || 0), 0)}</Typography>
          </Card>
        </Box>
        
        <ReferralCard referrals={referrals} />
        
        <AlertCard 
          message="Kindly note that we take time to verify referrals and this can lead to delays in referrals points being reflected in your account" 
          severity="info"
        />
      </Card>
    </div>
  );
}
