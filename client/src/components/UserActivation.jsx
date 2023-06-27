import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import server from "../server";

const UserActivation = () => {
  const { activationToken } = useParams();
  const [error, setError] = useState(false);

  useEffect(
    (activationToken) => {
      if (activationToken) {
        const activationEmail = async () => {
          try {
            axios
              .post(`${server}/user/activation`, activationToken)
              .then((res) => console.log(res));
          } catch (error) {
            console.log(error.message);
            setError(!error);
          }
        };
        activationEmail();
      }
    },
    [activationToken]
  );

  return (
    <div className="w-full h-full flex justify-center align-center">
      {error ? (
        <p>Your token is Expired</p>
      ) : (
        <p>Congratulations!! your account has been created successfully!</p>
      )}
    </div>
  );
};

export default UserActivation;
