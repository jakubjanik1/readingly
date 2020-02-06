import reader from '@/store/modules/reader'

describe('Store - reader', () => {
    describe('mutations', () => {
        let state

        beforeEach(() => {
            state = { ...reader.state }
        })

        it('setFontSize sets new fontSize when param is in the proper range', () => {
            reader.mutations.setFontSize(state, 150)

            expect(state.fontSize).toEqual(150)
        })

        it('setFontSize does not set new fontSize when param is not in the proper range', () => {
            reader.mutations.setFontSize(state, 220)
            expect(state.fontSize).toEqual(100)

            reader.mutations.setFontSize(state, 50)
            expect(state.fontSize).toEqual(100)
        })

        it('setTheme sets new theme when param is in the proper set', () => {
            reader.mutations.setTheme(state, 'black')

            expect(state.theme).toEqual('black')
        })

        it('setTheme does not set new theme when param is not in the proper set', () => {
            reader.mutations.setTheme(state, 'green')

            expect(state.theme).toEqual(reader.state.theme)  
        })
    })
})