import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dogBreedImgListState = {
  dog_code: string,
  breed_kr: string,
  breed_en: string,
  name: string
};

  const initialState: any = {
    dog_code: 'any',
    breed_kr: 'any',
    breed_en: 'any',
    name: 'any'

} as dogBreedImgListState

export const dogBreed = createSlice({
  name: "dogBreed",
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const {
  reset,
} = dogBreed.actions;
export default dogBreed.reducer;