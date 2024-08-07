"use server";

import { TitlePageHead } from "./Head";
import { TitlePageBody } from "./Body";

import { TitleRate } from "@/components/entities/Title/Rate/";

import "./style.css";
import { auth } from "@/components/shared/auth/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getUserFromDb = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }],
    },
  });

  if (user) {
    return user;
  } else {
    return null;
  }
};

export async function TitlePage({ details }: { readonly details: any }) {
  const session = await auth();
  const email = session?.user?.email;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }],
    },
  });

  return (
    <section className="titlePage">
      <TitlePageHead details={details} />
      <TitleRate
        personal={details.personal_rating}
        kp={details.kp_rating}
        imdb={details.imdb_rating}
        rt={details.rt_rating}
      />
      <button onClick={() => console.log(user)}>сессия</button>
      <TitlePageBody details={details} />
    </section>
  );
}
