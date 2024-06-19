import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useNotification from '../ui/useNotification';
import useWaiting from '../ui/useWaiting';
import WandersonPhoto from '../assets/Wanderson.jpeg';

export default function AboutAluno() {
  const [about, setAbout] = React.useState('');

  const { notify, Notification } = useNotification();
  const { showWaiting, Waiting } = useWaiting();

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    showWaiting(true);
    try {
      const response = await fetch('http://localhost:3030/about/1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setAbout(result.info);
    } catch (error) {
      console.error(error);
      notify(error.message, 'error');
    } finally {
      showWaiting(false);
    }
  }

  return (
    <>
      <Waiting />
      <Notification />

      <Typography variant='h1' gutterBottom>
        Sobre o Autor
      </Typography>

      <Card sx={{ maxWidth: 345, margin: 'auto' }}>
        <CardMedia
          component="img"
          height="140"
          image={WandersonPhoto}
          alt="Wanderson Honorio"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Wanderson Honorio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {about}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
