import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type UserProps = {
  id: string;
  title: string;
  name: string;
  surname: string;
  email: string;
  account: {
    name: string;
    email: string;
  } | null;
  active: boolean;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  const authorName = user.account ? user.account.name : "Unknown account";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${user.id}`)}>
      <h2>{authorName}</h2>
      <ReactMarkdown children={user.title + " " + user.name + " " + user.surname} />
      <ReactMarkdown children={"Account active - " +  user.active} />
      <ReactMarkdown children={"Email - " +  user.email} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default User;
