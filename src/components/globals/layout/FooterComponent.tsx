"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import NewsLetterForm from "../NewsLetterForm";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<any | null>(null);
  useEffect(() => {
    fetch("/api/global", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch global data");
        return res.json();
      })
      .then(setPageData)
      .catch(console.error);
  }, []);

  if (!pageData) return null;
  return (
    <div
      className=" bg-white "
      style={{
        backgroundImage: `
          url('/assets/imgs/aim-pattern-left.svg'),
          url('/assets/imgs/aim-pattern-right.svg')
        `,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "left top, right top",
        backgroundSize: "480px 100%, 680px 100%",
      }}
    >
      {/* <hr className="pb-10 border-gray-300" /> */}
      <div className="backdrop-blur-3xl py-10 ">
        <div className="container mx-auto ">
          <div>
            <NewsLetterForm />
          </div>
          <div>
            <hr className="border-gray-300 my-10" />
            <div className="grid sm:grid-cols-12">
              <div className="sm:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:col-span-2">
                  {pageData.menuitems.linkedItems.map((m: any, idx: number) => {
                    const item: any = m;
                    return (
                      <div key={idx}>
                        <h3 className="text-md font-semibold mb-2">
                          {item.elements.name.value}
                        </h3>
                        <ul className="space-y-1">
                          {item.elements.subitems.linkedItems.map(
                            (s: any, i: number) => {
                              const sub: any = s;
                              return (
                                <li key={i}>
                                  <Link
                                    href={item.elements.link.value}
                                    className="text-sm text-gray-500 hover:text-gray-600"
                                  >
                                    {sub.elements.name.value}
                                  </Link>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className="sm:col-span-4">
                <h3 className="text-md uppercase font-semibold mb-2">
                  Get In Touch
                </h3>
                <address className="not-italic space-y-1 text-sm text-gray-500 hover:text-gray-6">
                  <p>{pageData.phone.value}</p>
                  <p>{pageData.address.value}</p>
                  <Link
                    href={`mailto:${pageData.email.value}`}
                    className="underline"
                  >
                    {pageData.email.value}
                  </Link>
                </address>

                <div className="flex space-x-4 mt-4 justify-start lg:justify-start">
                  <Link
                    href="https://www.facebook.com/AIMCongress"
                    target="_blank"
                  >
                    <FaFacebook className="w-6 h-6 hover:text-gray-300" />
                  </Link>
                  <Link
                    href="https://api.whatsapp.com/send?phone=971502235632&text=I%20would%20like%20to%20know%20more%20about%20AIM%20Congress"
                    target="_blank"
                  >
                    <FaWhatsapp className="w-6 h-6 hover:text-gray-300" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/aim-congress/?viewAsMember=true"
                    target="_blank"
                  >
                    <FaLinkedin className="w-6 h-6 hover:text-gray-300" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/aimcongress/?hl=en"
                    target="_blank"
                  >
                    <FaInstagram className="w-6 h-6 hover:text-gray-300" />
                  </Link>

                  <Link
                    href="https://www.youtube.com/@AnnualInvestmentMeeting"
                    target="_blank"
                  >
                    <FaYoutube className="w-6 h-6 hover:text-gray-300" />
                  </Link>

                  <Link
                    href="https://www.tiktok.com/@aimcongress?_t=8p4nMoWxZJ3&_r=1"
                    target="_blank"
                  >
                    <FaTiktok className="w-6 h-6 hover:text-gray-300" />
                  </Link>
                </div>
                <div className="mt-4">
                  <Link href="/contact-us">
                    <span className="inline-block px-4 py-2 text-white bg-primary rounded-full hover:bg-blue-500">
                      Contact Us
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 my-10" />
          </div>

          <div className="flex justify-center items-center">
            <div className="">
              <p className="copy-right">© Copyright AIM Global Foundation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
