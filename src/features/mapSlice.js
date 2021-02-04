import { createSlice } from "@reduxjs/toolkit";
import { ICoords, IPin } from "models/pins";

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    map: {
      center: {
        lat: 21.284084348268202,
        lng: -157.7855795839304,
      },
      zoom: 16
    }
  },
  reducers: {
    setMap: {
      reducer(state, action) {
        console.log(">>>>> setmap:", action)

        const { lat, lng, zoom } = action.payload
        state = {
          map: {
            center: {
              lat: lat,
              lng: lng,
            },
            zoom: zoom,
          }
        }

      },
    }
  }
})

export const { setMap } = mapSlice.actions

export default mapSlice.reducer