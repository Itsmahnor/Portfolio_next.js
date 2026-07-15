import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../components/sections/Hero'

describe('Hero Component', () => {
  it('renders the headline', () => {
    render(<Hero />)
    const headline = screen.getByText(/Hi, I'm/i)
    expect(headline).toBeDefined()
  })
})
