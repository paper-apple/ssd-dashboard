import { render, screen } from '@testing-library/react'
import StatsCards from '../components/StatsCards'

const specs = [
  { coverage: 90 }, // covered
  { coverage: 85 }, // covered
  { coverage: 50 }, // partial
  { coverage: 30 }, // partial
  { coverage: 10 }, // missing
] as any

test('SDD-UI-002: renders all stats cards', () => {
  render(<StatsCards specifications={specs} />)

  expect(screen.getByText(/Average coverage/i)).toBeInTheDocument()
  expect(screen.getByText(/Fully covered/i)).toBeInTheDocument()
  expect(screen.getByText(/Partly covered/i)).toBeInTheDocument()
  expect(screen.getByText(/Not covered/i)).toBeInTheDocument()
})

test('SDD-UI-002: calculates average coverage correctly', () => {
  render(<StatsCards specifications={specs} />)

  expect(screen.getByText('53.0%')).toBeInTheDocument()
})

test('SDD-UI-002: shows correct counts with labels', () => {
  render(<StatsCards specifications={specs} />)

  const coveredCard = screen.getByText(/Fully covered/i).closest('div')
  const partialCard = screen.getByText(/Partly covered/i).closest('div')
  const missingCard = screen.getByText(/Not covered/i).closest('div')

  expect(coveredCard).toHaveTextContent('2')
  expect(partialCard).toHaveTextContent('2')
  expect(missingCard).toHaveTextContent('1')
})

test('SDD-UI-002: shows correct counts with labels', () => {
  render(<StatsCards specifications={specs} />)

  const coveredCard = screen.getByText(/Fully covered/i).closest('div')
  const partialCard = screen.getByText(/Partly covered/i).closest('div')
  const missingCard = screen.getByText(/Not covered/i).closest('div')

  expect(coveredCard).toHaveTextContent('2')
  expect(partialCard).toHaveTextContent('2')
  expect(missingCard).toHaveTextContent('1')
})