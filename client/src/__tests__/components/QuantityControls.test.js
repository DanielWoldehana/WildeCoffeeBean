import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuantityControls from '@/components/QuantityControls'

describe('QuantityControls', () => {
  const mockOnDecrease = jest.fn()
  const mockOnIncrease = jest.fn()

  beforeEach(() => {
    mockOnDecrease.mockClear()
    mockOnIncrease.mockClear()
  })

  it('renders with correct quantity', () => {
    render(
      <QuantityControls
        quantity={5}
        onDecrease={mockOnDecrease}
        onIncrease={mockOnIncrease}
      />
    )
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('calls onDecrease when decrease button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <QuantityControls
        quantity={5}
        onDecrease={mockOnDecrease}
        onIncrease={mockOnIncrease}
      />
    )

    const decreaseButton = screen.getByLabelText('Decrease quantity')
    await user.click(decreaseButton)

    expect(mockOnDecrease).toHaveBeenCalledTimes(1)
  })

  it('calls onIncrease when increase button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <QuantityControls
        quantity={5}
        onDecrease={mockOnDecrease}
        onIncrease={mockOnIncrease}
      />
    )

    const increaseButton = screen.getByLabelText('Increase quantity')
    await user.click(increaseButton)

    expect(mockOnIncrease).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(
      <QuantityControls
        quantity={1}
        onDecrease={mockOnDecrease}
        onIncrease={mockOnIncrease}
        className="custom-class"
      />
    )

    // The className is applied to the root div
    const rootDiv = container.firstChild
    expect(rootDiv).toHaveClass('custom-class')
  })
})

