import React from "react";
import Section from "../Section";
import Link from "next/link";
import ButtonComponent from "../ButtonComponent";

type Props = {
  heading: string;
  ctabuttonname: string;
  ctabuttonlink: string;
  isexternal?: boolean;
};

export default function CTABlock({
  heading,
  ctabuttonname,
  ctabuttonlink,
  isexternal,
}: Props) {
  return (
    <div className="">
      <div className="">
        <div className="backgroundpattern shadow p-5 sm:p-20 rounded-3xl flex flex-wrap gap-5 justify-between items-center">
          <h4 className="theme-gradient-text text-2xl sm:text-4xl max-w-3xl leading-12 tracking-tighter">
            {heading}
          </h4>
          <div>
            <ButtonComponent name={ctabuttonname} link={ctabuttonlink} />
          </div>
        </div>
      </div>
    </div>
  );
}
