import { legacy_createStore as createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

//242 --> Adding state slices, every slice needs a name, an identifier of that piece of state, here we're naming it "counter", next we need to set an initialState which will point to the initialState createdand lastly we need reducers, an object of all the reducers this slice needs and in that object you can add methods of names of ur choice but they will come important later. Now every method will automatically recieve the latest state and we don't need our if checks anymore
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    //Though it looks that we're manipulating the current state, but behind the scenes something occurs that solves everything. Redux toolkit uses a package called igmur which keeps all the state that we're not editing, overrides the state that we're editing in an immutable way. So now we don't have to copy all the code we're not editing as redux-toolkit manages that for us and we only change the code we wanna change
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
//242 --> Now our target is to make our store aware of our slice
//243 --> Now to use our slice we need to make use of return value from createSlice

// const store = createStore(counterSlice.reducer);
//But we'll use configureStore instead of createStore as it makes merging reducers easier if we've multiple reducers. It accepts a reducer property bcz no matter we use createStore or configureStore redux accepts one main reducer function and this reducer key can accept a single reducer function as value or multiple reducers in an object fashion with keys and values

const store = configureStore({
  reducer: counterSlice.reducer,
});
//244 --> Now we need to know how to dispatch actions as we don't have those if checks now.So counterSlice.actions gives us those methods that we mentioned inside reducers and when we call them they create an action object for us which already has a type property with an unique identifier per action automatically created behind the scenes and we as developers don't have to create action objects any more

export const counterActions = counterSlice.actions;

export default store;

/*
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "increase_by_x") {
    return {
      counter: state.counter + action.x,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }
  return state;
};
const store = createStore(counterReducer);
export default store;
 */
