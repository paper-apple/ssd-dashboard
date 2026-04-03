import { render, screen, fireEvent } from '@testing-library/react'
import Filters from '../components/Filters'

test('renders all filter inputs', () => {
  render(
    <Filters
      filters={{ status: 'all', priority: 'all', search: '', minCoverage: 0 }}
      onFilterChange={jest.fn()}
    />
  )

  expect(screen.getByLabelText(/Search/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Status/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument()
  expect(screen.getByText(/Coverage:/i)).toBeInTheDocument()
})

test('SDD-UI-004: updates search filter', () => {
  const onChange = jest.fn()

  render(
    <Filters
      filters={{ status: 'all', priority: 'all', search: '', minCoverage: 0 }}
      onFilterChange={onChange}
    />
  )

  fireEvent.change(screen.getByPlaceholderText(/ID or name/i), {
    target: { value: 'REQ-101' }
  })

  expect(onChange).toHaveBeenCalledWith({
    status: 'all',
    priority: 'all',
    search: 'REQ-101',
    minCoverage: 0
  })
})

test('SDD-UI-003: updates status filter', () => {
  const onChange = jest.fn()

  render(
    <Filters
      filters={{ status: 'all', priority: 'all', search: '', minCoverage: 0 }}
      onFilterChange={onChange}
    />
  )

  fireEvent.change(screen.getByLabelText(/Status/i), {
    target: { value: 'covered' }
  })

  expect(onChange).toHaveBeenCalledWith({
    status: 'covered',
    priority: 'all',
    search: '',
    minCoverage: 0
  })
})

test('updates priority filter', () => {
  const onChange = jest.fn()

  render(
    <Filters
      filters={{ status: 'all', priority: 'all', search: '', minCoverage: 0 }}
      onFilterChange={onChange}
    />
  )

  fireEvent.change(screen.getByLabelText(/Priority/i), {
    target: { value: 'high' }
  })

  expect(onChange).toHaveBeenCalledWith({
    status: 'all',
    priority: 'high',
    search: '',
    minCoverage: 0
  })
})

test('updates minCoverage filter', () => {
  const onChange = jest.fn()

  render(
    <Filters
      filters={{ status: 'all', priority: 'all', search: '', minCoverage: 0 }}
      onFilterChange={onChange}
    />
  )

  fireEvent.change(screen.getByRole('slider'), {
    target: { value: '50' }
  })

  expect(onChange).toHaveBeenCalledWith({
    status: 'all',
    priority: 'all',
    search: '',
    minCoverage: 50
  })
})

test('shows reset button when filters are active', () => {
  render(
    <Filters
      filters={{ status: 'covered', priority: 'all', search: '', minCoverage: 0 }}
      onFilterChange={jest.fn()}
    />
  )

  expect(screen.getByText(/Reset filter/i)).toBeInTheDocument()
})

test('resets filters to default', () => {
  const onChange = jest.fn()

  render(
    <Filters
      filters={{ status: 'covered', priority: 'high', search: 'abc', minCoverage: 50 }}
      onFilterChange={onChange}
    />
  )

  fireEvent.click(screen.getByText(/Reset filter/i))

  expect(onChange).toHaveBeenCalledWith({
    status: 'all',
    priority: 'all',
    search: '',
    minCoverage: 0
  })
})