import { SELECT_NONE, SELECT_SINGLE, SELECT_DOUBLE, SelectState } from '../../../../calendar/lib/selectState'
import { describe, expect, it } from 'vitest'

describe('SelectState', ()=> {
    it('initial state is SELECT_NONE', () => {
        const state = new SelectState()
        expect(state.currentState).toBe(SELECT_NONE)
    })
    describe('Current state is SELECT_NONE', () => {
        it('next method changes state to SELECT_SINGLE', () => {
            const state = new SelectState() // SELECT_NONE
            state.next()
            expect(state.currentState).toBe(SELECT_SINGLE)
        })
        it('reset method changes state to SELECT_NONE', () => {
            const state = new SelectState() // SELECT_NONE
            state.reset()
            expect(state.currentState).toBe(SELECT_NONE)
        })
    })

    describe('Current state is SELECT_SINGLE', () => {
        it('next method changes state to SELECT_DOUBLE', () => {
            const state = new SelectState() // SELECT_NONE
            state.next() // SELECT_SINGLE
            state.next()
            expect(state.currentState).toBe(SELECT_DOUBLE)
        })
        it('reset method changes state to SELECT_NONE', () => {
            const state = new SelectState() // SELECT_NONE
            state.next() // SELECT_SINGLE
            state.reset()
            expect(state.currentState).toBe(SELECT_NONE)
        })
    })

    describe('Current state is SELECT_DOUBLE', () => {
        it('next method changes state to SELECT_DOUBLE', () => {
            const state = new SelectState() // SELECT_NONE
            state.next() // SELECT_SINGLE
            state.next() // SELECT_DOUBLE
            state.next()
            expect(state.currentState).toBe(SELECT_NONE)
        })
        it('reset method changes state to SELECT_NONE', () => {
            const state = new SelectState() // SELECT_NONE
            state.next() // SELECT_SINGLE
            state.next() // SELECT_DOUBLE
            state.reset()
            expect(state.currentState).toBe(SELECT_NONE)
        })
    })

})
