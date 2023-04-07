import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

// "_id": "642ed21830db7a89e5f708d1",
// "Quote": "Don't cry because it's over, smile because it happened.",
// "Author": "Dr. Seuss",
// "Popularity": "0.1556661556661556",
// "Category": "happiness",
// "Tags": [
// "attributed-no-source",
// "cry",
// "crying",
// "experience",
// "happiness",
// "joy",
// "life",
// "misattributed-dr-seuss",
// "optimism",
// "sadness",
// "smile",
// "smiling "
// ],
// "Id": "1",
// "Color": "7388430"
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
          width: "50vh",
          display: "flex",
          flexDirection: "column",
          height: "50vh",
          border: "1px solid black",
          padding: "2rem",
          backgroundColor: `rgb(${data.Color.slice(0, 2)},${data.Color.slice(
            2,
            4
          )},${data.Color.slice(4, 7)})`,
        }}
      >
        <div
          style={{
            font: "small-caption",
            fontSize: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70%",
            textAlign: "justify",
          }}
        >
          {data.Quote}
        </div>
        <div
          style={{
            height: "30%",
            font: "small-caption",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontSize: "1.5rem",
            textAlign: "justify",
            
          }}
        >
          {data.Author}
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
