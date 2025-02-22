import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { user, googleSignIn, createUser, updateUserProfile } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleGoogleRegister = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res);
        navigate("/");
      });
    });
  };

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, res.data.data.display_url).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: res.data.data.display_url,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res);
            navigate("/");
          });
        });
      })
      .catch((err) => console.log(err));

    console.log(data, res);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body space-y-1">
          <h3 className="text-center text-xl font-semibold">Register</h3>
          <button
            onClick={handleGoogleRegister}
            className="btn btn-neutral mt-4 flex gap-2 justify-center items-center"
          >
            <FcGoogle className="text-lg" />
            Create With Google
          </button>
          <div className="divider">or</div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                required
                placeholder="Username"
                {...register("name", { required: true })}
                // pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="50"
                title="Only letters, numbers or dash"
              />
            </label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="mail@site.com"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input"
            />
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                {...register("password", { required: true })}
                placeholder="Password"
                minLength="6"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>

            <button className="btn btn-neutral mt-4 w-full">Register</button>
            <p className="text-center">
              Have an account
              <Link to="/login" className="text-sm text-blue-500 ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
