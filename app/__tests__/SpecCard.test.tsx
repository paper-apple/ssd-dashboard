import { render, screen, fireEvent } from '@testing-library/react'
import SpecCard from '../components/SpecCard'

const baseSpec = {
  id: 'REQ-101',
  title: 'Auth',
  description: 'Login system',
  coverage: 85,
  status: 'covered',
  priority: 'high',
  components: ['LoginForm', 'AuthService']
} as any

test('SDD-UI-005: renders spec basic info', () => {
  render(<SpecCard spec={baseSpec} />)

  expect(screen.getByText('REQ-101')).toBeInTheDocument()
  expect(screen.getByText('Auth')).toBeInTheDocument()
  expect(screen.getByText('Login system')).toBeInTheDocument()
  expect(screen.getByText('85%')).toBeInTheDocument()
})

test('shows correct status text', () => {
  render(<SpecCard spec={baseSpec} />)

  expect(screen.getByText(/completely covered/i)).toBeInTheDocument()
})

test('shows priority label', () => {
  render(<SpecCard spec={baseSpec} />)

  expect(screen.getByText(/High priority/i)).toBeInTheDocument()
})

test('SDD-UI-005: coverage bar has correct width', () => {
  render(<SpecCard spec={baseSpec} />)

  const bar = screen.getByTestId('coverage-bar')
  expect(bar).toHaveStyle({ width: '85%' })
})

test('shows toggle button when components exist', () => {
  render(<SpecCard spec={baseSpec} />)

  expect(screen.getByText(/Show/i)).toBeInTheDocument()
})

test('toggles components list', () => {
  render(<SpecCard spec={baseSpec} />)

  const button = screen.getByText(/Show/i)

  // раскрываем
  fireEvent.click(button)

  expect(screen.getByText('LoginForm')).toBeInTheDocument()
  expect(screen.getByText('AuthService')).toBeInTheDocument()

  // скрываем обратно
  fireEvent.click(screen.getByText(/Hide/i))

  expect(screen.queryByText('LoginForm')).not.toBeInTheDocument()
})

test('does not render components section if empty', () => {
  const spec = { ...baseSpec, components: [] }

  render(<SpecCard spec={spec} />)

  expect(screen.queryByText(/Components/i)).not.toBeInTheDocument()
})

test('assigns correct color based on coverage', () => {
  const spec = { ...baseSpec, coverage: 10 }

  render(<SpecCard spec={spec} />)

  const bar = screen.getByTestId('coverage-bar')

  expect(bar.className).toMatch(/bg-red-500/)
})