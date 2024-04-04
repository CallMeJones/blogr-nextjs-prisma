import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import User, { UserProps } from "../components/User"
import prisma from "../../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const userList = await prisma.user.findMany({
    where: { active: true },
    include: {
      account: {
        select: { name: true },
      },
    },
  });
  return {
    props: { userList },
    revalidate: 10,
  };
}

type Props = {
  userList: UserProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>User List</h1>
        <main>
          {props.userList.map((user) => (
            <div key={user.id} className="user">
              <User user={user} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .user {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .user:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .user + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
