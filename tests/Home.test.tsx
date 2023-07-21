import { render, screen } from '@testing-library/react';
import Home from '../src/screens/Home/Home';

describe('Home screen should', ()=> {
  it('display authenticate button', async () => {
    render(<Home />);
    const loginButton = await screen.findByRole('button', {name: new RegExp('authenticate', 'i')});
    expect(loginButton).toBeInTheDocument();
  });
});
