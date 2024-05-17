export const SELECT_NONE = 0
export const SELECT_SINGLE = 1
export const SELECT_DOUBLE = 2

export class SelectState{
    currentState
    constructor() {
        this.currentState = SELECT_NONE
    }
    reset() {
        this.currentState = SELECT_NONE
    }
    next() {
        switch (this.currentState) {
            case SELECT_NONE:
                this.currentState = SELECT_SINGLE
                break
            case SELECT_SINGLE:
                this.currentState = SELECT_DOUBLE
                break
            case SELECT_DOUBLE:
                this.currentState = SELECT_NONE
                break
        }
    }
    get currentState() {
        return this.currentState
    }
}
