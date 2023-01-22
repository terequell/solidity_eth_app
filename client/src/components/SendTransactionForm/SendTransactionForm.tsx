import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormEvent } from 'react';

export const SendTransactionForm = (): JSX.Element => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target)
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="targetAddress">
                <Form.Label>Target address</Form.Label>
                <Form.Control type="text" placeholder="Enter target wallet address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" step="0.01" placeholder="Enter amount" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="additionalMessage">
                <Form.Label>Additional message</Form.Label>
                <Form.Control type="text" placeholder="Enter message" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
      </Form>
    )
}