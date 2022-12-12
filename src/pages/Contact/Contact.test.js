import { render, screen } from "@testing-library/react"
import Contact from "./Contact"


it('render the text', async () => {
    render(<Contact />);
    const contactElement = screen.getByText(/Facilis distinctio/i);
    expect(contactElement).toBeInTheDocument();
});

it('render the title', async () => {
    render(<Contact />);
    const contactElement = screen.getByTitle('contactUs');
    expect(contactElement).toBeInTheDocument();
});

it('render the paragraph element by id', async () => {
    render(<Contact />);
    const contactElement = screen.getByTestId('article-1');
    expect(contactElement).toBeInTheDocument();
});

// find by

it('render the find by Qui veniam', async () => {
    render(<Contact />);
    const contactElement =  await screen.findByText(/Qui veniam/i);
    expect(contactElement).toBeInTheDocument();
});

// query by

it('render some text', async () => {
    render(<Contact />);
    const contactElement = screen.queryByText(/corporis laudantium/i);
    expect(contactElement).toBeInTheDocument();
});
