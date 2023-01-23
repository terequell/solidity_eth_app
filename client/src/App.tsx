import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'
import { SendTransactionForm } from './components/SendTransactionForm';
import { TransactionContext, TTransactionContext } from './contexts/TransactionContext';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { TFormData } from './components/SendTransactionForm/SendTransactionForm';
import Card from 'react-bootstrap/Card';
import { NoAccountConnectedWarning } from './components/NoAccountConnectedWarning';

function App() {
  const { currentAccount, contract, connectWallet, sendTransaction } = useContext<TTransactionContext>(TransactionContext);

  const handleConnectMetamask = () => {
    connectWallet();
  }

  const handleSubmitForm = async (formData: TFormData) => {
    await sendTransaction(formData);
  }

  return (
      <Container className='mt-5'>
        <Row>
          <Col>
          {
            currentAccount ? <SendTransactionForm onSubmit={handleSubmitForm} /> : <NoAccountConnectedWarning />
          }
          </Col>
          <Col>
            {!currentAccount && 
              <Button className='mt-4' variant="primary" onClick={handleConnectMetamask}>
                Connect Metamask
              </Button>
            }
            {
              currentAccount &&
              <Card className="mt-4">
                <Card.Body>Connected metamask: {currentAccount}</Card.Body>
              </Card>
            }
          </Col>
        </Row>
      </Container>
  );
}

export default App
