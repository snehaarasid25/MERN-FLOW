import React ,{useState,useEffect} from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const[fun,setFun]=useState(false)

  const userHomePg = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name );
      setFun(true);
      
    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePg();
  }, []);
  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          <h1>{userName}</h1>
          <h2>{fun ? "Glad to see that you are back!" : "This Is An Online Registration Page!" }</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
