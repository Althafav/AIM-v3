"use client";
import JsLoader from "@/modules/JsLoader";
import React, { useEffect } from "react";

export default function NewsLetterForm() {
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/newsLetter.js`);
  }, []);
  return (
    <div className="">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-black mb-8 text-center text-2xl font-medium">
          Signup for Newsletter
        </h3>
        <form
          method="POST"
          action="https://strategic31677.activehosted.com/proc.php"
          id="_form_110_"
          className="_form _form_110 _inline-form  _dark"
          noValidate
          data-styles-version="5"
        >
          <input type="hidden" name="u" value="110" />
          <input type="hidden" name="f" value="110" />
          <input type="hidden" name="s" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
          <input
            type="hidden"
            name="or"
            value="1ffdd0662ea595757fa40fe1acafbb6a"
          />
          <div className="_form-content">
            <div className="">
              <div className="">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-white py-3 px-4 border-2 w-full   border-gray-300 rounded-full m-0 mb-2"
                  placeholder="Enter your email"
                  required
                />

                <div className="flex justify-center">
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                  ></div>
                </div>
              </div>
            </div>

            <div className=""></div>

            <div className=" flex justify-center">
              <div className="">
                <button
                  className="newslettercta-btn aimbtn aimbtn--secondary  text-white rounded-full"
                  type="submit"
                  id="_form_110_submit"
                  style={{ display: "block", marginTop: "10px" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div
            className="_form-newsletter-thank-you subscribe-message text-success _form-thank-you"
            style={{ display: "none" }}
          ></div>
        </form>
      </div>
    </div>
  );
}
