import React from "react";
import axios from "axios";

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
export default function Home() {
  const [data, setData] = React.useState<ContentType>();
  React.useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL!)
      .then((res) => {
        const data = res.data;
        setData(data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  if (!data)
    return (
      <div className="flex h-[100vh] w-full items-center justify-center space-x-2">
        <div className="w-5 h-5 rounded-full animate-pulse bg-black "></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-black "></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-black"></div>
      </div>
    );
  return <QuoteFrame data={data!} />;
}

export function QuoteFrame({ data }: { data: ContentType }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      style={{
        background: `rgb(${data.Color.slice(0, 2)},
        ${data.Color.slice(2, 4)},
        ${data.Color.slice(4, 7)})`,
      }}
    >
      <figure className="max-w-screen-md mx-auto text-center">
        <svg
          aria-hidden="true"
          className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p
            className="text-2xl italic font-medium "
            style={{
              color: `rgb(${parseInt(data.Color.slice(0, 2)) > 127 ? 0 : 255},${
                parseInt(data.Color.slice(2, 4)) > 127 ? 0 : 255
              },${parseInt(data.Color.slice(4, 7)) > 127 ? 0 : 255})`,
            }}
          >
            {`" ${data.Quote} "`}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3">
          <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite
              className="pr-3 font-medium"
              style={{
                color: `rgb(${
                  parseInt(data.Color.slice(0, 2)) > 127 ? 0 : 255
                },${parseInt(data.Color.slice(2, 4)) > 127 ? 0 : 255},${
                  parseInt(data.Color.slice(4, 7)) > 127 ? 0 : 255
                })`,
              }}
            >
              {data.Author}
            </cite>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
