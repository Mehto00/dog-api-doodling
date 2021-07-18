import React, {useState} from 'react';
import axios from 'axios';
import { Header, Button, Container, Dimmer, Image, Loader, } from 'semantic-ui-react'


const baseURL = "https://dog.ceo/api/breed/pomeranian/images/random";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getData = () => axios.get(baseURL)
    .then(setLoading(true))  
    .then((response) => {
      setData(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setError(error);
    });

  React.useEffect(() => {
    getData()
  }, []);

  return (
    <Container textAlign='center'>
      <Header size='huge' as='h1' style={{margin:'1rem 0'}}>Dog API doodling</Header>
      <p style={{fontSize:'1.3rem'}}>Cheer yourself up with random pom pic.</p>
      {!error &&
      <Container>
        <div style={{display:'flex', justifyContent:'center'}}>
          <Dimmer active={loading} inverted>
            <Loader content='Loading' />
          </Dimmer>
          <Image src={data.message} style={{maxHeight: '60vh'}}/>
        </div>
      </Container>
      }
      {error && <div>{error.message}</div>}
      <Button onClick={getData} style={{marginTop: '1rem'}}>fetch</Button>
    </Container>
  );
}
