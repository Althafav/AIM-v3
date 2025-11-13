import ButtonComponent from "@/components/UI/ButtonComponent";
import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";

/* ---------------- Types ---------------- */
type Params = { user?: string };
type SearchParams = { user?: string };

/* ---------------- Utils ---------------- */
function safeDecode(val?: string) {
  if (!val) return "";
  try {
    return decodeURIComponent(val).trim();
  } catch {
    return val.trim();
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  // Await both in parallel for perf
  const [p, q] = await Promise.all([params, searchParams]);
  const user = safeDecode(p.user ?? q.user);

  // Fetch page content
  const pageResponse = await deliveryClient
    .item("thankyou_page")
    .depthParameter(2)
    .toPromise();
  const pageData = pageResponse.data.item.elements as any;

  const lowerText =
    "Stay tuned for more updates and information here on our website and social media.";

  // Centralize socials so it’s easy to edit/swap later
  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/AIMCongress",
      Icon: FaFacebook,
    },
    {
      name: "WhatsApp",
      href: "https://whatsapp.com/channel/0029VaArQjN0VycN7W0HdG1Q",
      Icon: FaWhatsapp,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/aim-congress/?viewAsMember=true",
      Icon: FaLinkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/aimcongress/?hl=en",
      Icon: FaInstagram,
    },
    { name: "Threads", href: "https://www.threads.net/@aimcongress", Icon: FaThreads },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@AnnualInvestmentMeeting",
      Icon: FaYoutube,
    },
    { name: "X (Twitter)", href: "https://x.com/AIM_Congress", Icon: FaXTwitter },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@aimcongress?_t=8p4nMoWxZJ3&_r=1",
      Icon: FaTiktok,
    },
  ];

  return (
    <div>
      <Section>
        <div className="max-w-3xl mx-auto  px-4 ">
          {/* Personal touch if user param exists */}
          {user && (
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Thank you, {user}!
            </h2>
          )}

          {/* CMS HTML block */}
          <div
            className="leading-relaxed text-gray-800 [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: pageData.content?.value ?? "" }}
          />

          {/* Support copy */}
          <p className="mt-4 text-gray-600">{lowerText}</p>

          {/* Socials: consistent, accessible icon buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map(({ name, href, Icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-3 py-2
                           transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm
                           focus:outline-none focus-visible:ring focus-visible:ring-black/20"
              >
                <Icon size={18} />
                <span className="sr-only">{name}</span>
              </Link>
            ))}
          </div>

          <ButtonComponent name="Discover More" link="/" className="mt-6" />
        </div>
      </Section>
    </div>
  );
}
