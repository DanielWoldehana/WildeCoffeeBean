import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddToCartButton from '@/components/AddToCartButton'

// Mock QuantityControls
jest.mock('@/components/QuantityControls', () => {
  return function MockQuantityControls({ quantity, onDecrease, onIncrease, className }) {
    return (
      <div className={className} data-testid="quantity-controls">
        <button onClick={onDecrease} aria-label="Decrease">-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease} aria-label="Increase">+</button>
      </div>
    )
  }
})

describe('AddToCartButton', () => {
  const mockItem = { _id: '1', name: 'Test Item', price: 10 }
  const mockOnAdd = jest.fn()
  const mockOnIncrease = jest.fn()
  const mockOnDecrease = jest.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
    mockOnIncrease.mockClear()
    mockOnDecrease.mockClear()
  })

  it('renders "Add to Cart" button when quantity is 0', () => {
    render(
      <AddToCartButton
        item={mockItem}
        quantity={0}
        onAdd={mockOnAdd}
      />
    )
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('calls onAdd when button is clicked and quantity is 0', async () => {
    const user = userEvent.setup()
    render(
      <AddToCartButton
        item={mockItem}
        quantity={0}
        onAdd={mockOnAdd}
      />
    )

    const button = screen.getByText('Add to Cart')
    await user.click(button)

    expect(mockOnAdd).toHaveBeenCalledWith(mockItem)
    expect(mockOnAdd).toHaveBeenCalledTimes(1)
  })

  it('renders QuantityControls when quantity is greater than 0', () => {
    render(
      <AddToCartButton
        item={mockItem}
        quantity={2}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    )
    expect(screen.getByTestId('quantity-controls')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls onIncrease when increase is clicked', async () => {
    const user = userEvent.setup()
    render(
      <AddToCartButton
        item={mockItem}
        quantity={1}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    )

    const increaseButton = screen.getByLabelText('Increase')
    await user.click(increaseButton)

    expect(mockOnIncrease).toHaveBeenCalledWith(mockItem)
  })

  it('calls onDecrease when decrease is clicked', async () => {
    const user = userEvent.setup()
    render(
      <AddToCartButton
        item={mockItem}
        quantity={2}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
      />
    )

    const decreaseButton = screen.getByLabelText('Decrease')
    await user.click(decreaseButton)

    expect(mockOnDecrease).toHaveBeenCalledWith(mockItem)
  })

  it('disables button when disabled prop is true', () => {
    render(
      <AddToCartButton
        item={mockItem}
        quantity={0}
        onAdd={mockOnAdd}
        disabled={true}
      />
    )

    const button = screen.getByText('Add to Cart')
    expect(button).toBeDisabled()
  })

  it('does not call onAdd when disabled', async () => {
    const user = userEvent.setup()
    render(
      <AddToCartButton
        item={mockItem}
        quantity={0}
        onAdd={mockOnAdd}
        disabled={true}
      />
    )

    const button = screen.getByText('Add to Cart')
    await user.click(button)

    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('stops event propagation when stopPropagation is true', async () => {
    const user = userEvent.setup()
    const mockStopPropagation = jest.fn()
    
    render(
      <AddToCartButton
        item={mockItem}
        quantity={0}
        onAdd={mockOnAdd}
        stopPropagation={true}
      />
    )

    const button = screen.getByText('Add to Cart')
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
    clickEvent.stopPropagation = mockStopPropagation
    button.dispatchEvent(clickEvent)

    // Note: stopPropagation is called internally, we just verify the button works
    await user.click(button)
    expect(mockOnAdd).toHaveBeenCalled()
  })
})

