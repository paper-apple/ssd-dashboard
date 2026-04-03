import { render, screen } from '@testing-library/react'
import CoverageChart from '../components/CoverageChart'

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  BarChart: ({ data, children }: any) => (
    <div data-testid="barchart" data-data={JSON.stringify(data)}>
      {children}
    </div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}))

test('SDD-UI-006: renders chart title', () => {
  render(<CoverageChart specifications={[]} />)

  expect(
    screen.getByText(/Specification Coverage/i)
  ).toBeInTheDocument()
})

test('SDD-UI-006: transforms specifications into chart data', () => {
  const specs = [
    { id: 'REQ-1', coverage: 90, status: 'covered' },
    { id: 'REQ-2', coverage: 50, status: 'partial' },
  ] as any

  render(<CoverageChart specifications={specs} />)

  const chart = screen.getByTestId('barchart')
  const data = JSON.parse(chart.getAttribute('data-data')!)

  expect(data).toEqual([
    expect.objectContaining({ name: 'REQ-1', coverage: 90 }),
    expect.objectContaining({ name: 'REQ-2', coverage: 50 }),
  ])
})

test('SDD-UI-006: assigns correct colors based on coverage', () => {
  const specs = [
    { id: 'high', coverage: 85, status: 'covered' },
    { id: 'medium', coverage: 50, status: 'partial' },
    { id: 'low', coverage: 10, status: 'missing' },
  ] as any

  render(<CoverageChart specifications={specs} />)

  const chart = screen.getByTestId('barchart')
  const data = JSON.parse(chart.getAttribute('data-data')!)

  expect(data[0].fill).toBe('#10b981') // >= 80
  expect(data[1].fill).toBe('#f59e0b') // >= 30
  expect(data[2].fill).toBe('#ef4444') // < 30
})

test('SDD-UI-006: renders chart structure', () => {
  render(<CoverageChart specifications={[]} />)

  expect(screen.getByTestId('barchart')).toBeInTheDocument()
  expect(screen.getByTestId('bar')).toBeInTheDocument()
  expect(screen.getByTestId('grid')).toBeInTheDocument()
  expect(screen.getByTestId('tooltip')).toBeInTheDocument()
})