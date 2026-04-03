import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/app/page'

// Мокаем fetch
global.fetch = jest.fn()

// Мокаем дочерние компоненты
jest.mock('/app/components/StatsCards', () => () => <div>StatsCards</div>)
jest.mock('/app/components/CoverageChart', () => () => <div>CoverageChart</div>)
jest.mock('/app/components/Filters', () => (props: any) => (
  <button onClick={() => props.onFilterChange({
    status: 'done',
    priority: 'all',
    search: '',
    minCoverage: 0
  })}>
    ApplyFilter
  </button>
))
jest.mock('/app/components/SpecCard', () => ({ spec }: any) => (
  <div data-testid="spec-card">{spec.id}</div>
))

test('SDD-UI-001: shows loading state initially', () => {
  (fetch as jest.Mock).mockReturnValue(new Promise(() => {})) // never resolves

  render(<Home />)

  expect(screen.getByText(/Uploading data/i)).toBeInTheDocument()
})

test('shows error if fetch fails', async () => {
  (fetch as jest.Mock).mockRejectedValue(new Error('fail'))

  render(<Home />)

  await waitFor(() => {
    expect(screen.getByText(/Data upload error/i)).toBeInTheDocument()
  })
})

test('SDD-UI-002: renders dashboard after successful fetch', async () => {
  (fetch as jest.Mock).mockResolvedValue({
    json: async () => ({
      specifications: [
        { id: '1', title: 'Spec 1', status: 'done', priority: 'high', coverage: 80 }
      ]
    })
  })

  render(<Home />)

  await waitFor(() => {
    expect(screen.getByText(/SDD Dashboard/i)).toBeInTheDocument()
    expect(screen.getByText('StatsCards')).toBeInTheDocument()
    expect(screen.getByText('CoverageChart')).toBeInTheDocument()
  })
})

test('SDD-UI-003/004: filters specifications correctly', async () => {
  (fetch as jest.Mock).mockResolvedValue({
    json: async () => ({
      specifications: [
        { id: '1', title: 'Spec 1', status: 'done', priority: 'high', coverage: 80 },
        { id: '2', title: 'Spec 2', status: 'todo', priority: 'low', coverage: 20 }
      ]
    })
  })

  render(<Home />)

  await waitFor(() => {
    expect(screen.getAllByTestId('spec-card')).toHaveLength(2)
  })

  // применяем фильтр через mock Filters
  screen.getByText('ApplyFilter').click()

  await waitFor(() => {
    expect(screen.getAllByTestId('spec-card')).toHaveLength(1)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})

test('SDD-UI-05: shows empty state when no specs match filters', async () => {
  (fetch as jest.Mock).mockResolvedValue({
    json: async () => ({
      specifications: []
    })
  })

  render(<Home />)

  await waitFor(() => {
    expect(screen.getByText(/Nothing was found/i)).toBeInTheDocument()
  })
})