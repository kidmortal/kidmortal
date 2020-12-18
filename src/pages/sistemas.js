import { useSelector } from "react-redux";

const Sistemas = () => {
  let user = useSelector((state) => state.user);
  function meuPau() {
    console.log(user);
  }

  return (
    <>
      <h1>Is this Sistemas?</h1>
      <button onClick={meuPau}>Click</button>
    </>
  );
};

export default Sistemas;
