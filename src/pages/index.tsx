import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export type ContentType = {
  _id: string;
  Quote: string;
  Author: string;
  Popularity: string;
  Category: string;
  Tags: string[];
  Id: string;
  Color: string;
};
export default function Home({ data }: { data: ContentType }) {
  return <QuateFrame data={data} />;
}

export function QuateFrame({ data }: { data: ContentType }) {
  console.log(
    data.Color.slice(0, 2),
    data.Color.slice(2, 4),
    data.Color.slice(4, 7)
  );
  const isMobile = window.innerWidth < 600;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          width: isMobile?"80vh":"50vh",
          display: "flex",
          flexDirection: "column",
          height: isMobile?"50vh":"40vh",
          borderRadius: "2rem",
          border: "1px solid black",
          padding: "2rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: `
          rgb(${data.Color.slice(0, 2)},
          ${data.Color.slice(2, 4)},
          ${data.Color.slice(4, 7)})`,
          color: `rgb(${parseInt(data.Color.slice(0, 2)) > 127 ? 0 : 255}
          ,${parseInt(data.Color.slice(2, 4)) > 127 ? 0 : 255}
          ,${255 - parseInt(data.Color.slice(4, 7)) > 127 ? 0 : 255})`,
        }}
      >
        Quote of the day
        <div
          style={{
            font: "small-caption",
            fontSize: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            textAlign: "justify",
          }}
        >
          {data.Quote}
        </div>
        <div
          style={{
            height: "20%",
            font: "small-caption",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontSize: "1.5rem",
            textAlign: "justify",
          }}
        >
          - {data.Author}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/quotes`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
