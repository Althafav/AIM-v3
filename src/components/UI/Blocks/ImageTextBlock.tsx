import Image from "next/image";
import React from "react";
import ButtonComponent from "../ButtonComponent";

interface ImageTextBlockProps {
  heading: string;
  content: string;
  imageSrc: string;
  ctaname?: string;
  ctalink?: string;
  target?: string;
  imagePosition?: "left" | "right";
}

export default function ImageTextBlock({
  heading,
  content,
  imageSrc,
  ctaname = "Visit website",
  ctalink,
  target,
  imagePosition = "left",
}: ImageTextBlockProps) {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {imagePosition === "left" ? (
        <>
          <div>
            <Image
              width={800}
              height={400}
              className="w-full rounded-3xl object-cover aspect-video"
              src={imageSrc}
              alt={heading}
            />
          </div>
          <div>
            <h2 className="text-3xl font-medium mb-5">{heading}</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {ctalink && (
              <div className="mt-10">
                <ButtonComponent
                  name={ctaname}
                  link={ctalink}
                  target={target ? "_blank" : "_self"}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-medium mb-5">{heading}</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {ctalink && (
              <div className="mt-10">
                <ButtonComponent
                  name={ctaname}
                  link={ctalink}
                  target={target ? "_blank" : "_self"}
                />
              </div>
            )}
          </div>
          <div className="order-1 md:order-2">
            <Image
              width={800}
              height={400}
              className="w-full rounded-3xl object-cover"
              src={imageSrc}
              alt={heading}
            />
          </div>
        </>
      )}
    </div>
  );
}
