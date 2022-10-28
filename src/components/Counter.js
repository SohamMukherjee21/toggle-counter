import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/index";

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  //The function inside useSelector accepts the whole state as an arguement and returns the part of state that we desire and useSelector overall gives us that counter value(since here we specified counter) and when we use useSelector react-redux automatically sets up a subscription for the store and we recieve the latest store whenever the data inside the store changes
  //Changes to redux store will cause this component function to be re-executed

  const show = useSelector((state) => state.showCounter);

  const dispatch = useDispatch();
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  //counterActions.increment() --> This creates an action object with type set to an unique action identifier

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); //{type : UNIQUE_ACTION_IDENTIFIER, payload : 5} --> this is by default --> 5 is the value we provided
  };
  //When we've a payload just like we have in this case then we pass our payload data as arguement to this function and it sets a key as "payload" inside the action object with value equal to the value inside brackets(video --> 244). Now to use it by default we've to use action.payload
  //{ type: "increase_by_x", x: 5 }

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

//YOU SHOULD NEVER MUTATE THE EXISTING STATE, RATHER ALWAYS OVERWRITE THE EXISTING ONE WITH A BRAND NEW ONE
