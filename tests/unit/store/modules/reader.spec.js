import reader from '@/store/modules/reader'

describe('Store - reader', () => {
    describe('mutations', () => {
        let state

        beforeEach(() => {
            state = { ...reader.state }
        })

        it('setTextSize sets new textSize when param is in the proper range', () => {
            reader.mutations.setTextSize(state, 150)

            expect(state.textSize).toEqual(150)
        })

        it('setTextSize does not set new textSize when param is not in the proper range', () => {
            reader.mutations.setTextSize(state, 220)
            expect(state.textSize).toEqual(100)

            reader.mutations.setTextSize(state, 50)
            expect(state.textSize).toEqual(100)
        })

        it('setTheme sets new theme when param is in the proper set', () => {
            reader.mutations.setTheme(state, 'dark')

            expect(state.theme).toEqual('dark')
        })

        it('setTheme does not set new theme when param is not in the proper set', () => {
            reader.mutations.setTheme(state, 'green')

            expect(state.theme).toEqual(reader.state.theme)  
        })
    })
})