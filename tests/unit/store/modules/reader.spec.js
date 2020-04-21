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

        it('setBrightness sets new brightness when param is in the proper range', () => {
            reader.mutations.setBrightness(state, 65)

            expect(state.brightness).toEqual(65)
        })

        it('setBrightness does not set new brightness when param is not in the proper range', () => {
            reader.mutations.setBrightness(state, 10)
            expect(state.brightness).toEqual(reader.state.brightness)

            reader.mutations.setBrightness(state, 120)
            expect(state.brightness).toEqual(reader.state.brightness)
        })

        it('setProgress sets new progress when param is in the proper range', () => {
            reader.mutations.setProgress(state, 45)

            expect(state.progress).toEqual(45)
        })

        it('setProgress does not set new progress when param is not in the proper range', () => {
            reader.mutations.setProgress(state, -4)
            expect(state.progress).toEqual(reader.state.progress)

            reader.mutations.setProgress(state, 110)
            expect(state.progress).toEqual(reader.state.progress)
        })

        it('setFont sets new font when param is in the proper set', () => {
            reader.mutations.setFont(state, 'Roboto Slab')
            expect(state.font).toEqual('Roboto Slab')

            reader.mutations.setFont(state, 'Lora')
            expect(state.font).toEqual('Lora')
        })

        it('setFont does not set new font when param is not in the proper set', () => {
            reader.mutations.setFont(state, 'Arial')

            expect(state.font).toEqual(reader.state.font)
        })
    })
})