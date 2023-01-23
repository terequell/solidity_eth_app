import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormEvent } from 'react';

export type TFormData = {
    targetAddress: string;
    amount: number;
    message: string;
}

type Props = {
    onSubmit: (formData: TFormData) => void;
}

export const SendTransactionForm: React.FC<Props> = ({ onSubmit }): JSX.Element => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const targetAddress = document.querySelector<HTMLInputElement>('#targetAddress')?.value;
        const amount = document.querySelector<HTMLInputElement>('#amount')?.value;
        const message = document.querySelector<HTMLInputElement>('#additionalMessage')?.value || '';

        if (targetAddress && amount) {
            onSubmit({
                targetAddress, amount: Number(amount), message,
            });
        } else {
            alert('You have not filled all fields!');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h3>You can send tokens to anybody by this form</h3>
            <Form.Group className="mb-3" controlId="targetAddress">
                <Form.Label>Target address</Form.Label>
                <Form.Control required type="text" placeholder="Enter target wallet address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control required type="number" step="0.01" placeholder="Enter amount" />
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