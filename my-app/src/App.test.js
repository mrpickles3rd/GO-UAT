import { render, screen } from '@testing-library/react';
import App from './App';

test('Should render a search <input> with place holder text "Search"', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText('Search');
  expect(linkElement).toBeInTheDocument();
});

test('Should render a search <button> with the text "Search"', () => {
  render(<App />);
  const linkElement = screen.getByText('Search.');
  expect(linkElement).toBeInTheDocument();
});
