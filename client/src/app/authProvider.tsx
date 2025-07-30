/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {Authenticator} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

// const formFields = {
//   signUp: {
//     email: {
//       order: 1,
//       placeholder: "Enter your email address",
//       label: "Email",
//       inputProps: { type: "email", required: true },
//     },
//     nickname: {   // <-- Use 'nickname' (lowercase n)
//       order: 2,
//       placeholder: "Enter your nickname",
//       label: "Nickname",
//       inputProps: { required: true },
//     },
//     username: {
//       order: 3,
//       placeholder: "Choose a username",
//       label: "Username",
//       inputProps: { required: true },
//     },
//     password: {
//       order: 4,
//       placeholder: "Enter your password",
//       label: "Password",
//       inputProps: { type: "password", required: true },
//     },
//     confirm_password: {
//       order: 5,
//       placeholder: "Confirm your password",
//       label: "Confirm Password",
//       inputProps: { type: "password", required: true },
//     },
//   },
// };
const formFields = {
  signUp: {
    email: {
      order: 1,
      placeholder: "Enter your email address",
      label: "Email",
      type: "email",
      isRequired: true,
    },
    nickname: {
      order: 2,
      placeholder: "Enter your nickname",
      label: "Nickname",
      isRequired: true,
    },
    username: {
      order: 3,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    password: {
      order: 4,
      placeholder: "Enter your password",
      label: "Password",
      type: "password",
      isRequired: true,
    },
    confirm_password: {
      order: 5,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      type: "password",
      isRequired: true,
    },
  },
};

const AuthProvider = ({ children }: any) => {
  return (
    // <div>
    //   <Authenticator formFields={formFields}>
    //     {({ user }: any) =>
    //       user ? (
    //         <div>{children}</div>
    //       ) : (
    //         <div>
    //           <h1>Please sign in below:</h1>
    //         </div>
    //       )
    //     }
    //   </Authenticator>
    // </div>
    <div className="mt-5">
      <Authenticator formFields={formFields}>
        {({user} : any) =>
         user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign in below:</h1>
            </div>
          )
      }</Authenticator>
    </div>
  );
};

export default AuthProvider;