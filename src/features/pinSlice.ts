import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { ICoords, IPin } from "models/pins";
import { v4 as uuidv4 } from 'uuid';

// const createPin = (fruit: string) => {
//   if (pinCoords && pinCoords.lat) {
//     let id = uuidv4()
//     let pin : IPin = {
//       coords: {
//         lat: pinCoords.lat,
//         lng: pinCoords.lng,
//       },
//       id: id,
//       text: fruit
//     }
//     const newPins : IPin[] = [...pins, pin] || [pins]

//     setPins(newPins);
//     localStorage.setItem('localPins', JSON.stringify(newPins));
//   }
// }

const newPin = (pinCoords : ICoords, text : string) => {
  const id = uuidv4()
  return {
    coords: {
      lat: pinCoords.lat,
      lng: pinCoords.lng,
    },
    id: id,
    text: text
  }
}

interface PinState {
  pins: IPin[]
}

const initialState : IPin[] = []

const pinSlice = createSlice({
  name: 'pins',
  initialState: initialState,
  reducers: {
    loadPins(state: any, action) {
      const localPins : string = localStorage.getItem('localPins') || '[]'
      const localPinsParsed : IPin[] = JSON.parse(localPins)

      if (localPinsParsed) {
        const newPins : IPin[] = []
        const collected : IPin[] = newPins.concat(localPinsParsed)
        return collected
      } else {
        return []
      }
    },

    fetchAllPins(state, action) {
      return action.payload.pins
    },

    createPin(state: any, action: PayloadAction<any>) {
      const { pinCoords, text } = action.payload
      const newState = state.concat([newPin(pinCoords, text)])
      localStorage.setItem('localPins', JSON.stringify(newState));
      return newState
    },

    clearPins(state) {
      localStorage.removeItem("localPins")
      return []
    }
  }
})

const pinsSelector = (state: any | PinState) => state.pins

export const selectPins : any = createSelector(
  pinsSelector,
  pins => pins
)

export const { loadPins, fetchAllPins, createPin, clearPins } = pinSlice.actions

export default pinSlice.reducer
