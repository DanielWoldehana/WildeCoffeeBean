import { render, screen } from '@testing-library/react'
import ErrorDisplay from '@/components/ErrorDisplay'

describe('ErrorDisplay', () => {
  it('does not render when message is not provided', () => {
    const { container } = render(<ErrorDisplay />)
    expect(container.firstChild).toBeNull()
  })

  it('does not render when message is empty string', () => {
    const { container } = render(<ErrorDisplay message="" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders error message when provided', () => {
    render(<ErrorDisplay message="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ErrorDisplay message="Error" className="custom-class" />
    )
    const errorContainer = container.querySelector('.custom-class')
    expect(errorContainer).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const { container } = render(<ErrorDisplay message="Error message" />)
    const errorDiv = container.querySelector('.bg-red-50')
    expect(errorDiv).toBeInTheDocument()
  })
})

