import { createDeliveryClient } from "@kontent-ai/delivery-sdk";

const isDevMode = process.env.NODE_ENV !== "production";

export const deliveryClient = createDeliveryClient({
  environmentId: "615577b9-4e2b-0074-b4f8-20f11d30f5ae",
  secureApiKey:
    "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogIjE5YjlkNjllZGMwZTQyN2U5NjNmZDlhNTE1MzRmODlhIiwNCiAgImlhdCI6ICIxNjI2MzMyMDY0IiwNCiAgImV4cCI6ICIxOTcxOTMyMDY0IiwNCiAgInZlciI6ICIxLjAuMCIsDQogICJwcm9qZWN0X2lkIjogIjYxNTU3N2I5NGUyYjAwNzRiNGY4MjBmMTFkMzBmNWFlIiwNCiAgImF1ZCI6ICJkZWxpdmVyLmtlbnRpY29jbG91ZC5jb20iDQp9.QFwPat7Wia81kJxmckCHhS9vcJLg6T5mPdHxFUnlr18",
  defaultQueryConfig: {
    useSecuredMode: true,
  },
  // previewApiKey:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYTkwNDJhNDk5M2E0YjhiYmYwOWUzNjdjMjdkZmNmNCIsImlhdCI6MTYyNjMzMjAzMywibmJmIjoxNjI2MzMyMDMzLCJleHAiOjE5NzE5MzIwMzMsInZlciI6IjEuMC4wIiwicHJvamVjdF9pZCI6IjYxNTU3N2I5NGUyYjAwNzRiNGY4MjBmMTFkMzBmNWFlIiwiYXVkIjoicHJldmlldy5kZWxpdmVyLmtlbnRpY29jbG91ZC5jb20ifQ.i-vTrzjCjpRVPOhrSZpX1gAiZNsW0UCWvxzQyEF5p6U",
  // excludeArchivedItems: false,
  // defaultQueryConfig: {
  //   usePreviewMode: true,
  // },
});

export const EventID = "04f6919c-7c2c-4397-b46c-efcfcab1539a";
export const SITE_NAME = "AIM";
export const SITE_URL = "https://www.aimcongress.com/";
