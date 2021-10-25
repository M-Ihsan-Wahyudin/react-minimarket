import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../../store/features/counter/counterSlice";
import { addNewProduct } from "../../store/features/product/productSlice";

const Main = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  const [productName, setProductName] = useState('')

  const onNameChanged = e => setProductName(e.target.value)

  // console.log(useSelector(state => state));
  // console.log(useSelector(state => state));

  const saveNewProduct = () => {
    dispatch(addNewProduct({
      productName
    }))
  }

  useEffect(() => {
    console.log(123);
  })

  return (
    <main className="main-content main-bg">
      <p onClick={() => dispatch(increment())}>Ndr sombong ke</p>
      <p onClick={() => dispatch(decrement())}>Ndr kurang sombong</p>
      <p onClick={() => dispatch(incrementByAmount(10))}>Ndr sombong sekali</p>
      <span>Total kesombongan {count}</span>

      <input
          type="text"
          id="productName"
          name="productName"
          value={productName}
          onChange={onNameChanged}
        />
      <button type="button" onClick={saveNewProduct}>save</button>
    </main>
  )
}

export default Main;