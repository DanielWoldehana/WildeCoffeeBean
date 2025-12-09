import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '@/components/Modal'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className, ...props }) => (
      <div onClick={onClick} className={className} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('Modal', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )

    // Find the backdrop (the outer div with bg-black/50)
    const backdrop = container.querySelector('.bg-black\\/50')
    if (backdrop) {
      await user.click(backdrop)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    } else {
      // Fallback: click on the outer div
      const outerDiv = container.firstChild
      if (outerDiv) {
        await user.click(outerDiv)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      }
    }
  })

  it('does not call onClose when modal content is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )

    const content = screen.getByText('Modal Content')
    await user.click(content)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={mockOnClose} className="custom-class">
        <div>Modal Content</div>
      </Modal>
    )

    // The className is applied to the inner modal div (the one with max-w-2xl)
    const modalContent = container.querySelector('.max-w-2xl')
    expect(modalContent).toHaveClass('custom-class')
  })
})

