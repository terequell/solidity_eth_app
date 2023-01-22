import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'
import { SendTransactionForm } from './components/SendTransactionForm';
import { TransactionContext, TTransactionContext } from './contexts/TransactionContext';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';

function App() {
  const { connectWallet, currentAccount } = useContext<TTransactionContext>(TransactionContext);

  const handleConnectMetamask = () => {
    connectWallet();
  }

  return (
      <Container>
        <Row>
          <Col>
              <SendTransactionForm />
          </Col>
        </Row>
        <Row>
          <Col>
            {!currentAccount && 
              <Button className='mt-2' variant="primary" onClick={handleConnectMetamask}>
                Connect Metamask
              </Button>
            }
          </Col>
        </Row>
      </Container>
  );
}

export default App
